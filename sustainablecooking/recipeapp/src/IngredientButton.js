import React, { Component } from 'react';



class IngredientButton extends Component {
	constructor(props) {
		super(props);
		this.state = {
			ingredient: this.props.ingredient,
			on: false
		};
	}


	clickIngredient() {
		this.setState({on: !this.state.on})
		this.props.action(this.state.ingredient)
	}

	render() {
		return (
				<button className={this.state.on ? "buttonOn" : "buttonOff"} 
				onClick={()=>this.clickIngredient()}>{this.state.ingredient}</button>
				)
	}

} 

export default IngredientButton;