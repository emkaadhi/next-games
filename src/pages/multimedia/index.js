import AudioComponent from '../../components/multimedia-components/AudioPage'
import ImageComponent from '../../components/multimedia-components/ImageComponent'

const Gallery = () => {
    return (
        <div>
            <div className="container">
                <div className="container">
                    <h5 className='text-primary text-uppercase mb-3' style={{ borderLeft: '6px solid' }}>&nbsp;<span className='text-white'>Audio</span></h5>
                </div>
                <div className="row">
                    <AudioComponent/>
                </div>
                <div className="container">
                    <h5 className='text-primary text-uppercase mb-3 mt-5' style={{ borderLeft: '6px solid' }}>&nbsp;<span className='text-white'>Image</span></h5>
                </div>
                <div className="row">
                    <ImageComponent/>
                </div>
            </div>
        </div>
    )
}

export default Gallery