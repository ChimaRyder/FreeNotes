import {useEffect, useState} from 'react'
import './App.css'

import {Card} from "react-bootstrap";

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
            <Card className={"m-2"}>
                <Card.Body>
                    <Card.Title>To: {i.name_to}</Card.Title>
                    <Card.Text>{i.content}</Card.Text>
                </Card.Body>
            </Card>
        ))}
    </>
  )
}

export default App
