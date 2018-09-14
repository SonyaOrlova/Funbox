import React from 'react';
import {mount} from 'enzyme';

import {DEFAULT_MAP_CENTER_COORDS} from '../../helpers/constants';
import {YaMap} from '../../components/YaMap';

jest.mock('react-yandex-maps', () => ({
	YMaps: ({children}) => <div> {children} </div>,
	Map: ({children, onBoundsChange}) => 
		<div 
			className = 'yamap'
			onDragEnd = {onBoundsChange}
		> {children} </div>,
	Placemark: ({properties, geometry, onGeometryChange}) => (
		<div
			className = 'placemark'
			coords = {geometry.coordinates}
			balloon = {properties.balloonContent}
			onDragEnd = {onGeometryChange}
		/>
	),
	Polyline: ({geometry}) => 
		<div 
			className = 'polyline'
			coords = {geometry.coordinates}
		></div>
}));

describe('YANDEX MAP - test', () => {
	const points = [{name: 'a', coords: [11.11, 22.22], id: 'id1'}, {name: 'b', coords: [33.33, 44.44], id: 'id2'}];
	const mockSetMapCenterCoords = jest.fn();
	const mockUpdatePointCoords = jest.fn();

	const props = {
		points,
		mapCenterCoords: DEFAULT_MAP_CENTER_COORDS,
		setMapCenterCoords: mockSetMapCenterCoords,
		updatePointCoords: mockUpdatePointCoords
	};

	const component = mount(<YaMap {...props} />);

	it ('should calls action for setting new map center coords when map dragged', () => {
		const map = component.find('.yamap');
		const newMapCenterCoords = [55.55, 66.66];

		map.simulate('dragend', {
			originalEvent: {
				target: {
					getCenter: () => newMapCenterCoords
				}
			}
		});

		expect(mockSetMapCenterCoords).toHaveBeenCalledWith(newMapCenterCoords);
	});

	it ('should renders placemarks', () => {
		const placemarks = component.find('.placemark');

		expect(placemarks.length).toEqual(points.length);
	});

	it ('should calls action for updating point coords when placemark dragged', () => {
		const placemark = component.find('.placemark').first();
		const newPlacemarkCoords = [77.77, 66.66];

		placemark.simulate('dragend', {
			originalEvent: {
				target: {
					geometry: {
						getCoordinates: () => newPlacemarkCoords
					}
				}
			}
		});

		expect(mockUpdatePointCoords).toHaveBeenCalledWith('id1', newPlacemarkCoords);
	});

	it ('should renders polyline', () => {
		const polyline = component.find('.polyline');

		expect(polyline.length).toEqual(1);
		expect(polyline.props().coords).toEqual(points.map(point => point.coords));
	});
});
