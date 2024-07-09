import {IconNotes} from "@tabler/icons-react";
import {Separator} from "@/components/ui/separator.jsx";

const MyNotes = () => {

    return (
        <>
            <div className={'w-full flex flex-col p-10'}>
                <h3 className={'flex text-3xl font-bold'}>
                    <IconNotes className={'self-center justify-self-center me-2'} size={30}/>
                    My Notes
                </h3>

                <Separator className={'mt-5 mb-8'}/>
            </div>
        </>
    )
}

export default MyNotes