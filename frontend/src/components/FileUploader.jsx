import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faUpload } from '@fortawesome/free-solid-svg-icons';
import './FileUploader.scss';
import axios from 'axios';

export default function FileUpload({ docs, setDocs, refreshKey, setRefreshKey }) {
    const [isUploading, setIsUploading] = useState(false);
    const [fileNames, setFileNames] = useState([]);
    const fileChange = function (e) {
        // convert FileList to an array
        const fileList = Array.from(e.target.files);

        // console.log('Selected files:', fileList);
        const allowedFiles = ['pdf', 'txt', 'doc', 'docx', 'xlsx', 'xls', 'jpg', 'jpeg', 'png'];

        let foundInvalidFiles = false;
        fileList.forEach(doc => {
            console.log(doc.name.split('.')[1]);
            console.log(allowedFiles.includes(doc.name.split('.')[1]));
            if (!allowedFiles.includes(doc.name.split('.')[1])) {
                foundInvalidFiles = true;
            }
        })
        if (foundInvalidFiles) {
            alert('Invalid file type. Only pdf, doc, docx, xlsx, xls, jpg, jpeg, png are allowed');
        }

        setDocs(fileList);

        // Update the fileNames state with the names of the selected files
        const names = fileList.map(file => file.name);
        setFileNames(names);

    }

    const submitHandler = async function (e) {
        e.preventDefault();

        try {

            setIsUploading(true);
            const fd = new FormData();



            docs.forEach(doc => {
                fd.append(`files`, doc, doc.name);

            });

            const response = await axios({
                method: 'POST',
                url: 'http://localhost:5000/documents',
                data: fd,
                headers: {
                    'Content-Type': "multipart/form-data"
                }
            });
            setRefreshKey(refreshKey + 1)
            setIsUploading(false);



        } catch (error) {
            console.error(error.response);
            setIsUploading(false);
        }


    }






    return (

        <div className='fileCard'>
            <form onSubmit={submitHandler}>
                <div className='fileInput'>
                    <input type="file" multiple onChange={fileChange} />
                    <button>
                        <i> <FontAwesomeIcon icon={faAdd} /> </i>
                        Browse
                    </button>

                </div>
                <button type="submit" value="Upload" className='upload-btn'>
                    {isUploading ? (
                        <div className="loader">
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                    ) : (
                        <>
                            <i>
                                <FontAwesomeIcon icon={faUpload} />
                            </i>
                            Upload
                        </>
                    )}
                </button>

            </form>
            <p className="main">Supported Files</p>
            <p className="fileInfo">.txt, .doc, .docx, .pdf, .jpg, .png, .xls, .xlsx</p>
            <h2>Selected Files:</h2>
            <p className="fileNames">{fileNames.join(', ')}</p>
        </div>

    )

}


FileUpload.propTypes = {
    docs: PropTypes.array.isRequired,
    setDocs: PropTypes.func.isRequired,
    refreshKey: PropTypes.number.isRequired,
    setRefreshKey: PropTypes.func.isRequired



};
