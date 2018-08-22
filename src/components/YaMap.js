import React, {Component} from 'react';
// import PropTypes from 'prop-types';
import {YMaps, Map} from 'react-yandex-maps';

class YaMap extends Component {
	// static propTypes = {
	// }

	state = {
    center: [55.76, 37.64], // Moscow
    zoom: 10,
    controls: ['zoomControl']
  };

  render() {
  	return (
  		<YMaps>
  			<div id='map'>
          <Map 
	          state = {this.state} 
	          instanceRef = {elem => this.map = elem}
          ></Map>
        </div>
      </YMaps>
    );
  }
};

export default YaMap;