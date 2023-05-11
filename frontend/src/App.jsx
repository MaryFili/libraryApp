import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import './App.scss'
import FileUploader from './components/FileUploader';


// import React from 'react'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUpload } from '@fortawesome/free-solid-svg-icons';
// // import './FileUploader.scss';
// import axios from 'axios';
function App() {

  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);



  // const fileChange = function (e) {
  //   setDocs(e.target.files[0]);
  //   console.log(docs);
  // }


  // const submitHandler = async function (e) {
  //   e.preventDefault();

  //   try {
  //     const fd = new FormData();
  //     fd.append('name', docs.name);
  //     fd.append('files', docs)


  //     const response = await axios({
  //       method: 'POST',
  //       url: 'http://localhost:5000/documents',
  //       data: fd,
  //       headers: {
  //         'Content-Type': "multipart/form-data"
  //       }
  //     });

  //     console.log(response);


  //   } catch (error) {
  //     console.error(error.response);
  //   }


  // }



  const removeDoc = (docname) => {

    setDocs(docs.filter(doc => doc.name !== docname))
  }


  return (
    <div className='mainContainer'>
      <h2 className='title'>Upload File</h2>
      <FileUploader docs={docs} setDocs={setDocs} loading={loading} removeDoc={removeDoc} f />

      {/* <div className='fileCard'>
        <form onSubmit={submitHandler}>
          <div className='fileInput'>
            <input type="file" multiple ref={fileInputRef} onChange={fileChange} />
            <button>
              <i>
                <FontAwesomeIcon icon={faUpload} />

              </i>
              Browse
            </button>
          </div>
          <input type="submit" value="Upload" className='register-btn' />

        </form>
        <p className="main">Supported Files</p>
        <p className="fileInfo">.txt, .doc, .docx, .pdf, .jpg, .png, .xls, .xlsx</p>
      </div> */}

    </div>
  )
}

export default App
