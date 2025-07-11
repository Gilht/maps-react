import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { MapsApp } from './MapsApp'


if(!navigator.geolocation) {
  alert("geolication is unnacessible")
  throw new Error("your browser doesnt have geolocation option");
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MapsApp />
  </React.StrictMode>,
)
