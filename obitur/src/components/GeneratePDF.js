import React from 'react'
import FileUpload from './FileUpload'
import { Document, Packer } from "docx"
import { saveAs } from "file-saver"
const GeneratePDF = () => {
    const generate = (event) => {
        console.log("parent gen hit")
        generateWordDocument(event)
    }
    function generateWordDocument(event){
        event.preventDefault();
        var doc = new DocumentCreator()
        console.log("generate word hit")
        // saveDocumentToFile(doc, "New Document.docx")
    }


    return (
        <div>
            <FileUpload/>
            <textarea></textarea>
            <button>Preview</button>
            <button onClick={generate}>Submit</button>
        </div>
    )
}

export default GeneratePDF
