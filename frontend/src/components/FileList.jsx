import React, { useState, useEffect } from 'react';
import './FileList.scss';
import PropTypes from 'prop-types';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faFileExcel, faFileImage, faFilePdf, faFileText, faFileWord, faShare } from '@fortawesome/free-solid-svg-icons';
import { Document, Page, pdfjs } from 'react-pdf';




pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default function FileList({ refreshKey, setRefreshKey }) {

    const [uploadedDocs, setUploadedDocs] = useState([]);
    const [fileLink, setFileLink] = useState('');




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


    const downloadFile = async (id, downloadCount) => {
        try {
            // const response = await axios.get(
            //     `https://librarybe.onrender.com/documents/${id}`,
            //     { responseType: 'blob' }
            // );

            const response = await axios.get(
                `http://localhost:5000/documents/${id}`,
                { responseType: 'blob' }
            );
            const blob = new Blob([response.data], { type: response.data.type });
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);

            let filename = response.headers['content-disposition'].split('filename=')[1];
            //removes any quotes around the filename and any whitespace or slashes
            filename = filename.replace(/^"+|"+$/g, '').replace(/[\s/\\]/g, '');
            //decodes any URL-encoded characters in the filename
            link.download = decodeURIComponent(filename);
            link.click()


            await axios.patch(`http://localhost:5000/documents/${id}`, { downloadCount: downloadCount + 1 });
            setRefreshKey(refreshKey + 1);




        } catch (err) {
            console.log(err)
        }
    }


    const getFileLink = (id, expiresInMinutes) => {
        const url = `http://localhost:5000/documents/${id}`;
        // const url = `https://librarybe.onrender.com/documents/${id}`;


        //the link will be visible only for the specified amount of minutes
        setFileLink(url);

        const linkExpirationTimer = setTimeout(() => {
            setFileLink('');
        }, expiresInMinutes * 60 * 1000);

        return linkExpirationTimer;
    };



    return (

        <>

            <h3>Uploaded Files</h3>
            <ul>
                {uploadedDocs && uploadedDocs.map(doc => (
                    <li className='listItemContainer' key={doc._id}>
                        <div className='fileContainer'>
                            {doc.file.split('.')[1] === 'pdf' ? (
                                <div className='previewContainer'>

                                    <Document file={`http://localhost:5000/documents/${doc._id}`}>
                                        <Page
                                            key={`page_${1}`}
                                            pageNumber={1}
                                            width={375}
                                            loading="Loading Page..."
                                            renderAnnotationLayer={false}
                                            renderTextLayer={false}
                                            externalLinkTarget="_blank"
                                        />
                                    </Document>
                                    <FontAwesomeIcon className='fileIcon' icon={faFilePdf} />



                                </div>


                            ) : doc.file.split('.')[1] === 'doc' || doc.file.split('.')[1] === 'docx' ? (
                                <div className='previewContainer'>
                                    <iframe src={`https://view.officeapps.live.com/op/embed.aspx?src=http://localhost:5000/documents/${doc._id}`} width={'350px'} height={'500px'} ></iframe>
                                    <FontAwesomeIcon className='fileIcon' icon={faFileWord} />
                                </div>

                            ) : doc.file.split('.')[1] === 'txt' ? (
                                <div className='previewContainer'>
                                    <iframe src={`https://view.officeapps.live.com/op/embed.aspx?src=http://localhost:5000/documents/${doc._id}`} width={'350px'} height={'500px'} ></iframe>
                                    <FontAwesomeIcon className='fileIcon' icon={faFileText} />
                                </div>


                            ) : doc.file.split('.')[1] === 'xlsx' || doc.file.split('.')[1] === 'xls' ? (
                                <div className='previewContainer'>
                                    <iframe src={`https://view.officeapps.live.com/op/embed.aspx?src=http://localhost:5000/documents/${doc._id}`} width={'350px'} height={'500px'} ></iframe>
                                    <FontAwesomeIcon className='fileIcon' icon={faFileExcel} />


                                </div>

                            ) : doc.file.split('.')[1] === 'jpg' || doc.file.split('.')[1] === 'jpeg' || doc.file.split('.')[1] === 'png' ? (
                                <div className='previewContainer'>
                                    <img
                                        className='fileIcon'
                                        src={`http://localhost:5000/documents/${doc._id}`}
                                        alt='Preview'
                                        style={{ maxHeight: '350px', maxWidth: '350px' }}
                                    />
                                    <FontAwesomeIcon className='fileIcon' icon={faFileImage} />

                                </div>
                            ) : null}
                            <h4> {doc.file.split('/')[1]} </h4>
                        </div>

                        <div className='shareIcons'>
                            <i> <FontAwesomeIcon className='sendIcon' onClick={() => downloadFile(doc._id, doc.downloadCount)} icon={faDownload} /></i>
                            <i> <FontAwesomeIcon className='sendIcon' onClick={() => getFileLink(doc._id, 1)} icon={faShare} /></i>
                        </div>

                        <div className='Info Container'>
                            <p>Uploaded at {new Date(doc.createdAt).toDateString()}</p>
                            <p>Downloads: {doc.downloadCount}</p>
                            {fileLink && <p>Your file is available at the following address: <a href={fileLink}>{fileLink}</a></p>}
                        </div>
                    </li>
                ))}
            </ul >

        </>
    )
}


FileList.propTypes = {
    docs: PropTypes.array.isRequired,
    setDocs: PropTypes.func.isRequired,
    refreshKey: PropTypes.number.isRequired,
    setRefreshKey: PropTypes.func.isRequired
};