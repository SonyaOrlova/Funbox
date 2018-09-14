import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {YMaps, Map, Placemark, Polyline} from 'react-yandex-maps';
import {connect} from 'react-redux';
import {updatePointCoords, setMapCenterCoords} from '../actions/index';

export class YaMap extends Component {
	static propTypes = {
    points: PropTypes.array.isRequired,
    mapCenterCoords: PropTypes.array,
    setMapCenterCoords: PropTypes.func,
    updatePointCoords: PropTypes.func
  }

  onMapDrag = (newMapCenterCoords) => {
    this.props.setMapCenterCoords(newMapCenterCoords);
  }

  onPlacemarkDrag = (id, newPointCoords) => {
    this.props.updatePointCoords(id, newPointCoords);
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
          evt.stopPropagation();
          const newPointCoords = evt.originalEvent.target.geometry.getCoordinates();
          this.onPlacemarkDrag(point.id, newPointCoords);
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
            // instanceRef = {elem => this.myMap = elem}
            onBoundsChange = {evt => {
              const newMapCenterCoords = evt.originalEvent.target.getCenter();
              this.onMapDrag(newMapCenterCoords)
            }}
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

export default connect(mapStateToProps, {updatePointCoords, setMapCenterCoords})(YaMap);
