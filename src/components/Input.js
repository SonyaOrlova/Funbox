import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import addPoint from '../actions/addPoint';

class Input extends Component {
	static propTypes = {
		addPoint: PropTypes.func
	}

	state = {pointName: ''};

	onInputChange = (evt) => {
		this.setState({pointName: evt.target.value});
	}

	onSubmitForm = (evt) => {
		evt.preventDefault();

		const name = this.state.pointName;
		let coords;

		this.state.pointName.trim() !== '' ?
    	this.props.addPoint({name, coords}) :
    	alert('Point name should not be empty');

		this.setState({pointName: ''});
	}

	render() {
		return (
			<form 
				onSubmit = {this.onSubmitForm}
			>
				<input 
					className = 'point-input' 
					type = 'text' 
					placeholder = 'Enter point name'
					autoFocus
					value = {this.state.pointName}
					onChange = 	{this.onInputChange}
				/>
			</form>
		);
	}
};

export default connect(null, {addPoint})(Input);