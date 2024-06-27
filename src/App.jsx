import {useEffect, useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

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
        {confessions.map(i => (
            <>
                <h2>{i.name_to}</h2>
                <p>{i.content}</p>
            </>
        ))}
    </>
  )
}

export default App
