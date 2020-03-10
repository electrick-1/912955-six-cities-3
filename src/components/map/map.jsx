import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import leaflet from "leaflet";

class Map extends PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {offers} = this.props;
    const city = [52.38333, 4.9];
    const icon = leaflet.icon({
      iconUrl: `img/pin.svg`,
      iconSize: [27, 39]
    });
    const zoom = 12;
    const map = leaflet.map(`map`, {
      center: city,
      zoomControl: false,
      marker: true
    });
    map.setView(city, zoom);

    leaflet
      .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
        attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
      })
      .addTo(map);

    offers.map((offer) => {
      leaflet
        .marker(offer.cords, {icon})
        .addTo(map);
    });
  }
  render() {
    return (
      <div id="map" style={{height: 100 + `%`}}></div>
    );
  }
}


Map.propTypes = {
  leaflet: PropTypes.object,
  offers: PropTypes.array
};

export default Map;
