import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';


export default function FileDownload({ fileId, fileDownloadCount, setRefreshKey, refreshKey }) {

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

    return (
        <>
            <i> <FontAwesomeIcon className='sendIcon' onClick={() => downloadFile(fileId, fileDownloadCount)} icon={faDownload} /></i>
        </>
    )
}

FileDownload.propTypes = {
    fileId: PropTypes.string.isRequired,
    fileDownloadCount: PropTypes.number.isRequired,
    refreshKey: PropTypes.number.isRequired,
    setRefreshKey: PropTypes.func.isRequired
};