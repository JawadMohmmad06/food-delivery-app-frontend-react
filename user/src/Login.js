import React from "react";
import { Link } from "react-router-dom";
export default function Login()
{
    const[response,setresponse]=React.useState("")
    const[form,setForm]=React.useState({
        Username:"",
        Password:"",
        Role:"User"
    })
    function Change(event)
    {
        const{name,value}=event.target
        setForm(prev=>({...prev,[name]:value}))
    }
    function Lin()
    {
        fetch("https://localhost:44364/api/login",{
            method:'POST',
            headers:{
                'Content-type':'application/json',
                
            },
            body:JSON.stringify(form)
        }).then(res=>res.json()).then(json=>{
            
            console.log(json)
            json==null?setresponse("Wrong info"): localStorage.setItem('Token', json)
            console.log("oo"+json)
            window.location.href = '/restu';
        })
       
       
    }
    return(
        <div>
            <label for="Username">Username</label>
            <input type="text" name="Username" onChange={Change} value={form.Username}></input>
            <br/><br/>
            <label for="Password">Password</label>
            <input type="text" name="Password" onChange={Change} value={form.Password}></input>
            <br/><br/>
            
            <button onClick={Lin} >Submit</button>
            <br/><br/>
            Dont have an account?<a href="/regis" >Register</a>
            Or
            Give<a href="/feedback" >Feedback</a>
            <br/><br/>
            {response}
        </div>
    )
}