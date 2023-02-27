export const addRoute=(map)=>map.on('load', () => {
    map.addLayer('route', {
    'type': 'geojson',
    'data': {
    'type': 'Feature',
    'properties': {},
    'geometry': {
    'type': 'LineString',
    'coordinates': [
        [
            103.693324,
            1.342054
        ],
        [
            103.693279,
            1.342018
        ],
        [
            103.693226,
            1.34208
        ],
        [
            103.694912,
            1.343414
        ],
        [
            103.694992,
            1.343473
        ],
        [
            103.695038,
            1.343416
        ]
    ]
    }
    }
    });
    map.addLayer({
    'id': 'route',
    'type': 'line',
    'source': 'route',
    'layout': {
    'line-join': 'round',
    'line-cap': 'round'
    },
    'paint': {
    'line-color': '#adf',
    'line-width': 8
    }
    });
    });