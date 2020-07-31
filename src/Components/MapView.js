import React from 'react';
import { Map, TileLayer, Marker } from 'react-leaflet';
import { divIcon } from 'leaflet';

/*
1. 1-100 => pink, super very small
2. 101-500 => pink, very small
3. 501-1000 => pink, small
4. 1001-5000 => purple, normal
5. 5001-10000 => purple, big
6. 10001-50000 => red, very big
7. 50000 up => red, super very big
*/
const icons = {
    xxSmall: divIcon({className: 'marker-icon pink', iconSize: [12, 12]}),
    xSmall: divIcon({className: 'marker-icon pink', iconSize: [16, 16]}),
    small: divIcon({className: 'marker-icon pink', iconSize: [24, 24]}),
    normal: divIcon({className: 'marker-icon purple', iconSize: [32, 32]}),
  large: divIcon({className: 'marker-icon purple', iconSize: [48, 48]}),
  xLarge: divIcon({className: 'marker-icon red', iconSize: [72, 72]}),
  xxLarge: divIcon({className: 'marker-icon red', iconSize: [96, 96]})
};

function MapView(props) {
    const { locationArray, mapCenter, onSelectMarker } = props;

    const markerElements = locationArray.map(location => {
        const {
            id, name_en, name_ja,
            lat, lng,
            cases
        } = location;

        let markerIcon = icons.xxSmall;
        if (cases >= 101 && cases <= 500) {
            markerIcon = icons.xSmall;
        }
        else if (cases >= 501 && cases <= 1000) {
            markerIcon = icons.small;
        }
        else if (cases >= 1001 && cases <= 5000) {
            markerIcon = icons.normal;
        }
        else if (cases >= 5001 && cases <= 10000) {
            markerIcon = icons.large;
        }
        else if (cases >= 10001 && cases <= 50000) {
            markerIcon = icons.xLarge;
        }
        else if (cases >= 50001) {
            markerIcon = icons.xxLarge;
        }


        return (
            <Marker 
                key={`${id}-${name_en}`} 
                position={[lat, lng]}
                icon={markerIcon} 
                onclick={() => onSelectMarker(id)} >
            </Marker>
        );
    });

    return (
        <Map className="map-view" center={mapCenter} zoom={5}>
            <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {markerElements}
        </Map>
    );
}

export default MapView;