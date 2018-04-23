import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import axios from 'axios';
import {
  getCountries,
  createCountry,
  deleteCountry,
  updateCountry
} from './actions';
import { connect } from 'react-redux';

class App extends Component {
  state = {
    id: '',
    name: '',
    name2: '',
  }
  componentDidMount() {
    this.props.getCountries();
  }
  handleDelete = (e) => {
    const {id} = e.target;
    this.props.deleteCountry(id);
  }
  handleChange = (e) => { // Fixed
    var name = e.target.name,
      value = e.target.value;
    this.setState({[name]: value});
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const {name} = this.state;
    this.props.createCountry({
      name: name
    });
    this.setState({
      name: ''
    });
  }
  handleUpdate = (e) => {
    e.preventDefault();
    const {id, name2} = this.state;
    this.props.updateCountry(id, {
      name: name2
    });
    this.setState({
      id: '',
      name2: ''
    });
  }
  render() {
    const {countries} = this.props;
    return (
      <div>
        <h1>Country</h1>
        <ul>
          {
            countries.map((country, index) => {
              return (
                <li key={country.id}>
                  {country.id + '. ' + country.name + ' '}
                  <button id={country.id} onClick={this.handleDelete}>Delete</button>
                </li>
              )
            })
          }
        </ul>
        <h1>Add country</h1>
        <form onSubmit={this.handleSubmit}>
          <input type="text" name="name" placeholder="Name" onChange={this.handleChange} value={this.state.name}/>
          <button type="submit">Add</button>
        </form>
        <h1>Edit country</h1>
        <form onSubmit={this.handleUpdate}>
          <input type="text" name="id" placeholder="ID" onChange={this.handleChange} value={this.state.id}/><br/>
          <input type="text" name="name2" placeholder="Name" onChange={this.handleChange} value={this.state.name2}/><br/>
          <button type="submit">Update</button>
        </form>
      </div>


      /*<div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>*/
    );
  }
}

const mapStateToProps = ({ countries }) => {
  return {
    countries,
  }
}
export default connect(mapStateToProps, { getCountries, createCountry, deleteCountry, updateCountry })(App);
