import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';

export default  function Feedback(){
  const form = useRef();
    const[response,setresponse]=React.useState()
    const[from,setform]=React.useState({
      Name:"",
      Email:"",
      Body:""
    })
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_y4h3jb8', 'template_0mkr4jh', form.current, 'nStLbsMKnxfALELDr')
      .then((result) => {
          console.log(console.log(result.text));
      }, (error) => {
          console.log(console.log(error.text));
      });
  };
function change(event){
  
        const{name,value}=event.target
        setform(prev=>({...prev,[name]:value}))
    
}
function Lin()
{
    fetch("https://localhost:44364/api/feedback/create",{
        method:'POST',
        headers:{
            'Content-type':'application/json',
            
        },
        body:JSON.stringify(from)
    }).then(res=>res.json()).then(json=>{
        
        console.log(json)
        setresponse(json)
        
       
    })
   
   
}
  return (
    <div>
    <form ref={form} onSubmit={sendEmail}>
      <label>Name</label>
      <input type="text" name="Name" onChange={change} value={from.Name}/>
      <br/> <br/>
      <label>Email</label>
      <input type="email" name="Email" onChange={change} value={from.Email}/>
      <br/> <br/>
      <label>Message</label>
      <textarea name="Body"  onChange={change} value={from.Body}/>
      <br/> <br/>
      <input type="submit" value="Send" onClick={Lin}/>
    </form>
    <br/> <br/>
    <a href="/login" >Login</a>
    <br/> <br/>
    {response==true?"Done":response==null?"":"Error"}
    </div>

  );
};