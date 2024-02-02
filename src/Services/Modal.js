import { setHideModal, setModalMessage, setShowModal } from "../redux/action";
import store from "../redux/store";

class Modal {
    static show (message) {
        this.setMessage(message)
        return store.dispatch(setShowModal())
    }

    static hide () {
        this.setMessage(null)
        return store.dispatch(setHideModal())
    }

    static setMessage (message) {
        return store.dispatch(setModalMessage(message))
    }
}

export {Modal}