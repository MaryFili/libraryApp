import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import './App.scss'
import FileUploader from './components/FileUploader';
import FileList from './components/FileList';


function App() {

  const [docs, setDocs] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);






  const removeDoc = (docname) => {

    setDocs(docs.filter(doc => doc.name !== docname))
  }


  return (
    <div className='mainContainer'>
      <h2 className='title'>Upload File</h2>
      <FileUploader docs={docs} setDocs={setDocs} removeDoc={removeDoc} uploadedFiles={uploadedFiles} setUploadedFiles={setUploadedFiles} refreshKey={refreshKey} setRefreshKey={setRefreshKey} />
      <FileList docs={docs} setDocs={setDocs} removeDoc={removeDoc} refreshKey={refreshKey} setRefreshKey={setRefreshKey} />


    </div>
  )
}

export default App
