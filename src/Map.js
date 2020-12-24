import React from 'react'
import 'leaflet/dist/leaflet.css';
import {Map as LeafletMap , TileLayer} from 'react-leaflet'
import "./Map.css"


function Map({center , zoom}) {
    return (
        <div className="map">
           <LeafletMap center={center} zoom={zoom} scrollWheelZoom={false}>
               <TileLayer 
                url= "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
             attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
             />
           </LeafletMap>
        </div>
    )
}

export default Map
