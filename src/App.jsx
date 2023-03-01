import mapboxgl from "mapbox-gl";

import React, { useRef, useEffect, useState } from "react";
import { fetchAddCustomLocation, fetchLocation } from "./api";
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

  mapboxgl.accessToken = mapBoxKey;

  const customLocation = [];

  const _handleMapClick = (event) => {
    if (customLocation.length < 5) {
      const coords = Object.keys(event.lngLat).map((key) => event.lngLat[key]);
      addNode(map.current, coords);
      customLocation.push({geometry:coords});
    } else {
      alert("Exceed maximum pin!");
      return;
    }
  };

  const _handleGenerate = () => {
    fetchAddCustomLocation({customLocation}, (err, data) => {
      if (data) {
        console.log(data);
      } else {
        console.log(err);
      }
    });
  };

  useEffect(() => {
    fetchLocation((err, data) => {
      if (data) {
        console.log(data);
        setLocations(data);
      }
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
    if (!map.current || !locations) return; // wait for map to initialize

    for (const feature of locations.features) {
      // create a HTML element for each feature
      const el = document.createElement("div");
      el.className = "marker";
      el.innerHTML = "<span><b>" + (feature.id - 1) + "</b></span>";
      // make a marker for each feature and add to the map
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
      <button className="btn-secondary">Reset to Default</button>
      <button className="btn-primary" onClick={() => _handleGenerate()}>
        Generate Routes
      </button>
      <div ref={mapContainer} className="map-container" />
    </React.Fragment>
  );
};

export default App;

// map.current.on("move", () => {
//   setLng(map.current.getCenter().lng.toFixed(4));
//   setLat(map.current.getCenter().lat.toFixed(4));
//   setZoom(map.current.getZoom().toFixed(2));
// });

// Add starting point to the map
// map.current.addNode({
//   id: "point",
//   type: "circle",
//   source: {
//     type: "geojson",
//     data: {
//       type: "FeatureCollection",
//       features: [
//         {
//           type: "Feature",
//           properties: {},
//           geometry: {
//             type: "Point",
//             coordinates: start,
//           },
//         },
//       ],
//     },
//   },
//   paint: {
//     "circle-radius": 10,
//     "circle-color": "#3887be",
//   },
// });
// this is where the code from the next step will go
