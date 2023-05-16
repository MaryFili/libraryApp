import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileText } from '@fortawesome/free-solid-svg-icons';
import '../FileItems.scss';


const TextPreview = ({ fileId }) => (
    <>
        <iframe
            src={`https://view.officeapps.live.com/op/embed.aspx?src=http://localhost:5000/documents/${fileId}`}
            width={'350px'}
            height={'500px'}
        ></iframe>
        <FontAwesomeIcon className="fileIcon" icon={faFileText} />
    </>
);

export default TextPreview;


TextPreview.propTypes = {
    fileId: PropTypes.string.isRequired
};