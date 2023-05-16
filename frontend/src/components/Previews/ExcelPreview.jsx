import React from 'react';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileExcel } from '@fortawesome/free-solid-svg-icons';
import '../FileItems.scss';


const ExcelPreview = ({ fileId }) => (
    <>
        <iframe
            src={`https://view.officeapps.live.com/op/embed.aspx?src=http://localhost:5000/documents/${fileId}`}
            width={'350px'}
            height={'500px'}
        ></iframe>
        <FontAwesomeIcon className="fileIcon" icon={faFileExcel} />
    </>
);

export default ExcelPreview;


ExcelPreview.propTypes = {
    fileId: PropTypes.string.isRequired
};