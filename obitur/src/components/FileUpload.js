
import {useState, useEffect} from 'react';


const FileUpload = () => {

    const [filename, setFile] = useState()
    
    const change = (event) => {
    setFile(event.target.files[0])
    console.log(event.target.files[0])
    }
    
    return(
     <div> 
          <input type="file" onChange={change}/>
          {filename !== undefined ? <div> <h1>File Present</h1> <h2> {filename.name}</h2>  <button> Upload to ipfs</button> </div> : <h1>Upload</h1> }
   
     </div>
 )
}

export default FileUpload
