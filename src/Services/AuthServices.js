import ApiServices from "./ApiServices";

export default class AuthServices extends ApiServices {
    login ({ username, password }) {
        this.fetchData(this.axiosInstance.post('auth/admin/login',{
            username, 
            password
        }))
    }

    register ({
        name,
        username,
        email,
        password
    }) {
        this.fetchData(this.axiosInstance.post('auth/admin/register',{
            name,
            username,
            email,
            password
        }))
    }

    me () {
        this.handleForbiddenError = () => {
            this.removeBearerToken()
        }
        
        this.fetchData(this.axiosInstance.get('auth/me'))
    }

    isAuthenticated() {
        if (sessionStorage.getItem('token') == null) {
            return false
        }

        this.handleServerError = () => {
            this.removeBearerToken()
        }

        this.fetchData(this.axiosInstance.get('auth/admin/me'))

        return !this.isError
    }

    storeToken(token) {
        sessionStorage.setItem('token', token)
    }

    logout() {
        this.fetchData(this.axiosInstance.get('auth/admin/logout'))

        this.removeBearerToken()
    }
}