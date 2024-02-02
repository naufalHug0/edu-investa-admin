import { Navigate, Outlet } from "react-router-dom"
import AuthServices from "../../Services/AuthServices"

const Auth = new AuthServices()
const isAuthenticated = Auth.isAuthenticated()

const PrivateRoute = () => {
    return isAuthenticated ? <Outlet/> : <Navigate to='/auth/signin'/>
}

export default PrivateRoute;