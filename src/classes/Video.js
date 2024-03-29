export default class Video {
    constructor(id) {
        this.id = id

        this.title = ''

        this.description = ''

        this.thumbnail_file = ''
        
        this.video_file = ''

        this.is_premium = true

        this.duration = 0
    }

    setTitle(value) {
        this.title = value
    }

    setDescription(value) {
        this.description = value
    }

    setThumbnailFile(file) {
        this.thumbnail_file = file
    }

    setIsPremium(value) {
        this.is_premium = value
    }

    setVideo(file) {
        this.video_file = file

        const video = document.createElement('video')
        video.src = URL.createObjectURL(file)
        video.preload = 'metadata'

        video.onloadedmetadata = () => {
            this.duration = video.duration
        }
    }

    getDataForAPI() {
        return {
            title: this.title,
            description: this.description,
            duration: this.duration,
            video: this.video_file,
            is_premium: this.is_premium,
            thumbnail: this.thumbnail_file
        }
    }
}