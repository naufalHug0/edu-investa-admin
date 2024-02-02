import ApiServices from "./ApiServices";

export default class ShortsServices extends ApiServices {
    create (formData) {
        this.fetchData(this.axiosInstance.post('shorts', formData))
    }

    edit ({ title, thumbnail, video }) {

    }

    delete (id) {
        
    }

    getAll() {
        this.fetchData(this.axiosInstance.get('shorts'))
    }

    getById(id) {

    }


}