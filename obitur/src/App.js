import {BrowserRouter as Router, Route} from 'react-router-dom'
import { useState } from 'react'
import { create } from 'ipfs-http-client'
import FileUpload from './components/FileUpload'
import { useHistory } from "react-router-dom";

const client = create('https://ipfs.infura.io:5001/api/v0')

function App() {
  const myHTML = `<h1>John Doe</h1>`;
  const history = useHistory();
const generateObituary= () => {
  history.push("/generate");
}
  const [fileUrl, updateFileUrl] = useState(``)
  async function onChange(e) {
    const file = e.target.files[0]
    console.log(file)
    try {
      const added = await client.add(myHTML)
      const url = `https://ipfs.io/ipfs/${added.path}`
      updateFileUrl(url)
    } catch (error) {
      console.log('Error uploading file: ', error)
    }  
  }


  return (

  <div>

    <Route path="/" exact render={(props) =>
  (
    <>
    <FileUpload></FileUpload>
    </>
  )  
  }></Route>



  </div>

    // <div className="App">
    //   <h1>IPFS Example</h1>


    // </div>
  );
}

export default App;
