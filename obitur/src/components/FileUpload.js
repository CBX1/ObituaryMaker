
import {useState, useEffect} from 'react';
import { Document, Packer, Paragraph, TextRun, ImageRun } from "docx";
import { create } from 'ipfs-http-client'

import { saveAs } from "file-saver"
import * as fs from "fs";
const client = create('https://ipfs.infura.io:5001/api/v0')

const FileUpload = () => {
    const [filename, setFile] = useState()
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
                            new ImageRun({
                                data: filename,
                                transformation: {
                                    width: [500],
                                    height: [600],
                                },
                            }),
                        ],
                    }),
                    new Paragraph({
                        children: [
                            new TextRun("1978-1989"),
                        ],
                    }),
                    new Paragraph({
                        children: [
                            new TextRun("Here lies Joseph OlienStein, a good man"),
                        ],
                    }),
                ],
            }]
        });
        console.log("generate word hit")
      const blob =  Packer.toBlob(doc).then((blob) =>  {
            // saveAs from FileSaver will download the file
           
            saveAs(blob, "example.docx");
        });
    
        const added = await client.add(blob)
        const url = `https://ipfs.io/ipfs/${added.path}`
 
        // saveDocumentToFile(doc, "New Document.docx")
    }

    
    const change = (event) => {
    setFile(event.target.files[0])
    console.log(event.target.files[0])
    }
    
    
    return(
     <div> 
          <input type="file" onChange={change}/>
          {filename !== undefined ? <div> <h1>File Present</h1> <h2> {filename.name}</h2>  <button> Upload to ipfs</button> </div> : <h1>Upload</h1> }
            <button onClick={generate}>Butttton</button>
     </div>
 )
}

export default FileUpload
