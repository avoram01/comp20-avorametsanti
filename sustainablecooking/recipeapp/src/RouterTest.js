import React, { Component } from 'react';

class RouterTest extends Component {
	constructor(props) {
		super(props);
		this.state = {
			lat: props.lat,
			lng: props.lng
		};
	}

	render() {
		return (
				<div>
					<button>{this.state.lat} , {this.state.lng}</button> 
				</div>
			)
	}

}

export default RouterTest;
