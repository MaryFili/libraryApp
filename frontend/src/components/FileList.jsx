
import './FileList.scss';
import PropTypes from 'prop-types';
import FileItems from './FileItems';



export default function FileList({ refreshKey, setRefreshKey }) {


    return (

        <>
            <h3>Uploaded Files</h3>
            <ul>
                <FileItems refreshKey={refreshKey} setRefreshKey={setRefreshKey} />
            </ul>
        </>
    )
}


FileList.propTypes = {
    refreshKey: PropTypes.number.isRequired,
    setRefreshKey: PropTypes.func.isRequired
};