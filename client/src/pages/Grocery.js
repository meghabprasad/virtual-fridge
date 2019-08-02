import React, { Component } from "react";
import axios from "axios";
import { GoogleMap, withScriptjs, withGoogleMap } from "react-google-maps";

// class Grocery extends Component {

//     state = {
//         stores: []
//     }

//     callback = (results, status) => {
//         if (status == google.maps.places.PlacesServiceStatus.OK) {
//             for (var i = 0; i < results.length; i++) {
//                 var place = results[i];
//                 createMarker(results[i]);
//             }
//         }
//     }

//     initialize = () => {
//         var pyrmont = new google.maps.LatLng(-33.8665433, 151.1956316);

//         map = new google.maps.Map(document.getElementById('map'), {
//             center: pyrmont,
//             zoom: 15
//         });

//         var request = {
//             location: pyrmont,
//             radius: '500',
//             type: ['restaurant']
//         };

//         service = new google.maps.places.PlacesService(map);
//         service.nearbySearch(request, this.callback);
//     }

//     showNearbyStores = () => {
//         // axios.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=1500&type=restaurant&keyword=cruise&key=AIzaSyA83YamYWw9PfnThTJVb13gCQC2UkKiyoc')
//         //     .then(res => {
//         //         console.log("Response", res);
//         //     })
//         //     .catch(err => {
//         //         throw err;
//         //     })
//         conso
//     }

//     componentDidMount() {
//         this.showNearbyStores();
//     }


//     render() {
//         return (
//             <div>
//                 <h1>
//                     Grocery Page updated
//                 </h1>
//             </div>
//         )
//     }
// }

function Map() {
    return (
        <GoogleMap
            defaultZoom={10}
            defaultCenter={{ lat: 37, lng: -122 }} />
    )
}

const WrappedMap = withScriptjs(withGoogleMap(Map));

//eventually work on hiding the API key
export default function Grocery() {
    return (
        <div style = {{width: '100vw', height: '100vh'}}>
            <WrappedMap googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyC4EuVzFkBgprsMRiEZsiC-dQ9d23nBWRs`} 
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `100%` }} />}
            mapElement={<div style={{ height: `100%` }} />}/>
        </div>
    )
};