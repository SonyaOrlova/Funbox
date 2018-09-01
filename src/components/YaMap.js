import {DEFAULT_MAP_CENTER_COORDS} from '../constants';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {YMaps, Map, Placemark, Polyline} from 'react-yandex-maps';
import {connect} from 'react-redux';
import {getMapCenterCoords} from '../actions/index';
import {updatePoint} from '../actions/index';

class YaMap extends Component {
	static propTypes = {
    points: PropTypes.array.isRequired,
    mapCenterCoords: PropTypes.array,
    getMapCenterCoords: PropTypes.func,
    updatePoint: PropTypes.func
  }

  onMapDrag = () => {
    this.props.getMapCenterCoords(this.myMap.getCenter());
  }

  onPlacemarkDrag = (id, newCoords) => {
    this.props.updatePoint(id, newCoords);
  }

  componentDidUpdate(prevProps) {
    if (this.props.points.length > 1 && prevProps.points.length !== this.props.points.length) {
      const bounds = this.myMap.geoObjects.getBounds();
      this.myMap.setBounds(bounds);
    } // map auto-positioning

    if (this.props.points.length === 0 && prevProps.points.length !== 0)
      this.myMap.setCenter(DEFAULT_MAP_CENTER_COORDS, 10, {duration: 500}); // default map center when there are no points
  }

  render() {
    const {points, mapCenterCoords} = this.props;

    const mapState =  {
      center: mapCenterCoords,
      zoom: 10,
      controls: ['zoomControl']
    };

    const placemarks = [...points].map(point => 
      <Placemark 
        key = {point.id}
        geometry = {{coordinates: point.coords}}
        properties = {{balloonContent: point.name}}
        options = {{iconColor: '#072f18', draggable: true}}
        onGeometryChange = {evt => {
          const newCoords = evt.get('target').geometry.getCoordinates();
          return this.onPlacemarkDrag(point.id, newCoords);
        }}
      />
      );

    const polyline = 
    <Polyline 
      geometry = {{coordinates: points.map(point => point.coords)}} 
      options = {{strokeColor: '#6a7a00', strokeWidth: 2}}
    />;

    return (
      <YMaps>
        <div id = 'map' className = 'map'>
          <Map 
            width = {'100%'} height = {'100%'}
            state = {mapState} 
            instanceRef = {elem => this.myMap = elem}
            onBoundsChange = {this.onMapDrag}
          >
            {placemarks}
            {polyline}
          </Map>
        </div>
      </YMaps>
    );
  }
};

const mapStateToProps = state => {
  return {
    points: state.points,
    mapCenterCoords: state.mapCenterCoords
  };
};

export default connect(mapStateToProps, {getMapCenterCoords, updatePoint})(YaMap);