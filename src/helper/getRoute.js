import { fetchRoute } from "../api";

export const getRoute = (map, end) => {
  fetchRoute((err, data) => {
    if (data) {
      if (data.length === 0) {
        alert("No route found!");
      }
      const geojson = data;
      for (var i = 0; i < geojson.length; i++) {
        map.addLayer({
          id: "route" + i,
          type: "line",
          source: {
            type: "geojson",
            data: geojson[i],
          },
          layout: {
            "line-join": "round",
            "line-cap": "round",
          },
          paint: {
            "line-color": "#3887be",
            "line-width": 5,
          },
        });
      }
    } else {
      alert(err);
    }
  });
};
