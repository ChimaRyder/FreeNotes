import {useEffect, useState} from 'react'
import homepage_girl from '../assets/homepage_girl.svg'
import {TypeAnimation} from "react-type-animation";
import {Input} from "@/components/ui/input.jsx";
import {Button} from "@/components/ui/button.jsx";
import {Search} from "lucide-react";
import {toast} from "sonner";

function Main() {
    const [confessions, setConfessions] = useState([])
    const [query, setQuery] = useState('');
    useEffect(() => {

        const fetchConfessions = async () => {
            const res = await fetch('http://localhost:3000/search?query=' + query, {credentials:"include"})
            const data = await res.json()
            setConfessions(data.confessions)
        }

        fetchConfessions();
    }, [query]);

    return (
        <>
            <div className={'flex w-full flex-row justify-between'}>
                <img src={homepage_girl} alt={'Girl on her phone using app'}/>
                <div className={'flex flex-col w-full justify-center items-left space-y-20'}>
                    <div>
                        <TypeAnimation
                            sequence={[
                                'Unburdening Hidden Truths',
                                1000,
                                'Exploring Unfiltered Thoughts',
                                1000,
                                'Finding Unexpected Empathy',
                                1000,
                                'Sparking Honest Conversations',
                                1000
                            ]}
                            speed={50}
                            repeat={Infinity}
                            className={'font-bold text-3xl'}
                        />
                    </div>
                    <p className={'text-lg leading-loose'}><span className={'font-bold'}>FreeNotes</span> is your safe
                        haven for anonymous confessions. No judgment, no names, just pure catharsis. Share your deepest
                        thoughts, darkest secrets, or wildest dreams – <span className={'italic'}>anonymously.</span>
                    </p>
                </div>
            </div>

            <div>
                <h1 className={'text-3xl font-bold my-10'}>Speak your mind, stay unseen. Read what others share on the board.</h1>

                <div className={'flex flex-row space-x-3 mb-5'}>
                    <Input id={'search_query'} onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            setQuery(document.getElementById('search_query').value)
                        }
                    }} placeholder={'Search for a name...'}/>
                    <Button onClick={() => setQuery(document.getElementById('search_query').value)}><Search/></Button>
                </div>

                <h3 className={'font-bold italic text-sm m-5'}>There {confessions.length === 1 ? 'is' : 'are'} {confessions.length} {confessions.length === 1 ? 'confession' : 'confessions'} found</h3>

                <div className={'grid grid-cols-4 gap-3 min-h-40'}>
                    {confessions.map(note => (
                        <>
                            <div
                                className={'w-[300px] h-[300px] shadow-2xl rounded-md p-5 flex flex-col items-start'}
                                style={{background: note.color}}>
                                <h2 className={'text-lg mb-3'}><span
                                    className={'font-bold'}>To: </span>{note.name_to}</h2>
                                <p className={'text-md text-justify'}>{note.content}</p>
                            </div>
                        </>
                    ))}
                </div>
            </div>

        </>
    )
}

export default Main
