import React, { Component } from 'react'

export default class CountryList extends Component {
	state = {
		isEdit: false,
		name: this.props.country.name
	}

	handleChange = e => {
		var name = e.target.name,
			value = e.target.value
		this.setState({ [name]: value })
	}

	render() {
		const { country, onDelete, onUpdate } = this.props
		const { isEdit, name } = this.state

		if (isEdit === true) {
			return (
				<li key={country.id}>
					{country.id}. <input type="text" name="name" value={name} onChange={this.handleChange} />
					<button
						onClick={() => {
							onUpdate(country.id, name)
							this.setState({ isEdit: false })
						}}
					>
						Save
					</button>
					<button onClick={() => this.setState({ isEdit: false, name: country.name })}>Cancel</button>
				</li>
			)
		}

		if (isEdit === false) {
			return (
				<li key={country.id}>
					{country.id + '. ' + country.name + ' '}
					<button onClick={() => this.setState({ isEdit: true })}>Edit</button>
					<button onClick={() => onDelete(country.id)}>Delete</button>
				</li>
			)
		}
	}
}
