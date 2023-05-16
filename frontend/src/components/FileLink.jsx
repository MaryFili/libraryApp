import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { faShare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export default function FileLink({ fileId }) {
    const [fileLink, setFileLink] = useState('');
    const getFileLink = (id, expiresInMinutes) => {

        const url = `http://localhost:5000/documents/${id}`;

        // const url = `https://librarybe.onrender.com/documents/${id}`;


        setFileLink(url);

        //the link will be visible only for the specified amount of minutes
        const linkExpirationTimer = setTimeout(() => {
            setFileLink('');
        }, expiresInMinutes * 60 * 1000);

        return linkExpirationTimer;
    };

    const handleClick = async () => {
        const linkExpirationTimer = await getFileLink(fileId, 1);
        clearTimeout(linkExpirationTimer);
    };


    return (
        <>
            <i> <FontAwesomeIcon className='sendIcon' onClick={handleClick} icon={faShare} /></i>
            {fileLink && <p>Your file is available at the following address: <a href={fileLink} onClick={(e) => e.stopPropagation}> {fileLink}</a></p>}
        </>
    )
}

FileLink.propTypes = {
    fileId: PropTypes.string.isRequired
};