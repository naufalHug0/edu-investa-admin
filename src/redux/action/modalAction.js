export const setShowModal = () => {
    return { type: 'SHOW_MODAL' }
}

export const setHideModal = () => {
    return { type: 'HIDE_MODAL' }
}

export const setModalMessage = (value) => {
    return { type: 'SET_MODAL_MESSAGE', value }
}