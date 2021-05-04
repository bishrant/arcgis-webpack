import MapView from '@arcgis/core/views/MapView';
import Map from '@arcgis/core/Map';
import './index.css';

const initMap = async () => {
    const esriMap = new Map({
        basemap: 'streets'
    })
    const mapViewProperties = {
        container: 'mapViewDiv',
        center: [0.1278, 51.5074],
        zoom: 8,
        map: esriMap
    };

    const mapView = new MapView(mapViewProperties);

    await mapView.when();
}

window.addEventListener('DOMContentLoaded', (event) => {
    initMap();
});