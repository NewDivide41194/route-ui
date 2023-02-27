// create a function to make a directions request
import {mapBoxKey} from "../config/config"
import { geojson } from "../routeGeoJson";

export const getRoute = async (map,end) => {
    // make a directions request using cycling profile
    // an arbitrary start will always be the same
    // only the end or destination will change
    // const map = document.getElementsByClassName("map-container")
    // const start=[103.81380771084963, 1.3617195284167138]
  
    // const query = await fetch(
    //   `https://api.mapbox.com/directions/v5/mapbox/cycling/${start[0]},${start[1]};${end[0]},${end[1]}?steps=true&geometries=geojson&access_token=${mapBoxKey}`,
    //   { method: "GET" }
    // );
    // const json = await query.json();
    // const data = json.routes[0];
    // const route = data.geometry.coordinates;
    // const geojson = {
    //   type: "Feature",
    //   properties: {},
    //   geometry: {
    //     type: "LineString",
    //     coordinates: route,
    //   },
    // };
    // if the route already exists on the map, we'll reset it using setData
   for(var i=0;i<geojson.length;i++){

    map.addLayer({
       id: "route"+i,
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
       //   "line-opacity": 0.75,
       },
     });
   }
  
        
      
    // add turn instructions here at the end
    map.on("load", () => {
        // make an initial directions request that
        // starts and ends at the same location
        getRoute(start);
      
        // Add starting point to the map
        map.addLayer({
          id: "point",
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
                    coordinates: start,
                  },
                },
              ],
            },
          },
          paint: {
            "circle-radius": 10,
            "circle-color": "#3887be",
          },
        });
        // this is where the code from the next step will go
      });
  };
  
 
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