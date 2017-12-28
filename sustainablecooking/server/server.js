var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var cheerio = require('cheerio');
var googleMaps = require('@google/maps').createClient({
  key: 'AIzaSyDcP7jD5Q_D4oDhwWL-LgsoMbh8NK95S-E'
});

var app = express();
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var sfgbaseurl = "https://www.seasonalfoodguide.org/";
var ssbaseurl = "http://www.simplesteps.org/eat-local/state/";
var foodlookup = require('./foodLookup.js');

app.post('/getState', function(req, res){
        console.log(req.body.latlng);
        getStateShort(req.body.latlng, function(err, state){
                res.send(state);
        });
});

app.get('/getDT', function(req, res){
        var date = new Date();
        let obj = {};
        obj["monthnum"] = date.getMonth();
        obj["month"] = months[obj.monthnum];
        obj["day"] = date.getDate();
        res.send(obj);
})

function getState(latlng_i, callback){
        googleMaps.reverseGeocode({latlng : latlng_i}, function(err, result) {
                var state = result.json.results[0].address_components.filter(function(item){
                        return item.types.includes("administrative_area_level_1");
                })[0].long_name;
                callback(err, state);
        });
}

function getStateShort(latlng_i, callback){
        googleMaps.reverseGeocode({latlng : latlng_i}, function(err, result) {
                var state = result.json.results[0].address_components.filter(function(item){
                        return item.types.includes("administrative_area_level_1");
                })[0].short_name;
                callback(err, state);
        });
}

function buildURL(state, callback){
        let date = new Date();
        let month = months[date.getMonth()];
        let day = date.getDate();
        let half = null;
        if(day < 15){
                half = "Early";
        } else {
                half = "Late";
        }
        let sfgurl = sfgbaseurl + state.replace(/\s+/g, '-').toLowerCase() + "/" + half.toLowerCase() + "-" + month.toLowerCase();
        callback(sfgurl);
}

function getSeason(){
        let date = new Date();
        let day = date.getDate();
        if(day < 15){
                return (date.getMonth() * 2);
        } else {
                return ((date.getMonth() * 2) + 1);
        }
}

app.post('/getLocalFoods', function(req, res){
        let ingredients = [];
        getStateShort(req.body.latlng, function(err, state){
                if(err){
                        console.log("Error: " + err);
                        res.send(500);
                } else {
                        let season = getSeason();
                        let ingredients_prim = foodlookup.filter(function(item){
                                if(state in item.states){
                                        if(item.states[state].seasons.includes(season)){
                                                return true;
                                        } else {
                                                return false;
                                        }
                                } else {
                                        return false;
                                }
                        });
                        ingredients_prim.forEach(function(item){
                                ingredients.push(item.name);
                        });

                        /* NRDC Scraping */

                        getState(req.body.latlng, function(err, state_long){
                                if(err){
                                        console.log("Error: " + err);
                                        res.send(500);
                                } else {
                                        let ssurl = ssbaseurl + state_long.replace(/\s+/g, '-').toLowerCase();
                                        request(ssurl, function(err, response, html){
                                                if(err){
                                                        console.log("Error: " + err);
                                                        res.send(500);
                                                } else {
                                                        var ll = "";
                                                        var $ = cheerio.load(html);
                                                        let season = getSeason();
                                                        let curr_season_food = $('.state-produce').children();
                                                        curr_season_food = curr_season_food.eq(season).find('a');
                                                        curr_season_food.each(function(i, elem){
                                                                ingredients.push($(this).text());
                                                        });
                                                        res.send(ingredients);
                                                }
                                        });
                                }
                        })
                }
        });
});

app.listen(process.env.PORT || 3000);
