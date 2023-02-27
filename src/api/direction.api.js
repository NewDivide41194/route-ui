import { baseURL } from "../config/config";

const directionAPI =
  "https://api.mapbox.com/directions/v5/mapbox/cycling/-84.518641,39.134270;-84.512023,39.102779?geometries=geojson&access_token=pk.eyJ1IjoiaGVpbi1odGV0IiwiYSI6ImNsZWpmeHl2YTA5cDMzcW52dXhxeGNwdnQifQ.J07fJ3kqnnEJElsXo-C4jQ";

const getLocationUrl = "/getLocation";

export const fetchLocation = (callback) => {
  fetch(baseURL + getLocationUrl)
    .then((res) => res.json())
    .then((data) => callback(null, data))
    .catch((err) => callback(err, null));
};
