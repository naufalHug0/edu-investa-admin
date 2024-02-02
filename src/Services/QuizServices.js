import ApiServices from "./ApiServices";

export default class QuizServices extends ApiServices {
    create ({ title, description, duration, questions }) {
        this.fetchData(this.axiosInstance.post('quiz', { title, description, duration, questions }))
    }

    edit ({  }) {

    }

    delete (id) {
        
    }

    getAll() {
        this.fetchData(this.axiosInstance.get('quiz'))
    }

    getById(id) {

    }

    getQuestionLevels() {
        this.fetchData(this.axiosInstance.get('quiz/levels'))
    }

}