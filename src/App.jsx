import mapboxgl from "mapbox-gl";

import React, { useRef, useEffect, useState } from "react";
import {
  fetchAddCustomLocation,
  fetchDeleteCustomLocation,
  fetchLocation,
} from "./api";
import { mapBoxKey } from "./config/config";
import { addNode } from "./helper/addNode";
import { getRoute } from "./helper/getRoute";

const App = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [zoom, setZoom] = useState(13);
  const center = [103.7216117663823,1.3441241804128765];
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
  const _handleResetClick = async () => {
    setLoading(true);
    await fetchDeleteCustomLocation((err, data) => {
      setLoading(false);
      window.location.reload();
      if (err) {
        console.log(err);
      }
    });
  };

  const _handleGenerate = () => {
    if (customLocation.length === 0) {
      alert("No point added!");
      return;
    }
    setLoading(true);
    fetchAddCustomLocation({ customLocation }, (err, data) => {
      if (data) {
        if (data.length === 0) {
          alert("No Location Found!");
        }
        window.location.reload();
      } else {
        alert(err);
      }
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchLocation((err, data) => {
      if (data) {
        setLocations(data);
      } else {
        alert(err);
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
    if (!map.current || !locations) return;

    for (const feature of locations.features) {
      //Add Default Marker
      const el = document.createElement("div");
      el.className = "marker";
      el.innerHTML = "<span><b>" + (feature.id - 1) + "</b></span>";
      el.style.backgroundColor =
        feature.type === "default" ? "#eb3498" : "#9e0025";
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

    map.current.on("load", async () => {
      await getRoute(map.current);
    });
  });

  return (
    <React.Fragment>
      {loading ? (
        <div className="loading">Loading ...</div>
      ) : (
        <div ref={mapContainer} className="map-container" />
      )}
      <button
        className="btn-secondary"
        disabled={loading}
        style={{ cursor: loading ? "not-allowed" : "pointer" }}
        onClick={() => _handleResetClick()}
      >
        Reset
      </button>
      <button
        className="btn-primary"
        disabled={loading}
        style={{ cursor: loading ? "not-allowed" : "pointer" }}
        onClick={() => _handleGenerate()}
      >
        Generate Routes
      </button>
    </React.Fragment>
  );
};

export default App;
