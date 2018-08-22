import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import deletePoint from '../actions/deletePoint';

class Point extends Component {
	static propTypes = {
		deletePoint: PropTypes.func
	}

	onDeleteBtnClick = (evt) => {
		const {point, deletePoint} = this.props;
		
		deletePoint(point.id);
	}

	render() {
		const {point} = this.props;

		return (
			<li>
				<p className = 'point__name'>{point.name}</p>
				<button 
					className = 'point__delete' 
					type = 'button' 
					onClick = {this.onDeleteBtnClick}
				>Delete</button>
			</li>
		);
	}
};

export default connect(null, {deletePoint})(Point);