import {IconBallpen} from "@tabler/icons-react";

const CreateNote = () => {
    return (
        <>
            <div className={'w-full flex flex-col'}>
                <h3 className={'flex text-3xl mt-5 ms-8 font-bold'}>
                    <IconBallpen className={'self-center justify-self-center me-2'} size={30}/>
                    Create a Note
                </h3>
            </div>
        </>
    )
}

export default CreateNote