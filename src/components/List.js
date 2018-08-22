import React, {Component} from 'react';
import {SortableContainer, SortableElement} from 'react-sortable-hoc';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import reorderPoint from '../actions/reorderPoint';
import Point from './Point';

class List extends Component {
	static propTypes = {
		points: PropTypes.array.isRequired,
		reorderPoint: PropTypes.func
	}

	onSortEnd = (oldIndex, newIndex) => {
		const {reorderPoint} = this.props;
		
		reorderPoint(oldIndex, newIndex);
	}

	render() {
		const {points} = this.props;

		const SortableItem = SortableElement(({point}) =>
		  <Point
				point = {point}
			/>
		);

		const SortableList = SortableContainer(({items}) => 
		   <ul className = 'point-list'>
		     {items}
		   </ul>
		);

		const items = [...points].map((point, index) => 
			<SortableItem 
				key = {point.id}
				index = {index}
				point = {point}
			/>
		);

		return (
			<SortableList items = {items} onSortEnd = {this.onSortEnd} />
		);
	}
};

const mapStateToProps = state => {
  return {
    points: state.points
  };
};

export default connect(mapStateToProps, {reorderPoint})(List);