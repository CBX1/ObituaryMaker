
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
    const [filenameReal, setfileNameReal] = useState()

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
      setfileNameReal(event.target.files[0].name)
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

    const generatee = (event) => {   
      event.preventDefault();
         
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
       <form>
         <label> Enter Full Name</label>
         <input type="text" value={name} onChange={(e) => setName(e.target.value)}></input><br/>
         <label> Enter Years of Life</label>
         <input type="text" value={date} onChange={(e) => setDate(e.target.value)}></input>
         <label>Enter Description</label> 
         <textarea value={description} onChange={(e) => setDescription(e.target.value)}></textarea> <br></br>
         <label for="file-upload" class="button"> Insert Picture</label>
          <input id="file-upload" type="file"  accept="image/png, image/jpeg" onChange={change}/><br/>
          {filename !== undefined ? <div> Image Preview<br/> <img style={imgStyle} src={filename}/> <br></br> {filenameReal} <div>Please note images in obituary will be to full scale</div> </div>: <span></span>}
            <button onClick={generatee}>Create Obituary</button>
      </form>
            {
        fileUrl && (
        <div> Your Url is <a href={fileUrl}>{fileUrl} </a> Please save it to ensure it is not lost</div>
        )

      }
     </div>
 )
}

export default FileUpload
