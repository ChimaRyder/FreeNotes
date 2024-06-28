import {useEffect, useState} from 'react'
import './App.css'
import Navbar from "@/components/Navbar.jsx";

function App() {
    const [confessions, setConfessions] = useState([])
    useEffect(() => {

        const fetchConfessions = async () => {
            const res = await fetch('http://localhost:3000/search')
            const data = await res.json()
            console.log(data)
            console.log(data)
            setConfessions(data.confessions)
        }

        fetchConfessions();
    }, []);

  return (
    <>
        <Navbar></Navbar>
        {confessions.map(i => (
            <>

                <div>
                    <h2>To: {i.name_to}</h2>
                    <p>{i.content}</p>
                </div>
            </>
        ))}
    </>
  )
}

export default App
