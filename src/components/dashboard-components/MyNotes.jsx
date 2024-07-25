import {IconNotes} from "@tabler/icons-react";
import {Separator} from "@/components/ui/separator.jsx";
import {useEffect, useState} from "react";
import {getAuthenticate} from "@/components/middleware/userAuthenticate.jsx";
import {Skeleton} from "@/components/ui/skeleton.jsx";

const MyNotes = () => {
    const [confessions, setConfessions] = useState([])
    const [loading, setLoading] = useState(false);
    useEffect(() => {

        const fetchConfessions = async () => {
            setLoading(true);
            const auth = getAuthenticate();
            const res = await fetch(import.meta.env.VITE_API_LINK + '/getCreatedNotes', {credentials: "include", headers: {authorization: auth}})
            const data = await res.json()
            setConfessions(data.created_notes)
            setLoading(false);
        }

        fetchConfessions();
    }, []);

    return (
        <>
            <div className={'w-full flex flex-col p-10'}>
                <h3 className={'flex text-3xl font-bold'}>
                    <IconNotes className={'self-center justify-self-center me-2'} size={30}/>
                    My Notes
                </h3>

                <Separator className={'mt-5 mb-8'}/>

                <div className={'flex justify-center'}>
                    <div className={'grid grid-cols-3 gap-4'}>
                        {loading &&
                            Array(6)
                                .fill(true)
                                .map((item, index) =>
                                    (
                                        <Skeleton
                                            key = {index}
                                            className={'w-[300px] h-[300px] rounded-md p-5'}
                                        />
                                    )
                                )
                        }
                        {!loading && confessions.map((note, index) => (
                                <div
                                    key = {index + note}
                                    className={'w-[300px] h-[300px] shadow-2xl rounded-md p-5 flex flex-col items-start'}
                                    style={{background: note.color}}>
                                    <h2 className={'text-lg mb-3'}><span
                                        className={'font-bold'}>To: </span>{note.name_to}</h2>
                                    <p className={'text-md text-justify'}>{note.content}</p>
                                </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default MyNotes