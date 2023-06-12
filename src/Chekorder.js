import React from "react";
import { useParams } from "react-router-dom";
import { GoogleMap, useJsApiLoader,Marker} from '@react-google-maps/api';

import { useGeolocated } from "react-geolocated";
const containerStyle = {
  width: '500px',
  height: '500px'
  
};

export default function Checkorder()
{     const{id}=useParams()
    const[checko,setchecko]=React.useState( )
    const[view,setview]=React.useState( )
    const[center,setcenter]=React.useState({
        lat: null,
        lng: null
      })
    React.useEffect(() => {
        fetch("https://localhost:44364/api/orders/"+id, {
          method: 'GET',
          headers: {
            'Content-type': 'application/json',
        
          },
        }).then(res => res.json())
          .then(json => {
            setchecko(json);
            setcenter({
                lat: json.lat,
                lng: json.lan
              })
            
          })
      }, []);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyB-hCQPiEHZsGjzImXADQNHXwPC1eAxxKk"
    
  })
 
       
  const [map, setMap] = React.useState(null)
  const onLoad = React.useCallback(function callback(map) {
    if(center.lat!=null)
    {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map)}
  }, [setcenter])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])
 


console.log(checko)

      if (!isLoaded||center.lat==null||checko==null) {
        return <div>Loading...</div>;
      }
      
     console.log(checko)
    return(
        <div><center>
           
        <table>
            <tr>
                <td>Id</td>
                <td>RestaurantName</td>
                <td>Ammount</td>
                <td>OrderStatus</td>
            </tr>
            <tr>
                <td>{checko.Id}</td>
                <td>{checko.RestaurantName}</td>
                <td>{checko.Amount}</td>
                <td>{checko.OrderStatus}</td>
                
                
            </tr>
        </table>
        <br/><br/>  <br/><br/>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={16}
        onLoad={onLoad}
        onUnmount={onUnmount}
       
        
      >
         
         <Marker position={{ lat: center.lat, lng: center.lng }} />
      
        <></>
      </GoogleMap>
      <br/><br/>
     
      </center>
      <br/><br/>
           
        </div>
    )
}