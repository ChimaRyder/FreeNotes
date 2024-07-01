import './App.css'
import Navbar from "@/components/Navbar.jsx";
import {Toaster} from "@/components/ui/sonner.jsx";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import SignUpPage from "@/signup/SignUpPage.jsx";
import Main from "@/main/Main.jsx";

function App() {
  return (
    <>
        <BrowserRouter>
            <Navbar></Navbar>
            <Routes>
                <Route index element={<Main/>}/>
                <Route path={"/signup"} element={<SignUpPage/>}/>
            </Routes>
            <Toaster/>
        </BrowserRouter>
    </>
  )
}

export default App
