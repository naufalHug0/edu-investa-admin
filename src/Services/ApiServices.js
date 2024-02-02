import axios from "axios";

export default class ApiServices {
    constructor() {
        this.storageUrl = import.meta.env.VITE_BASE_STORAGE_API_URL
        
        this.axiosInstance = axios.create({
            baseURL: import.meta.env.VITE_BASE_API_URL,
            headers: {
                'Content': 'application/json',
            }
        });

        this.axiosInstance.interceptors.request.use((config) => {
            if (sessionStorage.getItem('token')) {
                config.headers.Authorization = `Bearer ${sessionStorage.getItem('token')}`;
            }
            return config;
        });

        this.isError = false

        this.errors = {}

        this.responseBody = {}

        this.axiosInstance.interceptors.response.use(
            (response) => response,
            (error) => {
                this.isError = true

                if (error.response) {
                    if (error.response.data.errors) {
                        this.errors = error.response.data.errors
                    } else {
                        this.errors = {message: error.response.data.message}
                    }
                
                    switch (error.response.status) {
                        case 400:
                            this.handleBadRequestError()
                            break;
                        case 401:
                            this.handleUnauthorizedError()
                            break;
                        case 403:
                            this.handleForbiddenError()
                            break;
                        case 404:
                            this.handleNotFoundError()
                            break;
                        case 500:
                            this.handleServerError()
                            break;
                    }
                }

                return Promise.reject(error);
            }
        );
    }

    async fetchData (service) {
        try {
            const response = await service
            this.responseBody = response.data
            this.handleSuccess()

        } catch (error) {
            this.isError = true
            this.handleServerError()
            console.error('API Error:', error.message);
        }
    }

    removeBearerToken = () => {
        sessionStorage.removeItem('token')
        location.href = '/auth'
    }

    handleSuccess = () => {}

    handleNotFoundError = () => {}

    handleBadRequestError = () => {}

    handleForbiddenError = () => {}

    handleUnauthorizedError = () => {
        this.removeBearerToken()
    }

    handleServerError = () => {}
}