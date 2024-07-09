import {IconBallpen} from "@tabler/icons-react";
import {Separator} from "@/components/ui/separator.jsx";
import {Textarea} from "@/components/ui/textarea.jsx";
import {useState} from "react";
import {Button} from "@/components/ui/button.jsx";
import {Input} from "@/components/ui/input.jsx";
import {Label} from "@/components/ui/label.jsx";

const colors = [
    '#cdb4db',
    '#ffc8dd',
    '#ffafcc',
    '#bde0fe',
    '#a2d2ff',
    '#ccd5ae',
    '#e9edc9',
    '#fefae0',
    '#faedcd',
    '#fec5bb',
    '#fcd5ce',
    '#fbf8cc',
    '#fde4cf',
    '#e2ece9',
    '#bee1e6',
]

const CreateNote = () => {
    const [bgcolor, setBgcolor] = useState('#cdb4db');
    return (
        <>
            <div className={'w-full flex flex-col p-10'}>
                <h3 className={'flex text-3xl font-bold'}>
                    <IconBallpen className={'self-center justify-self-center me-2'} size={30}/>
                    Create a Note
                </h3>

                <Separator className={'mt-5 mb-8'}/>

                <div className={'flex flex-row justify-evenly'}>
                    <div className={'flex flex-col w-2/4'}>
                        <div className={'flex flex-row gap-2 items-center border border-input border-b-0 rounded-bl-none rounded-br-none rounded-md px-4 pt-1'} style={{background: bgcolor}}>
                            <Label className={'text-lg'}>To:</Label>
                            <Input className={'px-0 border-none focus-visible:ring-0 focus-visible:ring-offset-0 text-lg'} placeholder={'Write A Name'} style={{background: bgcolor}}/>
                        </div>
                        <Textarea placeholder={'What\'s on your mind?'} className={'!h-[300px] w-full resize-none text-xl text-justify border-t-0 rounded-tl-none rounded-tr-none focus-visible:ring-0 focus-visible:ring-offset-0 p-5 pt-3'} style={{background: bgcolor}}/>
                    </div>

                    <div className={'flex flex-col items-start gap-4'}>
                        <h6 className={'font-bold'}>Choose A Color</h6>
                        <div className={'flex flex-wrap gap-2 mt-0 max-w-80'}>
                            {colors.map((s) => (
                                <div
                                    key={s}
                                    style={{background: s}}
                                    className={'rounded-md h-14 w-14 cursor-pointer active:scale-105'}
                                    onClick={() => setBgcolor(s)}
                                />
                            ))}
                        </div>

                        <Button className={'w-full'}>Post Your Message</Button>
                    </div>

                </div>
            </div>
        </>
    )
}

export default CreateNote