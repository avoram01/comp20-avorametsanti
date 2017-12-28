import React, { Component } from 'react';

import PlaceForm from './PlaceForm.js';
import Ingredients from './ingredients.js';
import {
  Route,
  HashRouter
} from "react-router-dom";

import ChosenRecipe from './recipe.js';
import './App.css';
import RecipeList from './RecipeList.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: 0,
      lng: 0,
      foods: [],
      place: "",
      recipeid: 0
    };
    if(navigator.geolocation) {
       navigator.geolocation.getCurrentPosition((pos) => {
        this.setState({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
          })
          var requestString = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=';
          requestString += this.state.lat + "," +this.state.lng+'&result_type=locality&key=AIzaSyDHiGsX-4x94qYYJcYfcFlQFC3B31tbp9s';
          fetch(requestString, {method: 'get'})
          .then(response=>{return response.json()})
          .then(results=>this.setState({place: results.results[0].formatted_address}))
          //.then(results=>{this.setState({place: results.results.formatted_address})})
      })
    }
    else {
      alert("This broswer does not support geolaction. \nYou must enter a location to generate recipes.")
    }
    this.handleSubmitLoc = this.handleSubmitLoc.bind(this);
    this.handleSubmitFoods = this.handleSubmitFoods.bind(this);
    this.handleSelectRecipe = this.handleSelectRecipe.bind(this);
  }

  handleSubmitLoc(place) {
    this.setState({
      place: place
    });
  }

  handleSubmitFoods(newFoods) {
    this.setState({
      foods: newFoods
    });
  }

  handleSelectRecipe(recipe) {

    this.setState({
      recipeid: recipe.id
    });
  }

  render() {
    return(

      <div>
      <div className="heading">
          <h1 className="title">Sustainable Cooking</h1>
      </div>

      <HashRouter>

        <div>
          <Route exact path="/" component={()=><PlaceForm action = {this.handleSubmitLoc} place={this.state.place}/>}/>
          <Route path ="/ingredientList" component={()=><Ingredients action = {this.handleSubmitFoods} place={this.state.place} />}/>
          <Route path = "/recipeList" component={()=><RecipeList action = {this.handleSelectRecipe} ingredients={this.state.foods}/>}/>
          <Route path = "/chosenRecipe" component={()=><ChosenRecipe id={this.state.recipeid}/>}/>
        </div>

      </HashRouter>
      </div>
    )
  }

} export default App;
