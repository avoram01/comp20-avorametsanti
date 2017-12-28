import React, { Component } from 'react';

import RecipeListItem from './RecipeListItem.js';

export default class RecipeList extends Component{
    constructor(props) {
        super(props)
        this.state = {
            recipes: [],
            selectedRecipeID: 0,
            ingredients: this.props.ingredients
        }

        this.handleClick = this.handleClick.bind(this);
    }


    componentDidMount() {

        var requestString = 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients?fillIngredients=false&ingredients='
        if (this.state.ingredients.length === 0) {
            alert("Make sure you select ingredients")
            return
        }


        for(var i = 0; i < this.state.ingredients.length; i++)
        {
            requestString += this.state.ingredients[i];
            if (i !== this.state.ingredients.length - 1)
                requestString += "%2C"
        }
        requestString += '&limitLicense=false&number=5&ranking=1'


       fetch(requestString,
            {method: 'get', headers: {'X-Mashape-Key': 'zLGhVRD74tmshdARXsmOTF39vxgEp1HqcfAjsnWFezMcWvZCSQ', 'Accept': 'application/json'}})
        .then(results => {return results.json();})
        .then(results => {this.setState({recipes: results})})
 /*      this.setState({
            recipes: [
                {
                    id: 11111,
                    title: "Mac n cheese",
                    time: 5,
                    image: 'http://www.recipetineats.com/wp-content/uploads/2017/03/Baked-Mac-N-Cheese_2.jpg',
                    instructions: "1. Heat water 2. Pour pasta and cheese 3. Eat",
                    ingredients:["noodles", "water", "cheese"]
                },
                {
                    id: 11112,
                    title: "Also Mac n Cheese",
                    time: 5,
                    image: 'http://www.recipetineats.com/wp-content/uploads/2017/03/Baked-Mac-N-Cheese_2.jpg',
                    instructions: "1. Heat water 2. Pour pasta and cheese 3. Eat",
                    ingredients:["noodles", "water", "cheese"]
                }
            ]
        })*/
    }

    handleClick(selectedRecipe) {
        this.setState({selectedRecipeID: selectedRecipe.id});
        this.props.action(selectedRecipe);
    }

    render() {
        const recipes = this.state.recipes;
        return (
            <div>
                <div className = "recipeLeft">
                    <ul className = "recipeList">
                        {recipes.map(recipe => <RecipeListItem recipe={recipe} key={recipe.id} handleClick = {() => this.handleClick(recipe)}/>)}
                    </ul>
                </div>
            </div>
        )

    }
}
