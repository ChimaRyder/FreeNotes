import {Navigate, Outlet} from "react-router-dom";
import {useEffect, useState} from "react";

const Auth = () => {
    const [user, setUser] = useState([]);

    useEffect(() => {
        const getUser = async () => {
            fetch("http://localhost:3000/auth/token", {credentials: "include"})
                .then(async res => {
                    const user = await res.json();
                    setUser(user);
                })
                .catch(() => {
                    setUser(null);
                })
        }
        getUser();

    }, []);

    return (
        <>
            { user ? <Outlet/> : <Navigate to={"/"}/> }
        </>
    )
}

export default Auth;