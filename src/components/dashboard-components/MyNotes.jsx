import {IconNotes} from "@tabler/icons-react";

const MyNotes = () => {

    return (
        <>
            <div className={'w-full flex flex-col'}>
                <h3 className={'flex text-3xl mt-5 ms-8 font-bold'}>
                    <IconNotes className={'self-center justify-self-center me-2'} size={30}/>
                    My Notes
                </h3>
            </div>
        </>
    )
}

export default MyNotes