import React from 'react'
import PropTypes from 'prop-types';
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";



export default function Modal({ modal, setModal, doc }) {

    return (
        <>
            {modal &&
                (
                    <div className='modalBackground'>
                        <div className='modalContainer'>
                            <div className='modalCloseBtn'> <button onClick={() => setModal(false)}>X</button>
                            </div>
                            <DocViewer documents={[{ uri: `https://librarybe.onrender.com/documents/${doc._id}` }]} pluginRenderers={DocViewerRenderers} style={{ width: 500, height: 500 }} />
                        </div>
                    </div>
                )}
        </>
    )
}
Modal.propTypes = {
    modal: PropTypes.bool.isRequired,
    setModal: PropTypes.func.isRequired,
    doc: PropTypes.object.isRequired
};