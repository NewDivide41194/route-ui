import mapboxgl from "mapbox-gl";

import React, { useRef, useEffect, useState } from "react";
import { fetchLocation } from "./api/direction.api";
import "./App.css";
import { mapBoxKey } from "./config/config";
import { addLayer } from "./helper/addLayer";
import { getRoute } from "./helper/getRoute";
// import { getRoute } from "./helper/helper";

function App() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(103.81380771084963);
  const [lat, setLat] = useState(1.3617195284167138);
  const [zoom, setZoom] = useState(10);
  const start = [103.81380771084963, 1.3617195284167138];
  const [locations, setLocations] = useState(null);

  mapboxgl.accessToken = mapBoxKey;
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
      center: [lng, lat],
      zoom: zoom,
    }).addControl(new mapboxgl.FullscreenControl());
  },[]);
  
  useEffect(() => {
    if (!map.current||!locations) return; // wait for map to initialize
    // const start=locations.features[0].coordinates
    const geometryData=locations.features

    for (const feature of locations.features) {
      // create a HTML element for each feature
      const el = document.createElement("div");
      el.className = "marker";
      el.innerHTML = '<span><b>' + (feature.id-1) + '</b></span>'
      // make a marker for each feature and add to the map
      if (map.current)
        new mapboxgl.Marker(el)
          .setLngLat(feature.geometry.coordinates)
          .addTo(map.current);
          console.log(feature.geometry.coordinates);
    }
// map.current.addLayer({
//         id: "point",
//         type: "circle",
//         source: {
//           type: "geojson",
//           data: {
//             type: "FeatureCollection",
//             features: [
//               {
//                 type: "Feature",
//                 properties: {},
//                 geometry: {
//                   type: "Point",
//                   coordinates: start,
//                 },
//               },
//             ],
//           },
//         },
//         paint: {
//           "circle-radius": 10,
//           "circle-color": "#3887be",
//         },
//       });


    map.current.on("click", (event) => {
      const coords = Object.keys(event.lngLat).map((key) => event.lngLat[key]);
      const end = {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            properties: {},
            geometry: {
              type: "Point",
              coordinates: coords,
            },
          },
        ],
      };
      if (map.current.getLayer("end")) {
        map.current.getSource("end").setData(end);
      } else {
        addLayer(map.current, coords);
      }
    });

    map.current.on("load", () => {
      getRoute(map.current);

      // make an initial directions request that
      // starts and ends at the same location
      // getRoute(map.current,geometryData);
     
    });
  });

  return (
    <div className="App">
      <div ref={mapContainer} className="map-container"></div>
    </div>
  );
}

export default App;

    // map.current.on("move", () => {
    //   setLng(map.current.getCenter().lng.toFixed(4));
    //   setLat(map.current.getCenter().lat.toFixed(4));
    //   setZoom(map.current.getZoom().toFixed(2));
    // });

     // Add starting point to the map
      // map.current.addLayer({
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