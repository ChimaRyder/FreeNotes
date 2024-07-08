import {IconSettings} from "@tabler/icons-react";
import {Separator} from "@/components/ui/separator.jsx";

const Settings = () => {
    return (
        <>
            <div className={'w-full flex flex-col'}>
                <h3 className={'flex text-3xl mt-5 ms-8 font-bold'}>
                    <IconSettings className={'self-center justify-self-center me-2'} size={30}/>
                    Settings
                </h3>
            </div>
        </>
    );
}

export default Settings