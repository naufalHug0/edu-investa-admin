export default class Question {
    constructor(id, questionNumber) {
        this.id = id

        this.questionNumber = questionNumber

        this.text = 'Pertanyaan'

        this.answer = 'opsi 1'

        this.level_id = 1

        this.options = [
            'opsi 2',
            'opsi 3',
            'opsi 4',
        ]
    }

    setText(value) {
        this.text = value
    }

    setOption(index, newValue) {
        this.options[index] = newValue
    }

    setAnswer(answer) {
        this.answer = answer
    }

    setLevelId(id) {
        this.level_id = id
    }

    getDataForAPI() {
        return {
            text: this.text,
            level_id: this.level_id,
            options: [
                ...this.options.map(option => {
                    return { text: option, isCorrect: false }
                }),
                { text: this.answer, isCorrect: true }
            ]
        }
    }
}