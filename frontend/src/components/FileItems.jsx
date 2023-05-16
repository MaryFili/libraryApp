
import React, { useState, useEffect } from 'react';
import './FileItems.scss';
import PropTypes from 'prop-types';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';

import PdfPreview from './Previews/PdfPreview';
import WordPreview from './Previews/WordPreview';
import ExcelPreview from './Previews/ExcelPreview';
import TextPreview from './Previews/TextPreview';
import ImagePreview from './Previews/ImagePreview';
import FileLink from './FileLink';
import FileDownload from './FileDownload';



export default function FileItems({ refreshKey, setRefreshKey }) {

    const [uploadedDocs, setUploadedDocs] = useState([]);
    // const [fileLink, setFileLink] = useState('');

    const getAllDocs = async () => {
        try {
            const response = await axios.get('http://localhost:5000/documents');
            // const response = await axios.get('https://librarybe.onrender.com/documents');
            setUploadedDocs(response.data.data);
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getAllDocs();
    }, [refreshKey])


    return (
        <>
            {uploadedDocs && uploadedDocs.map(doc => (
                <li className='listItemContainer' key={doc._id}>
                    <div className='fileContainer'>
                        {doc.file.split('.')[1] === 'pdf' ? (

                            <div className='previewContainer'>
                                <PdfPreview fileId={doc._id} />
                            </div>

                        ) : doc.file.split('.')[1] === 'doc' || doc.file.split('.')[1] === 'docx' ? (
                            <div className='previewContainer'>
                                <WordPreview fileId={doc._id} />
                            </div>

                        ) : doc.file.split('.')[1] === 'txt' ? (
                            <div className='previewContainer'>
                                <TextPreview fileId={doc._id} />
                            </div>


                        ) : doc.file.split('.')[1] === 'xlsx' || doc.file.split('.')[1] === 'xls' ? (
                            <div className='previewContainer'>
                                <ExcelPreview fileId={doc._id} />
                            </div>

                        ) : doc.file.split('.')[1] === 'jpg' || doc.file.split('.')[1] === 'jpeg' || doc.file.split('.')[1] === 'png' ? (
                            <div className='previewContainer'>
                                <ImagePreview fileId={doc._id} />
                            </div>

                        ) : null}
                        <h4> {doc.file.split('/')[1]} </h4>
                    </div>

                    <div className='shareIcons'>
                        <FileDownload fileId={doc._id} fileDownloadCount={doc.downloadCount} setRefreshKey={setRefreshKey} refreshKey={refreshKey} />
                        <FileLink fileId={doc._id} />
                    </div>

                    <div className='Info Container'>
                        <p>  Uploaded on {new Date(doc.createdAt).toDateString()} - {" "}
                            {new Date(doc.createdAt).toLocaleTimeString()}</p>
                        <p>Downloads: {doc.downloadCount}</p>
                    </div>
                </li>
            ))}</>
    )
}



FileItems.propTypes = {

    refreshKey: PropTypes.number.isRequired,
    setRefreshKey: PropTypes.func.isRequired
};