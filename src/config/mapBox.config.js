mapboxgl.accessToken = process.env.MAPBOX_TOKEN;
export const map = new mapboxgl.Map({
  container: mapContainer.current,
  style: "mapbox://styles/mapbox/streets-v12",
  center: [lng, lat],
  zoom: zoom,
}).addControl(new mapboxgl.FullscreenControl());
