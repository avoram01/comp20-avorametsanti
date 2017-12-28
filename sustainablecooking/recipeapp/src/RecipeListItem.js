import React, { Component } from 'react';
import {Link} from "react-router-dom";

const liStyle = {
    width: 1000,
}

const imageStyle = {
    height: 100,
    width: 100,
}

const spanStyle = {
    width: 1000,
    fontSize: 20,
}

export default class RecipeListItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { title, image, time } = this.props.recipe;
        const handleClick = this.props.handleClick;
        return (
                <Link to="/chosenRecipe">
            <div style={liStyle} style={liStyle} onClick={handleClick}>
                <img src={image} style={imageStyle}/>
                <span style={spanStyle}>{title}</span>
                <span style={spanStyle}>{time}</span>
            </div>
            </Link>
        )
    }
}
