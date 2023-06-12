import React from "react";
export default function Update()
{  const token=localStorage.getItem('Token')
    const[tokenuser,settokenuser]=React.useState()
    const[response,setresponse]=React.useState()
    React.useEffect(() => {
        fetch("https://localhost:44364/api/users/token/"+token, {
          method: 'GET',
          headers: {
            'Content-type': 'application/json',
            'Authorization': token
          },
        }).then(res => res.json())
          .then(json => {
            settokenuser(json);
           
          })
      }, []);
      console.log(tokenuser)
      function Change(event)
      {const{name,value}=event.target
      settokenuser(prev=>({...prev,[name]:value}))}
      function update()
      {
        fetch("https://localhost:44364/api/users/update",{
            method:'POST',
            headers:{
                'Content-type':'application/json',
                'Authorization':token
            },
            body:JSON.stringify(tokenuser)
        }).then(res=>res.json()).then(json=>{setresponse(json)})
        
      }console.log("ddd",response)
    return(
        <div>
            <label for="Name">Name</label>
            <input type="text" name="Name" onChange={Change} value={ tokenuser==null?null:tokenuser.Name}></input>
            <br/><br/>
            <label for="Username">Username</label>
            <input type="text" name="Username" onChange={Change} value={tokenuser==null?null:tokenuser.Username}></input>
            <br/><br/>
            <label for="Password">Password</label>
            <input type="text" name="Password" onChange={Change} value={tokenuser==null?null:tokenuser.Password}></input>
            <br/><br/>
            
            <label for="Email">Email</label>
            <input type="text" name="Email" onChange={Change} value={tokenuser==null?null:tokenuser.Email}></input>
            <br/><br/>
            <label for="Address">Adress</label>
            <input type="text" name="Address" onChange={Change} value={tokenuser==null?null:tokenuser.Address}></input>
            <br/><br/>
            <label for="MobileNumber">MobileNumber</label>
            <input type="text" name="MobileNumber" onChange={Change} value={tokenuser==null?null:tokenuser.MobileNumber}></input>
            <br/><br/>
            <button onClick={update} >Submit</button>
            <br></br>
            {response==null?"":response==true?"Updated":"Error"}
        </div>
    )
}