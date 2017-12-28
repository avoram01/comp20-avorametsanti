import React from 'react';
import ReactList from 'react-list';
import {NavLink} from 'react-router-dom';
import IngredientButton from './IngredientButton.js';
import {geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import './ingredients.css'

class Ingredients extends React.Component{

	constructor(props) {
    	super(props);
    	this.state = {
    		localIngredients: [],
    		//to be sent to recipe API
    		selectedIngredients: [],
    		place: this.props.place
    	};
    	this.clickIngredient = this.clickIngredient.bind(this);
	}

  	updateCoord(newlat, newlng) {
    	this.setState({lat: newlat})
    	this.setState({lng: newlng})
  	}

  	handleErr(){
		alert('Invalid Location')
		return
  	}

	componentDidMount() {
	 	geocodeByAddress(this.state.place)
	    .then((results) => getLatLng(results[0]))
	    .then(({ lat, lng }) => {this.updateCoord(lat, lng)})

		.catch(error => this.handleErr())
		.then(()=>{this.receiveIngredients()})
	}

	showList(selectedIngredients) {
		//updating state
		this.setState({'selectedIngredients': selectedIngredients});
	}

	clickIngredient(ingredient) {
		var index = this.state.selectedIngredients.indexOf(ingredient);
		if(index > -1) {
			this.state.selectedIngredients.splice(index, 1);
		}
		else {
			this.state.selectedIngredients.push(ingredient);
		}
		this.showList(this.state.selectedIngredients);
	}

	renderItem(index, key) {
		var curr = this.state.localIngredients[index];
		return <div key={key}> <IngredientButton ingredient={curr} action={this.clickIngredient}/> </div>
	}

	submit() {
		 this.props.action(this.state.selectedIngredients);
	}

	checkError()
	{
		if (this.state.localIngredients.length === 0)
			alert('No local foods found! Make sure you enter a valid US location');
	}

	//want to make param array of all local ingredients
	receiveIngredients() {
		var myLat = this.state.lat
		var myLng = this.state.lng
		fetch('https://localingredients.herokuapp.com/getLocalFoods',
			{method: 'post', headers: {'Accept': 'application/json', 'Content-Type': 'application/json'} ,
			body: JSON.stringify({"latlng":
				{"lat": myLat,
				"lng": myLng}})
			}).then(results => {return results.json()})
			.then(results => {this.setState({localIngredients: results})})
			.catch(error => {this.checkError()})
	}

	itemsRenderer(items, ref) {
		return <div ref={ref} className="outerlist"><div className="list">{items}</div></div>;
	}

	render() {
		return (
			<div>
     		<h1>Select some local ingredients: </h1>
       				<ReactList
       					itemRenderer={this.renderItem.bind(this)}
       					itemsRenderer={this.itemsRenderer.bind(this)}
       					length={this.state.localIngredients.length}
       					type='simple'
       					/>

        			<br />
        			<div>
				      <NavLink to='/recipeList'>
				      	<div className="flexButton">
				      		<button className = "submitButton" onClick={()=>this.submit()}>Generate Recipes</button> <br />
				      	</div>
				      </NavLink>
        			</div>

        	</div>

			)
	}
} export default Ingredients;
