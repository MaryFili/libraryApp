import React, { useState, useEffect } from 'react';
import './FileList.scss';
import PropTypes from 'prop-types';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faFileExcel, faFileImage, faFilePdf, faFileText, faFileWord, faShare } from '@fortawesome/free-solid-svg-icons';
import { saveAs } from 'file-saver';


export default function FileList({ refreshKey, setRefreshKey }) {

    const [uploadedDocs, setUploadedDocs] = useState([]);

    const getAllDocs = async () => {
        try {
            const response = await axios.get('https://librarybe.onrender.com/documents');
            setUploadedDocs(response.data.data);
            console.log(response.data.data)

        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getAllDocs();
    }, [refreshKey])


    const downloadFile = async (id) => {
        try {
            const response = await axios.get(
                `https://librarybe.onrender.com/documents/${id}`,
                { responseType: 'blob' }
            );
            const blob = new Blob([response.data], { type: response.data.type });
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            console.log(response.headers)
            link.download = response.headers['content-disposition'].split('filename=')[1];
            link.click()
            setRefreshKey(refreshKey + 1)

        } catch (err) {
            console.log(err)
        }
    }


    return (

        <>

            <h3>Uploaded Files</h3>
            <ul>
                {uploadedDocs && uploadedDocs.map(doc => (
                    <li className='listItemContainer' key={doc._id}>
                        <div className='fileContainer'>
                            {doc.file.split('.')[1] === 'pdf' ? (
                                <FontAwesomeIcon className='fileIcon' icon={faFilePdf} />
                            ) : doc.file.split('.')[1] === 'doc' || doc.file.split('.')[1] === 'docx' ? (
                                <FontAwesomeIcon className='fileIcon' icon={faFileWord} />
                            ) : doc.file.split('.')[1] === 'txt' ? (
                                <FontAwesomeIcon className='fileIcon' icon={faFileText} />
                            ) : doc.file.split('.')[1] === 'xlsx' || doc.file.split('.')[1] === 'xls' ? (
                                <FontAwesomeIcon className='fileIcon' icon={faFileExcel} />
                            ) : doc.file.split('.')[1] === 'jpg' || doc.file.split('.')[1] === 'jpeg' || doc.file.split('.')[1] === 'png' ? (
                                <FontAwesomeIcon className='fileIcon' icon={faFileImage} />
                            ) : null}

                            <h4> {doc.file.split('/')[1]} </h4>
                        </div>
                        <div className='shareIcons'>
                            <i> <FontAwesomeIcon className='SendIcon' onClick={() => downloadFile(doc._id)} icon={faDownload} /></i>
                            <i> <FontAwesomeIcon className='SendIcon' icon={faShare} /></i>
                        </div>


                        <div className='Info Container'>
                            <p>Uploaded at {new Date(doc.createdAt).toDateString()}</p>
                            <p>Downloads: {doc.downloadCount}</p>


                        </div>


                    </li>
                ))}
            </ul>

        </>
    )
}


FileList.propTypes = {
    docs: PropTypes.array.isRequired,
    setDocs: PropTypes.func.isRequired,
    refreshKey: PropTypes.number.isRequired,
    setRefreshKey: PropTypes.func.isRequired
};