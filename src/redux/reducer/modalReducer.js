const initialState = {
    showModal: false,
    message: {
        title: null,
        body: null,
        options: null
    }
}

const modalReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SHOW_MODAL':
            return {
                ...state,
                showModal: true,
            }
        case 'HIDE_MODAL':
            return {
                ...state,
                showModal: false,
            }
        case 'SET_MODAL_MESSAGE':
            return {
                ...state,
                message: action.value,
            }
        default:
            return state;
    }
}

export default modalReducer;