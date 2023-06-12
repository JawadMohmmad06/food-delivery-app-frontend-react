import React from "react";
import { json,Link } from "react-router-dom";
export default function Regis()
{
    const[response,setresponse]=React.useState("")
    const[form,setForm]=React.useState({
        Name:"",
        Username:"",
        DOB:"",
        Email:"",
        Gender:"",
        Password:"",
        Address:"",
        MobileNumber:""
    })
    function Change(event)
    {
        const{name,value}=event.target
        setForm(prev=>({...prev,[name]:value}))
    }
    function Reg()
    {
        fetch("https://localhost:44364/api/users/create",{
            method:'POST',
            headers:{
                'Content-type':'application/json',
                
            },
            body:JSON.stringify(form)
        }).then(res=>res.json()).then(json=>{setresponse(json.Msg)})
        console.log("ddd",response)
    }
    return(
        <div>
            <label for="Name">Name</label>
            <input type="text" name="Name" onChange={Change} value={form.Name}></input>
            <br/><br/>
            <label for="Username">Username</label>
            <input type="text" name="Username" onChange={Change} value={form.Username}></input>
            <br/><br/>
            <label for="Password">Password</label>
            <input type="text" name="Password" onChange={Change} value={form.Password}></input>
            <br/><br/>
            <label for="DOB">DOB</label>
            <input type="date" name="DOB" onChange={Change} ></input>
            <br/><br/>
            <label>
        <input type="radio" name="Gender" value="Male" checked={form.Gender === 'Male'} onChange={Change} />
        Male
      </label>
      <label>
        <input type="radio" name="Gender" value="Male" checked={form.Gender === 'Male'} onChange={Change} />
        Female
      </label>
            <br/><br/>
            <label for="Email">Email</label>
            <input type="text" name="Email" onChange={Change} value={form.Email}></input>
            <br/><br/>
            <label for="Address">Adress</label>
            <input type="text" name="Address" onChange={Change} value={form.Address}></input>
            <br/><br/>
            <label for="MobileNumber">MobileNumber</label>
            <input type="text" name="MobileNumber" onChange={Change} value={form.MobileNumber}></input>
            <br/><br/>
            <button onClick={Reg} >Submit</button>
            <br></br>
            have an account?<a href="/login" >LogIn</a>
            <br></br>
            {response==null?"":response}
        </div>
    )
}