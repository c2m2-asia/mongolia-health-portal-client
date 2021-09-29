/**
 *
 * Map
 *
 */

import React, { memo } from 'react';
import L from 'leaflet';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
// import $ from 'jquery';
import 'leaflet-easybutton';
// import baatoLogo from 'images/baato-logo.png';
import withWidth from '@material-ui/core/withWidth';
import Hidden from '@material-ui/core/Hidden';
import SearchView from 'containers/SearchContainer';
import Loader from 'react-loader-spinner';
import FilterListIcon from '@material-ui/icons/FilterList';
import { PRIMARY_COLOR } from 'utils/constants';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import 'leaflet-boundary-canvas';
import 'leaflet.markercluster';
import './styles.scss';

const color = PRIMARY_COLOR;

const osmURL =
  'https://{s}.tile.thunderforest.com/transport/{z}/{x}/{y}.png?apikey=52ce8b5b94d44030a0c6208707611a06';

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.loadMap = this.loadMap.bind(this);
    this.addPois = this.addPois.bind(this);
    this.filtersShow = this.filtersShow.bind(this);
    this.selectedServiceSet = this.selectedServiceSet.bind(this);
    this.onSearchResultSelect = this.onSearchResultSelect.bind(this);
    this.getSelectedServiceId = this.getSelectedServiceId.bind(this);
  }

  componentDidMount() {
    this.loadMap(this.props.amenityDetail.boundary);
    this.addPois(this.props.amenityDetail.geometries.features);
    this.addBaseLayer(this.props.amenityDetail.boundary);
  }

  componentDidUpdate(prevProps) {
    if (this.props.amenityDetail !== prevProps.amenityDetail) {
      this.map.eachLayer(layer => {
        if (!layer._url && layer.name === 'markers') {
          this.map.removeLayer(layer);
        } else if (layer.name === 'overlay' || layer.name === 'geojsonLayer') {
          this.map.removeLayer(layer);
        }
      });
      this.addPois(this.props.amenityDetail.geometries.features);
      this.addBaseLayer(this.props.amenityDetail.boundary);
    }

    if (
      this.props.selectedService !== prevProps.selectedService ||
      this.props.firstTime
    ) {
      const { coordinates } = this.props.selectedService.geometry;
      if (this.props.firstTime) {
        this.map.eachLayer(layer => {
          if (!layer._url && layer.name === 'markers') {
            this.map.removeLayer(layer);
          } else if (
            layer.name === 'overlay' ||
            layer.name === 'geojsonLayer'
          ) {
            this.map.removeLayer(layer);
          }
        });
        this.addPois(this.props.amenityDetail.geometries.features);
        this.addBaseLayer(this.props.amenityDetail.boundary);
        this.map.setView(coordinates.reverse(), 16);
        this.props.setFirstTime(false);
      }
    }
  }

  filtersShow(value) {
    this.props.showFilters(value);
  }

  selectedServiceSet(service) {
    this.props.setSelectedService(service);
  }

  getSelectedServiceId() {
    return this.props.selectedService
      ? this.props.selectedService.properties.id
      : 'dontShow';
  }

  loadMap(data) {
    const { downloadData, amenityType, filterState, location } = this.props;
    const layer1 = L.tileLayer(osmURL, { opacity: 0.3 });
    const layer2 = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      { opacity: 0.3 },
    );
    const googleSat = L.tileLayer(
      'http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',
      {
        maxZoom: 20,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
      },
    );
    const baseMaps = {
      'OSM Carto': layer2,
      Thunderforest: layer1,
      'Google Satellite': googleSat,
    };

    const map = L.map(this.mapNode, {
      //eslint-disable-line
      zoomSnap: 0.25,
      attributionControl: false,
      // maxBounds: L.geoJSON(data)
      //   .getBounds()
      //   .pad(0.4),
      minZoom: 5,
      // maxZoom: 14,
      // scrollWheelZoom: false,oo
      // zoomControl: false,
      layers: [layer2],
    });
    this.map = map;

    this.map.fitBounds(L.geoJSON(data).getBounds());

    // this.map.setZoom(11.5);
    // L.tileLayer(osmURL, { opacity: 0.3 }).addTo(this.map);
    L.control.layers(baseMaps, null, { position: 'bottomleft' }).addTo(map);
    // L.TileLayer.boundaryCanvas(osmURL, {
    //   boundary: data,
    //   opacity: 1,
    // }).addTo(map);

    map.on('baselayerchange', function(e) {
      if (e.name === 'Google Satellite') {
        map.attributionControl.setPrefix('Satellite imagery &copy; Google');
      } else {
        map.attributionControl.setPrefix(
          '&copy; <a href="http://osm.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> Contributors',
        );
      }
    });

    // L.control.scale().addTo(map);

    // map.addControl(L.control.zoom({ position: 'topleft' }));

    if (this.props.amenityDetail.geometries.features.length > 0) {
      L.easyButton(
        '<div class="download-icon selector8"><i class="fas fa-download"></i></div>',
        () => {
          downloadData(amenityType, filterState, location);
        },
        'Download this data',
      ).addTo(this.map);
    }

    L.control
      .attribution({
        prefix:
          '&copy; <a href="http://osm.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> Contributors',
      })
      .addTo(this.map); //eslint-disable-line
  }

  addBaseLayer(data) {
    //eslint-disable-line
    // this.clearHighlightLayers(this.map);

    // White overlay over selected location
    const baseLayer = L.TileLayer.boundaryCanvas(osmURL, {
      boundary: data,
    });

    baseLayer.addTo(this.map);

    // this.map.setMaxBounds(
    //   L.geoJSON(data)
    //     .getBounds()
    //     .pad(0.4),
    // );

    baseLayer.name = 'overlay';
    this.map.fitBounds(L.geoJson(data).getBounds());

    const geojsonLayer = L.geoJson(data).setStyle({
      fillOpacity: 0,
      weight: 1.3,
      dashArray: '2,5',
      color: '#333',
    });
    geojsonLayer.name = 'geojsonLayer';
    geojsonLayer.addTo(this.map);
  }

  addPois(data) {
    let oldLayer;
    let oldAmenity;
    const {
      map,
      filtersShow,
      selectedServiceSet,
      clearHighlightLayers,
      getSelectedServiceId,
    } = this;
    const {
      locale,
      history,
      amenityType,
      selectedService,
      handleDialogOpen,
    } = this.props;

    const iconOptions = amenity => {
      return L.icon({
        iconUrl:
          amenity === 'family_clinic'
            ? require(`images/family_clinic.svg`)
            : require(`images/${amenity}.svg`), // eslint-disable-line
        iconSize: [50, 50],
      });
    };

    const iconOptionsBlack = amenity => {
      return L.icon({
        iconUrl:
          amenity === 'family_clinic'
            ? require(`images/family_clinic-black.svg`)
            : require(`images/${amenity}-black.svg`), // eslint-disable-line
        iconSize: [60, 60],
      });
    };

    const dataLayer = L.geoJSON(null, {
      pointToLayer(feature, latlng) {
        return L.marker(latlng, {
          icon: iconOptions(
            feature.properties.tags['healthcare_facility:type'] ===
              'family_clinic'
              ? 'family_clinic'
              : feature.properties.tags.amenity,
          ),
        });
      },

      onEachFeature(feature, layer) {
        const clickDesc =
          locale === 'en'
            ? '<i>(name unavailable)</i><br/><span class="leaflet-tooltip-text">Click icon for more details</span>'
            : '<i>(name unavailable)</i><br/><span class="leaflet-tooltip-text">Дэлгэрэнгүй мэдээллийг дүрс дээр дарна уу</span>';

        if (
          layer.feature.properties.id ===
          (selectedService && selectedService.properties.id)
        ) {
          layer.setIcon(
            iconOptionsBlack(
              feature.properties.tags['healthcare_facility:type'] ===
                'family_clinic'
                ? 'family_clinic'
                : feature.properties.tags.amenity,
            ),
          );
          oldLayer = layer;
          oldAmenity = feature.properties.tags.amenity;
        }

        layer.on('mouseover', () => {
          layer
            .bindTooltip(
              feature.properties.tags.name === undefined
                ? clickDesc
                : `${
                    locale === 'en'
                      ? feature.properties.tags.name
                      : feature.properties.tags['name:mn'] ||
                        feature.properties.tags.name
                  }<br/><span class="leaflet-tooltip-text">${
                    locale === 'en'
                      ? 'Click icon for more details'
                      : 'Дэлгэрэнгүй мэдээллийг дүрс дээр дарна уу'
                  }</span>`,
              { direction: 'top' },
            )
            .openTooltip();
        });

        layer.on('click', () => {
          history.push(`/${amenityType}/${feature.properties.id}`);
          filtersShow(false);
          selectedServiceSet(feature);
          handleDialogOpen();
          layer.openPopup();
          layer.setIcon(
            iconOptionsBlack(
              feature.properties.tags['healthcare_facility:type'] ===
                'family_clinic'
                ? 'family_clinic'
                : feature.properties.tags.amenity,
            ),
          );
          if (oldLayer && oldLayer !== layer)
            oldLayer.setIcon(iconOptions(oldAmenity));
          // keep a reference to switch the icon back on the next click
          oldLayer = layer;
          oldAmenity =
            feature.properties.tags['healthcare_facility:type'] ===
            'family_clinic'
              ? 'family_clinic'
              : feature.properties.tags.amenity;

          const point = map.latLngToContainerPoint(layer._latlng);
          const newPoint = L.point([point.x - 10, point.y - 100]);
          const newLatLng = map.containerPointToLatLng(newPoint);

          clearHighlightLayers(map);
          map.panTo(newLatLng);
        });
      },
    });

    const markers = L.markerClusterGroup({
      disableClusteringAtZoom: 18,
      polygonOptions: {
        fillColor: color,
        color,
        fillOpacity: 0.4,
        weight: 1.5,
      },
    });

    dataLayer.addData(data);
    markers.addLayer(dataLayer);
    this.map.addLayer(markers);
    markers.name = 'markers';
    this.markers = markers;

    // this.map.setView([47.9351123, 106.8800054], 16);
  }

  onSearchResultSelect(selectedResult) {
    const { map, filtersShow, selectedServiceSet } = this;
    const iconOptions = amenity => {
      return L.icon({
        iconUrl:
          amenity === 'family_clinic'
            ? require(`images/family_clinic.svg`)
            : require(`images/${amenity}.svg`), // eslint-disable-line
        iconSize: [50, 50],
      });
    };

    const iconOptionsBlack = amenity => {
      return L.icon({
        iconUrl:
          amenity === 'family_clinic'
            ? require(`images/family_clinic-black.svg`)
            : require(`images/${amenity}-black.svg`), // eslint-disable-line
        iconSize: [60, 60],
      });
    };

    this.clearHighlightLayers(this.map);

    const latLng = [
      selectedResult.geometries.geometry.coordinates[1],
      selectedResult.geometries.geometry.coordinates[0],
    ];

    const selectedResultMarker = L.marker(latLng, {
      icon: iconOptions(
        selectedResult.geometries.properties.tags[
          'healthcare_facility:type'
        ] === 'family_clinic'
          ? 'family_clinic'
          : selectedResult.geometries.properties.tags.amenity,
      ),
    });
    selectedResultMarker.addTo(this.map);

    selectedResultMarker.on('click', () => {
      filtersShow(false);
      selectedServiceSet(selectedResult.geometries);
      selectedResultMarker.openPopup();
      selectedResultMarker.setIcon(
        selectedResult.geometries.properties.tags[
          'healthcare_facility:type'
        ] === 'family_clinic'
          ? 'family_clinic'
          : selectedResult.geometries.properties.tags.amenity,
      );

      const point = map.latLngToContainerPoint(layer._latlng);
      const newPoint = L.point([point.x - 10, point.y - 100]);
      const newLatLng = map.containerPointToLatLng(newPoint);
      map.panTo(newLatLng);
    });

    const highlight = L.circle(L.latLng(latLng), {
      radius: 30,
      fillColor: '#f7f7f7',
      weight: 1,
    });
    this.highlightLayer = L.layerGroup([highlight]).addTo(this.map);
    this.highlightLayer.name = 'highlight';
    // }
    // this.map.setZoom(16);
    setTimeout(() => {
      this.map.flyTo(L.latLng(latLng), 17);
    }, 0);
  }

  clearHighlightLayers(map) {
    // eslint-disable-line
    Object.keys(map._layers).forEach((maplayer, i) => {
      if (map._layers[maplayer].name === 'highlight') {
        map.removeLayer(map._layers[maplayer]);
      }
    });
  }

  render() {
    console.log('amenityDetail', this.props.amenityDetail);
    return (
      <div
        className="selector6 map-container"
        ref={node => (this.mapNode = node)}
      >
        {
          //   <div
          //   className="logoContainer"
          //   style={{ position: 'absolute', left: '-12px', bottom: '-15px' }}
          // >
          //   <img src={baatoLogo} width="80" alt="Baato logo" />
          // </div>
        }

        {this.props.loading && (
          <div
            style={{
              height: '100%',
              width: '100%',
              background: 'rgba(0,0,0,0.9)',
            }}
          >
            <div
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                color: '#fff',
                zIndex: '1000',
                transform: 'translate(-50%, -50%)',
              }}
            >
              <Loader
                type="Circles"
                color={PRIMARY_COLOR}
                height={65}
                width={65}
              />
            </div>
          </div>
        )}
        <div style={{ position: 'absolute', right: '12px', top: '15px' }}>
          <SearchView
            onSearchResultSelect={this.onSearchResultSelect}
            setIsShowFilter={this.props.setIsShowFilter}
            selectedServiceSet={this.selectedServiceSet}
            amenityType={this.props.amenityType}
          />
          <Hidden mdUp>
            <div style={{ position: 'absolute', zIndex: '1000', right: '0' }}>
              <div
                className="mt-4"
                style={{
                  borderRadius: '50%',
                  padding: '7px',
                  backgroundColor: PRIMARY_COLOR,
                }}
              >
                <FilterListIcon
                  fontSize="large"
                  style={{ color: 'white' }}
                  onClick={() => this.props.handleFilterDialogOpen()}
                />
              </div>
            </div>
          </Hidden>
        </div>
      </div>
    );
  }
}

Map.propTypes = {
  history: PropTypes.object,
  amenityDetail: PropTypes.object,
  firstTime: PropTypes.bool,
  setFirstTime: PropTypes.func,
  loading: PropTypes.bool,
  setIsShowFilter: PropTypes.func,
  selectedService: PropTypes.object,
  setSelectedService: PropTypes.func,
  downloadData: PropTypes.func,
  showFilters: PropTypes.func,
  amenityType: PropTypes.string,
  locale: PropTypes.string,
  handleFilterDialogOpen: PropTypes.func,
};

export default withWidth()(memo(Map));
