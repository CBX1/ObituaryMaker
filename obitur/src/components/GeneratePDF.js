import React from 'react'
import FileUpload from './FileUpload'
import { Document, Packer, Paragraph, TextRun, ImageRun } from "docx";
import { saveAs } from "file-saver"
import { useState } from 'react'


const GeneratePDF = () => {
    const [baseImage, setBaseImage] = useState("");
    const uploadImage = async (event) => {
        const file = (event.target.files[0])
        const base64 = await convertBase64(file)
        setBaseImage(base64)
        }

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

    const generate = (event) => {
        console.log("parent gen hit")
        generateWordDocument(event)
    }
    
    const generateWordDocument = async (event) => {
        event.preventDefault();
        const doc = new Document({
            sections: [{
                properties: {},
                children: [
                    new Paragraph({
                        children: [
                            new TextRun("Hello World"),
                            new TextRun({
                                text: "Foo Bar",
                                bold: true,
                            }),
                            new TextRun({
                                text: "\tGithub is the best",
                                bold: true,
                            }),
                        ],
                    }),
                    new Paragraph({
                        children: [
                            new ImageRun({
                                data: [baseImage],
                                transformation: {
                                    width: [500],
                                    height: [600],
                                },
                            }),
                        ],
                    }),
        
                ],
            }]
        });
        console.log("generate word hit")
        Packer.toBlob(doc).then((blob) => {
            // saveAs from FileSaver will download the file
            saveAs(blob, "example.docx");
        });

        // saveDocumentToFile(doc, "New Document.docx")
    }


    return (
        <div>
            <FileUpload/>
            <textarea></textarea>
            <button>Preview</button>
            <button onClick={generate}>Submit</button>
            <button onClick={uploadImage}>dddEd</button>

        </div>
    )
}

export default GeneratePDF
