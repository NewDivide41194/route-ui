# ViaTick-Assignment

- **Technology stack**: This project primarly used [ReactJS], [Javascript(ES6)], [HTML] and [CSS].
- **Status**: 1.1

## Dependencies
- "mapbox-gl": "^1.13.3",
- "react": "^18.2.0",
- "react-dom": "^18.2.0"

## devDpendencies
- "@types/react": "^18.0.27",
- "@types/react-dom": "^18.0.10",
- "@vitejs/plugin-react": "^3.1.0",
- "vite": "^4.1.0"

## Installation and Run

```bash
npm install
npm run dev
```

## How to test the software
Send message with userId and use different userId for reply via 'live chat'.
Send notification via 'Firbase Cloud Messaging'.

## Create a Real-time Database
**Use Firebase Console**
1. Open the ‘Build’ menu
2. Click on 'Realtime Database' and then ‘Create Database’
3. After that, select the region you want to use
4. Finally, start the database in 'test mode'

## Get Configuration Details
**Use Firebase Console**
1. Click the Gear icon next to 'Project Overview'
2. Choose 'Project Settings'
3. Under ‘Your apps’, select ‘Web app’:
4. Enter a name for your application
5. Click on ‘Register App’
**Your application’s config values will then be visible in the ‘Your apps’ section**
6. Replace firebaseConfig with Your application values in util/firebase.

## Get FCM Key pair
**Use Firebase Console**
1. Click the Gear icon next to 'Project Overview'
2. Go to 'Project Setting'
3. Choose 'Cloud Messaging'
4. Enable both 'Firebase Cloud Messaging API (V1)' and 'Cloud Messaging API (Legacy)'
5. Under Web configuration, Click Generate New Private Key, then confirm by clicking Generate Key.
6. Replace vapidKey:'Your key pair' in utils/firebase.js

## Credits and references
1. https://docs.mapbox.com/help/tutorials/use-mapbox-gl-js-with-react/
2. https://www.npmjs.com/package/mapbox-gl
3. https://www.freecodecamp.org/news/dijkstras-shortest-path-algorithm-visual-introduction/