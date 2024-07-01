import {useEffect, useState} from 'react'

function Main() {
    const [confessions, setConfessions] = useState([])
    useEffect(() => {

        const fetchConfessions = async () => {
            const res = await fetch('http://localhost:3000/search?query=Frenz')
            const data = await res.json()
            setConfessions(data.confessions)
        }

        fetchConfessions();
    }, []);

    return (
        <>
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

export default Main
