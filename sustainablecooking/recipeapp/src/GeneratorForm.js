import React, { Component } from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';
import {Link} from 'react-router-dom';
// import logo from './logo.svg';
// import './App.css';


class GeneratorForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: 0,
      lng: 0,
      place: 'Boston, MA'
    };
    if(navigator.geolocation) {
       navigator.geolocation.getCurrentPosition((pos) => {
        this.setState({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
          })
      })
    }
    else {
      alert("This broswer does not support geolaction. \nYou must enter a location to generate recipes.")
    }
    this.onChange = (place) => this.setState({ place })
  }

  updateCoord(newlat, newlng) {
    this.setState({lat: newlat})
    this.setState({lng: newlng})
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
      input: { width: '35%' },
      autocompleteItem: { color: 'black' },
      autocompleteItemActive: { color: 'blue' }
    }

    return (
      <div className="GeneratorForm">
        <PlacesAutocomplete inputProps={inputProps} styles={myStyles}/>
        <p className="info-entry">
        <Link to='/ingredientList'>
          <button className = "submitButton" onClick={()=>this.submit()}>Find Ingredients</button> <br />
        </Link>
        </p>
      </div>

    );
  }
}

export default GeneratorForm;
