import React, {PureComponent, createRef} from "react";
import PropTypes from "prop-types";
import leaflet from "leaflet";

const icon = leaflet.icon({
  iconUrl: `img/pin.svg`,
  iconSize: [27, 39]
});
const activeIcon = leaflet.icon({
  iconUrl: `img/pin-active.svg`,
  iconSize: [27, 39]
});

class Map extends PureComponent {
  constructor(props) {
    super(props);
    this.mapRef = createRef();
    this.map = null;
    this.layer = null;
  }

  componentDidMount() {
    const {sortedOffers, activeOffer} = this.props;
    this.map = leaflet.map(this.mapRef.current, {
      center: [sortedOffers[0].city.location.latitude, sortedOffers[0].city.location.longitude],
      zoom: sortedOffers[0].city.location.zoom,
      zoomControl: false,
      marker: true
    });

    this.layer = leaflet.layerGroup().addTo(this.map);

    leaflet
      .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
        attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
      })
      .addTo(this.map);

    this.map.setView([sortedOffers[0].city.location.latitude, sortedOffers[0].city.location.longitude], sortedOffers[0].city.location.zoom);

    sortedOffers.map((offer) => {
      if (offer !== activeOffer) {
        leaflet
        .marker([offer.location.latitude, offer.location.longitude], {icon})
        .addTo(this.layer);
      }
    });
    if (activeOffer.id) {
      leaflet
      .marker([activeOffer.location.latitude, activeOffer.location.longitude], {icon: activeIcon})
      .addTo(this.layer);
    }
  }

  componentDidUpdate() {
    const {sortedOffers, activeOffer} = this.props;

    this.layer.clearLayers();

    sortedOffers.map((offer) => {
      if (offer.id === activeOffer.id) {
        leaflet
        .marker([activeOffer.location.latitude, activeOffer.location.longitude], {icon: activeIcon})
        .addTo(this.layer);
      } else {
        leaflet
        .marker([offer.location.latitude, offer.location.longitude], {icon})
        .addTo(this.layer);
      }
    });

    this.map.setView([this.props.sortedOffers[0].city.location.latitude, this.props.sortedOffers[0].city.location. longitude], this.props.sortedOffers[0].city.location.zoom);
  }

  componentWillUnmount() {
    this.mapRef.current = null;
  }

  render() {
    return (
      <div id="map" style={{height: 100 + `%`}} ref={this.mapRef}></div>
    );
  }
}


Map.propTypes = {
  sortedOffers: PropTypes.array,
  activeOffer: PropTypes.shape({
    id: PropTypes.number,
    location: PropTypes.object
  })
};

export default Map;
