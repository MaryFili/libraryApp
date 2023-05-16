import React from 'react';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileImage } from '@fortawesome/free-solid-svg-icons';
import '../FileItems.scss';


const ImagePreview = ({ fileId }) => (
    <>
        <img
            className="fileIcon"
            src={`http://localhost:5000/documents/${fileId}`}
            alt="Preview"
            style={{ maxHeight: '350px', maxWidth: '350px' }}
        />
        <FontAwesomeIcon className="fileIcon" icon={faFileImage} />
    </>
);

export default ImagePreview;


ImagePreview.propTypes = {
    fileId: PropTypes.string.isRequired
};