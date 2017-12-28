import React, { Component } from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';
import {Link} from 'react-router-dom';
import './PlaceForm.css'


class PlaceForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      place: this.props.place
    };
    this.onChange = (place) => this.setState({ place })
  }
  submit() {
     this.props.action(this.state.place)
  }

  render() {

    const inputProps = {
      value: this.state.place,
      onChange: this.onChange,
    }

    const myStyles = {
      input: {
        width: '75vw',
        border: 'honeydew',
        boxShadow: '0 2px 2px 0 rgba(0,0,0,0.16), 0 0 0 1px rgba(0,0,0,0.08)',
        padding: '16px',
        fontSize: '3vmin'
      },
      autocompleteItem: { color: 'black' },
      autocompleteItemActive: { color: 'blue' }
    }

    return (
      <div className="placeForm">
      <br/>
      <br/>
        <PlacesAutocomplete inputProps={inputProps} styles={myStyles} className="autocompleteBox"/>
        <p className="description">
          This is an app designed to promote sustainable cooking by suggesting
          recipes that can be made from local foods. Enter your location,
          then select a few local ingredients to see what recipes you
          can make with them.
        </p>
        <p className="info-entry">
        <Link to='/ingredientList'>
          <button className = "submitPlaceButton" onClick={()=>this.submit()}>Find Ingredients</button> <br />
        </Link>
        </p>
      </div>

    );
  }
}

export default PlaceForm;
