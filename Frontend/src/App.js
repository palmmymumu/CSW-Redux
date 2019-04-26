import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'

import axios from 'axios'
import { getCountries, createCountry, deleteCountry, updateCountry } from './actions'
import { connect } from 'react-redux'
import CountryList from './CountryList'

class App extends Component {
	state = {
		name: ''
	}

	componentDidMount() {
		this.props.getCountries()
	}

	handleChange = e => {
		var name = e.target.name,
			value = e.target.value
		this.setState({ [name]: value })
	}

	handleSubmit = e => {
		e.preventDefault()
		const { name } = this.state
		this.props.createCountry({
			name
		})
		this.setState({
			name: ''
		})
	}

	handleDelete = id => {
		this.props.deleteCountry(id)
	}

	handleUpdate = (id, name) => {
		this.props.updateCountry(id, {
			name
		})
	}

	render() {
		const { countries } = this.props
		return (
			<div>
				<h1>Country</h1>
				<ul>
					{countries.map((country, index) => {
						return <CountryList country={country} onDelete={this.handleDelete} onUpdate={this.handleUpdate} />
					})}
				</ul>
				<h1>Add country</h1>
				<form onSubmit={this.handleSubmit}>
					<input type="text" name="name" placeholder="Name" onChange={this.handleChange} value={this.state.name} />
					<button type="submit">Add</button>
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
		)
	}
}

const mapStateToProps = ({ countries }) => {
	return {
		countries
	}
}
export default connect(
	mapStateToProps,
	{ getCountries, createCountry, deleteCountry, updateCountry }
)(App)
