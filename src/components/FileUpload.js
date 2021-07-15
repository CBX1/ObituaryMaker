
import {useState, useEffect} from 'react';
import { create } from 'ipfs-http-client'
import { saveAs } from "file-saver"
import * as fs from "fs";
const client = create('https://ipfs.infura.io:5001/api/v0')

const FileUpload = () => {
   
    const [fileUrl, updateFileUrl] = useState(``)
    const [filename, setFile] = useState()
    const [name, setName] = useState()
    const [date, setDate] = useState()
    const [description, setDescription] = useState()


    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
          const fileReader = new FileReader();
          fileReader.readAsDataURL(file);
    
          fileReader.onload = () => {
            resolve(fileReader.result);
          };
    
          fileReader.onerror = (error) => {
            reject(error);
          };
        });
      };

    async function onChange(file) {
        try {
         const base64Image= await convertBase64(file)
          setFile(base64Image)
        
        } catch (error) {
          console.log('Error uploading file: ', error)
        }  
      }
    const generate = (event) => {
        
        console.log("parent gen hit")
        const myHTML = `<h1> ${name}</h1><img src=${filename}><h2> ${date}</h2><body>
        ${description} 
        </body>`;
        onChangee(myHTML)
        


    }
    async function onChangee(html) {
        try {
          const added = await client.add(html)
          const url = `https://ipfs.io/ipfs/${added.path}`
          updateFileUrl(url)
        } catch (error) {
          console.log('Error uploading file: ', error)
        }  
      }

    
    const change = (event) => {
        onChange(event.target.files[0])
   

    }
    
    
    return(
     <div> 
         <label> Enter Full Name</label>
         <input type="text" value={name} onChange={(e) => setName(e.target.value)}></input><br/>
         <label> Enter Years of Life</label>
         <input type="text" value={date} onChange={(e) => setDate(e.target.value)}></input><br></br>
         <label>Enter Description</label> <br></br>
         <textarea value={description} onChange={(e) => setDescription(e.target.value)}></textarea> <br></br>
         <label>Insert Picture</label>
          <input type="file" onChange={change}/><br></br>
          {/* {filename !== undefined ? <div> <h1>File Present</h1> <h2> {filename.name}</h2>  <button> Upload to ipfs</button> </div> : <h1>Upload</h1> } */}
            <button onClick={generate}>Create Obituary</button>
            {
        fileUrl && (
        <div> Your file Url is {fileUrl}</div>
        )
      }
     </div>
 )
}

export default FileUpload
