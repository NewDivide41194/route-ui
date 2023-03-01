export const addNode = (map, coords) => {
  map.addLayer({
    id: "end"+coords,
    type: "circle",
    source: {
      type: "geojson",
      data: {
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
      },
    },
    paint: {
      "circle-radius": 10,
      "circle-color": "#f30",
    },
  });
 
};
