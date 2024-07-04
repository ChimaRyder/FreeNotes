import {Navigate, Outlet} from "react-router-dom";
import userAuthenticate from "@/components/middleware/userAuthenticate.jsx";
import {useEffect, useState} from "react";

const Auth = () => {
    const [user, setUser] = useState([]);

    useEffect(() => {
        const x = async () => {
            const y = await userAuthenticate();
            setUser(y);
        }

        x();
    }, []);

    return (
        <>
            { user ? <Outlet/> : <Navigate to={"/"}/> }
        </>
    )
}

export default Auth;