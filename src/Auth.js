import { Navigate, Outlet, useParams } from "react-router-dom";
import { Link, Route, Routes } from 'react-router-dom';
import React from "react";
export default function Auth()
{const[response,setresponse]=React.useState("")
    const token=localStorage.getItem('Token')

    React.useEffect(() => {
        fetch("https://localhost:44364/api/users/token/"+token, {
          method: 'GET',
          headers: {
            'Content-type': 'application/json'
          },
        }).then(res => res.json())
          .then(json => {
            setresponse(json);
            ;
          })
      }, []);
      console.log(response)
    let auth={'go':token!=""?response!=null:false}
    if (response ==null) {
        return <div>Loading...</div>;
      }
      

    return(
        auth.go?<Outlet/>:<Navigate to="/login"></Navigate>
    )
}