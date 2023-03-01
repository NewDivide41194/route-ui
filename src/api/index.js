import {
  addCustomLocationUrl,
  baseURL,
  deleteCustomLocationUrl,
  getLocationUrl,
  getRouteUrl,
} from "./url";

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

export const fetchAddCustomLocation = (customLocation, callback) => {
  fetch(baseURL + addCustomLocationUrl, {
    method: "POST",
    headers: {
      "Content-type": "application/json;charset=UTF-8",
    },
    body: JSON.stringify(customLocation),
  })
    .then((res) => res.json())
    .then((data) => callback(null, data))
    .catch((err) => callback(err, null));
};

export const fetchDeleteCustomLocation = ( callback) => {
  fetch(baseURL + deleteCustomLocationUrl, {
    method: "DELETE",

  })
    .then((res) => res.json())
    .then((data) => callback(null, data))
    .catch((err) => callback(err, null));
};
