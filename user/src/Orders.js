import React from "react";
export default function Orders()
{const token=localStorage.getItem('Token')
    const[order,setorder]=React.useState()
    const[user,setuser]=React.useState()
    const[view,setview]=React.useState()
    React.useEffect(() => {
      fetch("https://localhost:44364/api/users/orders/"+token, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          'Authorization': token
        },
      }).then(res => res.json())
        .then(json => {
            setorder(json);
        })
        
    }, []);
    
    if(order==null)
    {
        return(
            <div>Loading...</div>
        )
    }
let i=order.map(each=>{return(
    <>
    <tr>
        <th>{each.RestaurantName}</th>
        <th>{each.OrderStatus}</th>
        <th>{each.Amount}</th>
        <th><a href={"/delete/"+each.Id}>Delete</a></th>
    </tr></>
)})
    
    return(
        <div>
            <table>
                <tr>
                    <th>RestaurantName</th>
                    <th>OrderStatus</th>
                    <th>Amount</th>
                    <th>Delete</th>
                </tr>
            </table>
            {i}
        </div>
    )
}