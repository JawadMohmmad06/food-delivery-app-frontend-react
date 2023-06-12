import React from "react";
import { Link, useParams } from "react-router-dom";
export default function Deletee()
{const token=localStorage.getItem('Token')
    const{id}=useParams()
const[view,setview]=React.useState()
React.useEffect(() => {
    fetch("https://localhost:44364/api/orders/delete/"+id, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'Authorization': token
      },
    }).then(res => res.json())
      .then(json => {
        setview(json);
      })
      
  }, []);
console.log(view)
  
  if (view==null) {
    return <div>Loading...</div>;
  }
  window.location.href = '/orders';
 
}