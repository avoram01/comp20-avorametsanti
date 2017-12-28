import React from 'react';
import './recipe.css'
//import {NavLink} from 'react-router-dom';


class ChosenRecipe extends React.Component {
	constructor(props) {
		super(props);
		//data that will be passed from spoonacular
		this.state = {
			id: this.props.id,
			title: "",
			time: 0,
			image: '',
			instructions: "",
			ingredients:"",
			sourceURL: ""
		}
	}

	updateRecipe(recipeInfo) {
		if (this.state.selectedRecipeID === 0) {
            alert("Recipe not found")
            return
        }
		this.setState({title: recipeInfo.title})
		this.setState({time: recipeInfo.readyInMinutes})
		this.setState({image: recipeInfo.image})
		this.setState({instructions: recipeInfo.instructions})
		this.setState({sourceURL: recipeInfo.sourceUrl})
		var ingredients = "";
		for (var i = 0; i < recipeInfo.extendedIngredients.length - 1; i++) {
			ingredients = ingredients + recipeInfo.extendedIngredients[i].name + ", ";
		}
		ingredients = ingredients + recipeInfo.extendedIngredients[recipeInfo.extendedIngredients.length - 1].name;
		this.setState({ingredients: ingredients})
		if(this.state.instructions === null) {
			this.setState({instructions: "No instructions found. See the link below"})
		}
	}

	componentDidMount() {
		//retrieve data from spoonacular and set states
		//var unirest = require('unirest');
		//fetch("https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/food/menuItems/{228234}")
		//.header("X-Mashape-Key", "zLGhVRD74tmshdARXsmOTF39vxgEp1HqcfAjsnWFezMcWvZCSQ")
		//.header("Accept", "application/json")
		//.end(function (result) {
		//});

		var request = 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/' + this.state.id + '/information';
		fetch(request,
			{method: 'get', headers: {'X-Mashape-Key': 'zLGhVRD74tmshdARXsmOTF39vxgEp1HqcfAjsnWFezMcWvZCSQ', 'Accept': 'application/json'}})
		.then(results => {return results.json();})
		.then(results => {this.updateRecipe(results)})
	}



	render() {
		//iterate through ingredients array to print just name of ingredient
		return (
			<div>
				<h1>{this.state.title}</h1>

				<div><img className='image' src = {this.state.image} alt="recipeImage"/></div>

				<p>Time to cook: {this.state.time} minutes</p>

				<p>Ingredients: {this.state.ingredients}</p>
				<p>Directions: <br></br>{this.state.instructions}</p>
				<p>Source URL: <a href={this.state.sourceURL}>{this.state.sourceURL}</a></p>
			</div>
		)
	}


} export default ChosenRecipe;
