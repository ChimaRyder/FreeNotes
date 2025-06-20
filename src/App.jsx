import './App.css'
import Navbar from "@/components/Navbar.jsx";
import {Toaster} from "@/components/ui/sonner.jsx";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import SignUpPage from "@/signup/SignUpPage.jsx";
import Main from "@/main/Main.jsx";
import DashBoard from "@/dashboard/DashBoard.jsx";
import Auth from "@/components/Auth.jsx";
import Settings from "@/components/dashboard-components/Settings.jsx";
import CreateNote from "@/components/dashboard-components/CreateNote.jsx";
import MyNotes from "@/components/dashboard-components/MyNotes.jsx";
import About from "@/about/About.jsx";
import {Separator} from "@/components/ui/separator.jsx";

function App() {
  return (
        <BrowserRouter>
            <div className={'min-h-screen flex flex-col justify-between'}>
                <Navbar></Navbar>
                <Routes>
                    <Route index element={<Main/>}/>
                    <Route path={'/about'} element={<About/>}/>
                    <Route path={"/signup"} element={<SignUpPage/>}/>
                    <Route element={<Auth/>}>
                        <Route path={"/dashboard"} element={<DashBoard/>}>
                            <Route path={"settings"} element={<Settings/>}/>
                            <Route path={"mynotes"} element={<MyNotes/>}/>
                            <Route path={"create"} element={<CreateNote/>}/>
                        </Route>
                    </Route>
                </Routes>
                <Toaster/>
                <Separator className={'mt-10 mb-5'}/>
            </div>
        </BrowserRouter>
  )
}

export default App
