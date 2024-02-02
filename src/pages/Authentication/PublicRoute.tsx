import { Navigate, Outlet } from "react-router-dom"
import AuthServices from "../../Services/AuthServices"

const Auth = new AuthServices()
const isAuthenticated = Auth.isAuthenticated()

const PublicRoute = () => {
    return isAuthenticated ? <Navigate to='/'/> : <Outlet/>
}

export default PublicRoute;