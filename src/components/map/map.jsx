import React, {PureComponent, createRef} from "react";
import PropTypes from "prop-types";
import leaflet from "leaflet";

const icon = leaflet.icon({
  iconUrl: `/img/pin.svg`,
  iconSize: [27, 39]
});
const activeIcon = leaflet.icon({
  iconUrl: `/img/pin-active.svg`,
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
    const {sortedOffers, offers, id} = this.props;
    const activeCity = sortedOffers[0].city;
    this.map = leaflet.map(this.mapRef.current, {
      center: [activeCity.location.latitude, activeCity.location.longitude],
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

    if (id) {
      this.offer = offers.find((offer) => offer.id === id);
      if (this.offer) {
        leaflet
        .marker([this.offer.location.latitude, this.offer.location.longitude], {icon: activeIcon})
        .addTo(this.layer);
      }
    }

    sortedOffers.map((offer) => {
      if (offer !== this.offer) {
        leaflet
        .marker([offer.location.latitude, offer.location.longitude], {icon})
        .addTo(this.layer);
      }
    });
  }

  componentDidUpdate() {
    const {sortedOffers, offers, id} = this.props;
    this.offer = {};

    this.layer.clearLayers();

    if (id) {
      this.offer = offers.find((offer) => offer.id === id);
      if (this.offer) {
        leaflet
        .marker([this.offer.location.latitude, this.offer.location.longitude], {icon: activeIcon})
        .addTo(this.layer);
      }
    }

    sortedOffers.map((offer) => {
      if (offer !== this.offer) {
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
  id: PropTypes.number,
  offers: PropTypes.array,
  sortedOffers: PropTypes.array,
};

export default Map;
