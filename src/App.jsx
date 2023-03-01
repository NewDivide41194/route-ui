import mapboxgl from "mapbox-gl";

import React, { useRef, useEffect, useState } from "react";
import {
  fetchAddCustomLocation,
  fetchDeleteCustomLocation,
  fetchLocation,
} from "./api";
import "./App.css";
import { mapBoxKey } from "./config/config";
import { addNode } from "./helper/addNode";
import { getRoute } from "./helper/getRoute";

const App = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [zoom, setZoom] = useState(13);
  const center = [103.70304676245479, 1.3507163548200936];
  const [locations, setLocations] = useState(null);
  const [loading, setLoading] = useState(false);
  mapboxgl.accessToken = mapBoxKey;

  const customLocation = [];

  const _handleMapClick = (event) => {
    if (customLocation.length < 5) {
      const coords = Object.keys(event.lngLat).map((key) => event.lngLat[key]);
      addNode(map.current, coords);
      customLocation.push({
        geometry: { type: "Point", coordinates: coords },
        type: "manual",
      });
    } else {
      alert("Exceed maximum pin!");
      return;
    }
  };
  const _handleResetClick = () => {
    fetchDeleteCustomLocation();
    window.location.reload();
  };

  const _handleGenerate = () => {
    setLoading(true);
    fetchAddCustomLocation({ customLocation }, (err, data) => {
      if (data) {
        if (data.length === 0) {
          alert("No Location Found!");
        }
      } else {
        alert(err);
      }
      setLoading(false);
    });
  };

  useEffect(() => {
    setLoading(true);

    fetchLocation((err, data) => {
      if (data) {
        setLocations(data);
      } else {
        alert(err);
      }
      setLoading(false);
    });
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [center[0], center[1]],
      zoom: zoom,
    }).addControl(new mapboxgl.FullscreenControl());
  }, []);

  useEffect(() => {
    if (!map.current || !locations) return;

    for (const feature of locations.features) {
      //Add Default Marker
      const el = document.createElement("div");
      el.className = "marker";
      el.innerHTML = "<span><b>" + (feature.id - 1) + "</b></span>";
      //Add Default Marker

      if (map.current)
        new mapboxgl.Marker(el)
          .setLngLat(feature.geometry.coordinates)
          .addTo(map.current);
      console.log(feature.geometry.coordinates);
    }

    map.current.on("click", (event) => {
      _handleMapClick(event);
    });

    map.current.on("load", () => {
      getRoute(map.current);
    });
  });

  return (
    <React.Fragment>
     {loading&&<div>Loading ...</div>}
      <div ref={mapContainer} className="map-container" />
      <button className="btn-secondary" onClick={() => _handleResetClick()}>
        Reload
      </button>
      <button className="btn-primary" onClick={() => _handleGenerate()}>
        Generate Routes
      </button>
    </React.Fragment>
  );
};

export default App;
