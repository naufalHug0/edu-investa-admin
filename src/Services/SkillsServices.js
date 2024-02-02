import ApiServices from "./ApiServices";

export default class SkillsServices extends ApiServices {
    create (formData) {
        this.fetchData(this.axiosInstance.post('skills', formData))
    }

    edit ({ title, thumbnail, video }) {

    }

    delete (id) {
        
    }

    getAll() {
        this.fetchData(this.axiosInstance.get('skills'))
    }

    getById(id) {

    }


}