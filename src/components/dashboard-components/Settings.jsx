import {IconSettings} from "@tabler/icons-react";
import {Separator} from "@/components/ui/separator.jsx";

const Settings = () => {
    return (
        <>
            <div className={'w-full flex flex-col p-10'}>
                <h3 className={'flex text-3xl font-bold'}>
                    <IconSettings className={'self-center justify-self-center me-2'} size={30}/>
                    Settings
                </h3>

                <Separator className={'mt-5 mb-8'}/>
            </div>
        </>
    );
}

export default Settings