import { fetchRoute } from "../api";

export const getRoute = (map, end) => {
  fetchRoute((err, data) => {
    if (data) {
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
      console.log(data);
    }
  });
};

// add turn instructions here at the end
// map.on("load", () => {
//   // make an initial directions request that
//   // starts and ends at the same location
//   getRoute(start);

//   // Add starting point to the map
//   map.addLayer({
//     id: "point",
//     type: "circle",
//     source: {
//       type: "geojson",
//       data: {
//         type: "FeatureCollection",
//         features: [
//           {
//             type: "Feature",
//             properties: {},
//             geometry: {
//               type: "Point",
//               coordinates: start,
//             },
//           },
//         ],
//       },
//     },
//     paint: {
//       "circle-radius": 10,
//       "circle-color": "#3887be",
//     },
//   });
//   // this is where the code from the next step will go
// });
//    // if the route already exists on the map, we'll reset it using setData
//    if (map.getSource("route")) {
//     map.getSource("route").setData(geojson);
//   }
//   // otherwise, we'll make a new request
//   else {
//     map.addLayer({
//       id: "route",
//       type: "line",
//       source: {
//         type: "geojson",
//         data: geojson,
//       },
//       layout: {
//         "line-join": "round",
//         "line-cap": "round",
//       },
//       paint: {
//         "line-color": "#3887be",
//         "line-width": 5,
//       //   "line-opacity": 0.75,
//       },
//     });
//   }
