const baseURL="http://localhost:5000"

const getLocationUrl = "/getLocation";
const getRouteUrl = "/getRoute";

export const fetchLocation = (callback) => {
  fetch(baseURL + getLocationUrl)
    .then((res) => res.json())
    .then((data) => callback(null, data))
    .catch((err) => callback(err, null));
};

export const fetchRoute = (callback) => {
  fetch(baseURL + getRouteUrl)
    .then((res) => res.json())
    .then((data) => callback(null, data))
    .catch((err) => callback(err, null));
};
