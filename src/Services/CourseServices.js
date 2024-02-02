import ApiServices from "./ApiServices";

export default class CourseServices extends ApiServices {
    create (formData) {
        this.fetchData(this.axiosInstance.post('course', formData))
    }

    edit () {

    }

    delete (id) {
        
    }

    getAll() {
        this.fetchData(this.axiosInstance.get('course'))
    }

    getById(id) {

    }


}