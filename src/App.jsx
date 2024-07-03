import './App.css'
import Navbar from "@/components/Navbar.jsx";
import {Toaster} from "@/components/ui/sonner.jsx";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import SignUpPage from "@/signup/SignUpPage.jsx";
import Main from "@/main/Main.jsx";
import DashBoard from "@/dashboard/DashBoard.jsx";
import Auth from "@/components/ui/Auth.jsx";

function App() {
  return (
    <>
        <BrowserRouter>
            <Navbar></Navbar>
            <Routes>
                <Route index element={<Main/>}/>
                <Route path={"/signup"} element={<SignUpPage/>}/>
                <Route element={<Auth/>}>
                    <Route path={"/dashboard"} element={<DashBoard/>}/>
                </Route>
            </Routes>
            <Toaster/>
        </BrowserRouter>
    </>
  )
}

export default App
