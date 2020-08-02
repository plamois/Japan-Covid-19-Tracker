import React, { useState, useEffect, useCallback } from 'react';
import MapView from './Components/MapView';
import 'leaflet/dist/leaflet.css';
import './Css/App.scss';
import Axios from 'axios';
import ListView from './Components/ListView';
import DetailsView from './Components/DetailsView';

const api = 'https://covid19-japan-web-api.now.sh/api/v1/prefectures';

function App() {
  const [locationArray, setLocationArray] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [mapCenter, setMapCenter]= useState([35, 140]);
  
  function sortedLocationArray(locations) {
    return [...locations].sort((location1, location2) => {
      return location2.cases - location1.cases;
    });
  }

  const onSelectLocation = useCallback((id) => {
    const location = locationArray.find(_location => _location.id === id);
    if (location === undefined) {
      setSelectedLocation(null);
      return;
    }
    setSelectedLocation(location);
    const { lat, lng } = location;
    setMapCenter([lat, lng]);
  }, [locationArray]);

  const onDeselectLocation = useCallback(() => {
    setSelectedLocation(null);
  }, []);

  useEffect(() => {
    Axios.get(api).then(response => {
      const sortedLocations = sortedLocationArray(response.data);
      setLocationArray(sortedLocations);
    }).catch(error => {
      console.log(error);
    })
  }, []);

  let detailsView = null;
  if (selectedLocation != null) {
    detailsView = <DetailsView location={selectedLocation} onClickClose={onDeselectLocation} />
  }

  return (
    <div className="App">
      <ListView 
        locationArray={locationArray} 
        selectedLocation={selectedLocation} 
        onSelectItem={onSelectLocation} 
        onDeselectItem={onDeselectLocation} />
      <MapView 
        locationArray={locationArray} 
        mapCenter={mapCenter} 
        onSelectMarker={onSelectLocation} />
      {detailsView}
    </div>
  );
}

export default App;