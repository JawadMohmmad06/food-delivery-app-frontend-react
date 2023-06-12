import React from "react";
import { useParams } from "react-router-dom";
import { GoogleMap, useJsApiLoader,Marker} from '@react-google-maps/api';

import { useGeolocated } from "react-geolocated";
const containerStyle = {
  width: '500px',
  height: '500px'
  
};

export default function Product()
{ 
  const token=localStorage.getItem('Token')
  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
useGeolocated({
    positionOptions: {
        enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
});
  const[center,setcenter]=React.useState({
    lat: null,
    lng: null
  })
  
  React.useEffect(()=>{
    if(coords!=null){
      
      setcenter({
        lat: coords.latitude,
        lng: coords.longitude
      })
      }
    },[coords])
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyB-hCQPiEHZsGjzImXADQNHXwPC1eAxxKk"
    
  })
 
        const [city, setCity] = React.useState('');
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
 
 function handleMapClick(clickEvent)  {
    setcenter({lat:clickEvent.latLng.lat(),lng:clickEvent.latLng.lng()})
    
  };


    const{id}=useParams()
    const[product,setproduct]=React.useState()
    const[cart,setcart]=React.useState()
    const[restu,setrestu]=React.useState()
    const[view,setview]=React.useState()
    const[amount,setamount]=React.useState(0)
    const[response,setresponse]=React.useState()
    React.useEffect(() => {
        fetch("https://localhost:44364/api/restaurants/"+id, {
          method: 'GET',
          headers: {
            'Content-type': 'application/json',
            'Authorization': token
          },
        }).then(res => res.json())
          .then(json => {
            setrestu(json)
            setproduct(json.ProductDTOs);
           
          })
      }, []);
      React.useEffect(() => {if (product == null) {
        return;
      }
      setcart(product.map(each=>{return(
        {...each,cart:0})}));
      }, [product,setcart]);
    

      function addcart(i)
      {//window.location.href = '/product/2';
        setcart(prev=>{return(
            prev.map(each=>{return(
                each.Id==i?{...each,cart:each.cart==each.Quantity?each.Quantity:each.cart+1}:each
            )})
        )})
        
      }
      const[user,setuser]=React.useState()
      React.useEffect(() => {
        fetch("https://localhost:44364/api/users/token/"+token, {
          method: 'GET',
          headers: {
            'Content-type': 'application/json',
            'Authorization': token
          },
        }).then(res => res.json())
          .then(json => {
            setuser(json);
           
          })
      }, []);
      function removecart(i)
      {
        setcart(prev=>{return(
            prev.map(each=>{return(
                each.Id==i?{...each,cart:each.cart==0?0:each.cart-1}:each
            )})
        )})
      }
      React.useEffect(() => {if (cart == null) {
        return;
      }
     

      setview(cart.map(each=>{return(
        <>
            <tr>
                <td>{each.Id}</td>
                <td>{each.Name}</td>
                <td>{each.Price}</td>
                <td>{each.Quantity}</td>
                <td><button onClick={()=>removecart(each.Id)}onClickCapture={()=>{setamount(prev=>prev-each.Price)}}>-</button>
                {each.cart}
                <button onClick={()=>addcart(each.Id)} onClickCapture={()=>{setamount(prev=>prev+each.Price)}}>+</button>
                
                </td>
                
            </tr>
            </>
            
      )}));
      }, [product,setview,cart]);
      const[order,setorder]=React.useState()
     
     
      if (!isLoaded ||coords==null) {
        return <div>Loading...</div>;
      }
      
      function getorder()
      {let i=[]
        cart.forEach(element => {
          if(element.cart>=1)
          {
            const object={
              Pid:element.Id,
              Price:element.Price,
              Quantity:element.cart
            }
           i.push(object)
           
          }
        });
        setorder({
          Rid:id,
          Uid:user.Id,
          RestaurantName:restu.Name,
          lat:center.lat,
          lan:center.lng,
          OrderStatus:"Ordered",
          OrderDetailsDTOs:i
        
        })
       
      }
      
      function placeorder(){
        fetch("https://localhost:44364/api/orders/create",{
          method:'POST',
          headers:{
              'Content-type':'application/json',
              'Authorization':token
          },
          body:JSON.stringify(order)
      }).then(res=>res.json()).then(json=>{
          
          console.log(json)
          json==null?setresponse("Wrong info"): setresponse("Order Placed")

      })
      }
      console.log(order)
    return(
        <div><center>
            <p>res {id}</p>
            <table>
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Cart</th>
                </tr>
                </thead>
                <tbody>
                {view}</tbody>
            </table>
            <p>amoount{amount}</p>
            

            <br/><br/>
            
        
      
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={16}
        onLoad={onLoad}
        onUnmount={onUnmount}
        onClick={handleMapClick}
        
      >
         
         <Marker position={{ lat: center.lat, lng: center.lng }} />
      
        <></>
      </GoogleMap></center>
      <br/><br/>
            <button onClick={placeorder} onClickCapture={getorder}>Place Order</button>
            {response}
        </div>
    )
}