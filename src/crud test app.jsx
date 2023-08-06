import axios from 'axios'
import React, {useState} from 'react'
import { useEffect } from 'react'

export default function Sms() {
    const [currentstudents, setcurrentstudents] = useState()
    let newname = ""
    let newclass = ""
   

    useEffect(() => {
      axios.get(  "http://127.0.0.1:5003/posts")
      .then(res => (setcurrentstudents (res.data)))
      .catch(err => console.log(err))


    }, [ ])

    function newrow(element){
        // console.log("newrow called");
        

        let serialedit = element.serial + 100
        let serialnormal = element.serial + 10
        


        return(
          
        <tr span = "row" className = {element.serial} key = {element.serial}>
            <th className = {element.serial}>{element.serial}</th>
            <td> 
            <p className = {serialnormal}>{element.name} </p>
            </td>
            <td> 
            <p className = {serialnormal}>{element.class} </p>
            </td>
            <td className = {serialnormal}><button className='btn btn-danger btn-sm' >Edit</button></td>
            <td className= {serialedit} style = {{display : "none" }}><button className='btn btn-info btn-sm' >Save</button></td>          
            <td className = {serialnormal}><button className='btn btn-success btn-sm' >delete</button></td>
        </tr>)
}
function enternewname(){
            document.getElementById("newpostform" ).style.display = ""
            document.getElementById("newpostbutton" ).style.display = "none"
            document.getElementById("studenttable" ).style.display = "none"
}
function setnewname(e){
   newname = e.target.value
    console.log(newname)
}
function setnewclass(e){
 newclass = e.target.value
console.log(newclass)
}
function addrecorddone(e){
    e.preventDefault()
    newname = document.getElementById("newname").value
    newclass = document.getElementById("newclass").value
    let newrecord = {
           
        "serial": "",
        "name": newname,
        "class": newclass
    }
    console.log(newrecord)
    axios.post(`http://localhost:5003/posts`, newrecord)
            .then((res) => alert("New student added"))
            .catch(err => console.log(err))
            // window.location.reload()
}

    
  return (
    <>
    <h1 className='bg-dark' style={{color : "red", textAlign: "center"}}>Student Management System</h1>
    
     <form id = "newpostform" style={{display : "none"}}>
        

        <br />
        <h2> Name</h2>
        <br />
        <input type="text" id ="newname"  style={{width : "60vw"}} onChange={(e) => (setnewname(e))}/>
        <br />
        <br />
        <h2> Class</h2>
        <br />
        <input type="text" id ='newclass' style={{width : "60vw"}} onChange={(e) => (setnewclass(e))}/>
        <br />
        <br />
        <button className='btn btn-info'style={{fontSize : "20px"}} onClick={(e) => addrecorddone(e)}>Create</button>
      </form>
      


        
        <button className='btn btn-primary' id = "newpostbutton"style={{fontSize : "20px"}} onClick={enternewname}>Add new Student</button>
                <table  id = "studenttable" className="table">
                <thead>
                  <tr>
                    <th scope="col">Sr. no.</th>
                    <th scope="col">Name</th>
                    <th scope="col">Class</th>
                    <th scope="col" colSpan={2} style={{textAlign : "center"}}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                {
                          currentstudents &&
                          currentstudents.map((element) => (
              
                              // console.log(element.name),
                              newrow(element)
                          
                          ))
              
                      }
                </tbody>
              </table>
              </>
    )}

       

  

