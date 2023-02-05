import React, { useState } from "react";
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div style={{ fontSize: "24px", fontWeight: "bold" }}>{text}</div>;

export function GoogleMap() {

    const [coordinates, setCoordinates] = useState({ lat: 32.0853, lng: 34.7818 })
    const zoom = 8

    const handleClick = (branchCor) => {
        setCoordinates(branchCor)
    }

    return (
        // Important! Always set the container height explicitly
        <div style={{ height: '55vh', width: '50%', margin: 'auto' }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: "AIzaSyBWq5o8s42HsTNUsE5u68M4Nu9u_AkOMB8" }}
                defaultCenter={coordinates}
                center={coordinates}
                defaultZoom={zoom}
            >
                <AnyReactComponent
                    lat={32.0853}
                    lng={34.7818}
                    text="📍TLV "
                />

                <AnyReactComponent
                    lat={32.4913}
                    lng={35.0115}
                    text="📍Haifa"
                />

                <AnyReactComponent
                    lat={31.140}
                    lng={34.47}
                    text="📍Beer Sheva"
                />
            </GoogleMapReact>
            <div className="branches-btns">
            <button className="btn" onClick={()=>handleClick({lat:32.4913 ,lng:35.0115})}>Haifa</button>
            <button className="btn" onClick={()=>handleClick({lat:32.0853 ,lng:34.7818})}>TLV</button>
            <button className="btn" onClick={()=>handleClick({lat:31.140 ,lng:34.47})}>Beer-Sheva</button>
            </div>
        </div>
    )
}