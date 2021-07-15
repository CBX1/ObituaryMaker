
import {useState, useEffect} from 'react';
import { create } from 'ipfs-http-client'
import { saveAs } from "file-saver"
import {head, head1, body, body1, rest} from './constants'
const client = create('https://ipfs.infura.io:5001/api/v0')

const FileUpload = () => {
   
    const [fileUrl, updateFileUrl] = useState(``)
    const [filename, setFile] = useState()
    const [name, setName] = useState()
    const [date, setDate] = useState()
    const [description, setDescription] = useState()

    const imgStyle = {
        height: '30%',
        width: '30%',
      };
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

        
    const change = (event) => {
        setFile(event.target.files[0])
        onChange(event.target.files[0])


    }

    async function onChange(file) {
        try {
         const base64Image= await convertBase64(file)
        await  setFile(base64Image)
          console.log(filename)
        
        } catch (error) {
          console.log('Error uploading file: ', error)
        }  
      }

    const generate = (event) => {      
        console.log("parent gen hit")
        console.log(head)
        const myHTML =  head + `${name}` + head1 + `${filename}` + body + `${date}` + body1 + `${description}` + rest
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
          {filename !== undefined ? <div> Image Preview <br/> <img style={imgStyle} src={filename}/>  </div>: <span></span>}
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
