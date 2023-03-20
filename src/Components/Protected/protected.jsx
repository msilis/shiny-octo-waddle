import { Navigate } from "react-router";

export default function Protected({loggedIn, children}){
    if(!loggedIn){
        return <Navigate to="/login" replace />;
    } return children;
}