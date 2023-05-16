import React from 'react';
import PropTypes from 'prop-types';

import { Document, Page, pdfjs } from 'react-pdf';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';
import '../FileItems.scss';


pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PdfPreview = ({ fileId }) => (
    <>
        <Document file={`http://localhost:5000/documents/${fileId}`}>
            <Page
                key={`page_${1}`}
                pageNumber={1}
                width={350}
                loading="Loading Page..."
                renderAnnotationLayer={false}
                renderTextLayer={false}
                externalLinkTarget="_blank"
            />
        </Document>
        <FontAwesomeIcon className="fileIcon" icon={faFilePdf} />
    </>
);

export default PdfPreview;


PdfPreview.propTypes = {
    fileId: PropTypes.string.isRequired
};