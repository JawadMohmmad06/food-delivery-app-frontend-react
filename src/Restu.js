import React from "react";
import { Link, useParams } from "react-router-dom";
export default function Restu()
{
    const[restaurant,setRestaurant]=React.useState()
    const[view,setview]=React.useState()
    const token=localStorage.getItem('Token')
    React.useEffect(() => {
        fetch("https://localhost:44364/api/restaurants", {
          method: 'GET',
          headers: {
            'Content-type': 'application/json',
            'Authorization': token
          },
        }).then(res => res.json())
          .then(json => {
            setRestaurant(json);
            console.log(json);
          })
      }, []);
      console.log(restaurant)
      React.useEffect(() => {if (restaurant == null) {
        return;
      }
        setview(restaurant.map(data => {return(
            <><tr>
            <th>{data.Name}</th>
            <th>{data.Location}</th>
            <th>{data.Status}</th>
            <th>{data.Rating}</th>
            <Link to={"/product/"+data.Id}>Select</Link>
            </tr>
            </>
            
        )}));
      }, [restaurant, setview]);
     console.log("xd",view)
      return(
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Location</th>
                        <th>Status</th>
                        <th>Rating</th>
                        <th>Select</th>
                    </tr>
                </thead>
          {view}
            </table>
        </div>
      )
}