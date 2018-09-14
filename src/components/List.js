import React, {Component} from 'react';
import {SortableContainer, SortableElement} from 'react-sortable-hoc';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {deletePoint, reorderPoint} from '../actions/index';

export class List extends Component {
	static propTypes = {
		points: PropTypes.array.isRequired,
		deletePoint: PropTypes.func,
		reorderPoint: PropTypes.func
	}

	onDeleteBtnClick = (id) => {
		this.props.deletePoint(id);
	}

	onDragEnd = ({oldIndex, newIndex}) => {
		this.props.reorderPoint(oldIndex, newIndex);
	}

	render() {
		const {points} = this.props;

		const SortableItem = SortableElement(({point}) =>
			<li className = 'item'>
				<p className = 'item__name'>{point.name}</p>
				<button 
					className = 'item__delete' 
					type = 'button' 
					onClick = {() => this.onDeleteBtnClick(point.id)}
				>Delete</button>
			</li>
		);

		const items = [...points].map((point, index) => 
			<SortableItem 
				key = {point.id}
				index = {index}
				point = {point}
			/>
		);

		const SortableList = SortableContainer(({items}) => 
			<ul className = 'list'>
				{items}
			</ul>
		);

		return (
			<SortableList 
				items = {items} 
				onSortEnd = {this.onDragEnd} 
			/>
		);
	}
};

const mapStateToProps = state => {
	return {
		points: state.points
	};
};

export default connect(mapStateToProps, {deletePoint, reorderPoint})(List);