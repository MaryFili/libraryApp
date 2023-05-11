import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileExcel, faFileImage, faFilePdf, faFileText, faFileWord } from '@fortawesome/free-solid-svg-icons';


export default function FileList({ refreshKey, setRefreshKey }) {

    const [uploadedDocs, setUploadedDocs] = useState([]);

    const getAllDocs = async () => {
        try {
            const response = await axios.get('http://localhost:5000/documents');
            setUploadedDocs(response.data.data);
            console.log(response.data.data)

        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getAllDocs();
    }, [refreshKey])


    return (
        <ul>
            {uploadedDocs && uploadedDocs.map(doc => (
                <li key={doc._id}>
                    {doc.file.split('.')[1] === 'pdf' ? (
                        <FontAwesomeIcon icon={faFilePdf} />
                    ) : doc.file.split('.')[1] === 'doc' || doc.file.split('.')[1] === 'docx' ? (
                        <FontAwesomeIcon icon={faFileWord} />
                    ) : doc.file.split('.')[1] === 'txt' ? (
                        <FontAwesomeIcon icon={faFileText} />
                    ) : doc.file.split('.')[1] === 'xlsx' || doc.file.split('.')[1] === 'xls' ? (
                        <FontAwesomeIcon icon={faFileExcel} />
                    ) : doc.file.split('.')[1] === 'jpg' || doc.file.split('.')[1] === 'jpeg' || doc.file.split('.')[1] === 'png' ? (
                        <FontAwesomeIcon icon={faFileImage} />
                    ) : null}
                    {doc.file.split('/')[1]}
                </li>
            ))}
        </ul>
    )
}


FileList.propTypes = {
    docs: PropTypes.array.isRequired,
    setDocs: PropTypes.func.isRequired,
    refreshKey: PropTypes.number.isRequired,
    setRefreshKey: PropTypes.func.isRequired
};