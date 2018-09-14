import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {addPoint} from '../actions/index';

export class Form extends Component {
	static propTypes = {
		points: PropTypes.array.isRequired,
		mapCenterCoords: PropTypes.array,
		addPoint: PropTypes.func
	}

	state = {pointName: ''};

	onInputChange = (evt) => {
		this.setState({pointName: evt.target.value});
	}

	onSubmitForm = (evt) => {
		evt.preventDefault();

		const {points, addPoint} = this.props;

		const name = this.state.pointName;
		const coords = this.props.mapCenterCoords;

		if (name.trim() === '') {
			alert('Point name should not be empty');
		}

		else if (points.map(point => point.name).includes(name)) {
			alert('Point name already exists');
		}

		else {addPoint({name, coords});}

		this.setState({pointName: ''});
	}

	render() {
		return (
			<form 
				className = 'form'
				onSubmit = {this.onSubmitForm}
			>
				<input 
					className = 'form__input' 
					type = 'text' 
					placeholder = 'Enter point name'
					value = {this.state.pointName}
					onChange = {this.onInputChange}
				/>
				<span className = 'form__input-border'></span>
			</form>
			);
	}
};

const mapStateToProps = state => {
	return {
		points: state.points,
		mapCenterCoords: state.mapCenterCoords
	};
};

export default connect(mapStateToProps, {addPoint})(Form);