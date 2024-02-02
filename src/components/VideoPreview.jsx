import React from 'react'

const VideoPreview = ({
    src,
    show
}) => {
    return (
        <div className='bg-[rgba(0,0,0,.5)] fixed top-0 right-0 left-0 bottom-0 z-[9999] flex justify-center items-center' onClick={() => show(false)}>
            <video src={src} className='w-[200px] sm:w-[350px]' controls></video>
        </div>
    )
}

export default VideoPreview