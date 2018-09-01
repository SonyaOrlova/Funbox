import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {deletePoint} from '../actions/index';

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
			<li className = 'item'>
				<p className = 'item__name'>{point.name}</p>
				<button 
					className = 'item__delete' 
					type = 'button' 
					onClick = {this.onDeleteBtnClick}
				>Delete</button>
			</li>
			);
	}
};

export default connect(null, {deletePoint})(Point);