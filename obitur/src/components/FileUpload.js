
import {useState, useEffect} from 'react';
import { Document, Packer, Paragraph, TextRun, ImageRun } from "docx";
import { create } from 'ipfs-http-client'

import { saveAs } from "file-saver"
import * as fs from "fs";
const client = create('https://ipfs.infura.io:5001/api/v0')

const FileUpload = () => {
    const [filename, setFile] = useState()
    const [name, setName] = useState()
    const [date, setDate] = useState()
    const [description, setDescription] = useState()
    async function onChange(file) {
        try {
          const added = await client.add(file)
          const url = `https://ipfs.io/ipfs/${added.path}`
          setFile(url)
        } catch (error) {
          console.log('Error uploading file: ', error)
        }  
      }
    const generate = (event) => {
        console.log("parent gen hit")
        generateWordDocument(event)
    }
    const generateWordDocument = async (event) => {
        onChange(filename)
        event.preventDefault();
        const doc = new Document({
            sections: [{
                properties: {},
                children: [
                    new Paragraph({
                        children: [
                            new TextRun(name),
                        ],
                    }),
                    new Paragraph({
                        children: [
                            new ImageRun({
                                data: filename,
                                transformation: {
                                    width: [500],
                                    height: [300],
                                },
                            }),
                        ],
                    }),
                    new Paragraph({
                        children: [
                            new TextRun(date),
                        ],
                    }),
                    new Paragraph({
                        children: [
                            new TextRun(description),
                        ],
                    }),
                ],
            }]
        });
        console.log("generate word hit")
        Packer.toBlob(doc).then((blob) =>  {
            // saveAs from FileSaver will download the file
           
            saveAs(blob, "example.docx");
        });
 
        // saveDocumentToFile(doc, "New Document.docx")
    }

    
    const change = (event) => {
    setFile(event.target.files[0])
    console.log(event.target.files[0])
    }
    
    
    return(
     <div> 
         <label> Enter Full Name</label>
         <input type="text" value={name} onChange={(e) => setName(e.target.value)}></input><br/>
         <label> Enter Years of Life</label>
         <input type="text" value={date} onChange={(e) => setDate(e.target.value)}></input><br></br>
         <label>Enter Description</label> <br></br>
         <textarea value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
         <label>Insert Picture</label>
          <input type="file" onChange={change}/><br></br>
          {/* {filename !== undefined ? <div> <h1>File Present</h1> <h2> {filename.name}</h2>  <button> Upload to ipfs</button> </div> : <h1>Upload</h1> } */}
            <button onClick={generate}>Create Obituary</button>
     </div>
 )
}

export default FileUpload
