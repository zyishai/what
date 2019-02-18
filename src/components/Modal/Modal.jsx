import React, { Component } from 'react'
import { withFirebase } from '../../hoc'

import './Modal.css'

class Modal extends Component {
	state = {
		collection: 'articles',
		title: '',
		description: ''
	}

	onChange = e => {
		this.setState({ [e.target.name]: e.target.value })
	}

	onSelect = e => {
		this.setState({
			[e.nativeEvent.target.name]: e.nativeEvent.target.value
		})
	}

	onSubmit = e => {
		e.preventDefault()
		this.props.firebase.addToCollection(this.state)
		this.props.close()
	}

	render() {
		return (
			<div
				className='modal'
				onClick={this.props.close}
				onSubmit={this.onSubmit}>
				<form onClick={e => e.stopPropagation()}>
					<h1>Add To Collection</h1>
					<select
						name='collection'
						id='collection'
						value={this.state.collection}
						onChange={this.onSelect}>
						<option value='articles'>Article</option>
						<option value='books'>Book</option>
						<option value='videos'>Video</option>
					</select>
					<br />
					<input
						type='text'
						name='title'
						id='title'
						placeholder='Enter title'
						value={this.state.value}
						onChange={this.onChange}
					/>
					<br />
					<textarea
						id='description'
						name='description'
						cols='30'
						rows='1'
						placeholder='Enter short description'
						value={this.state.description}
						onChange={this.onChange}
					/>
					<br />
					<button type='submit'>Add</button>
					<button onClick={this.props.close}>Cancel</button>
				</form>
			</div>
		)
	}
}

export default withFirebase(Modal)
