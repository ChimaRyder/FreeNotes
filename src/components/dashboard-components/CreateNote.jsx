import {IconBallpen} from "@tabler/icons-react";
import {Separator} from "@/components/ui/separator.jsx";
import {Textarea} from "@/components/ui/textarea.jsx";
import {useState} from "react";
import {Button} from "@/components/ui/button.jsx";
import {Input} from "@/components/ui/input.jsx";
import {useForm} from "react-hook-form";
import {z} from 'zod';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form.jsx";
import {zodResolver} from "@hookform/resolvers/zod";
import axios from "axios";
import {toast} from "sonner";
import {useNavigate} from "react-router-dom";

const noteSchema = z.object({
    name_to: z
        .string()
        .min(1),
    content: z
        .string()
        .min(1),
})

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
    const navigate = useNavigate();
    const [bgcolor, setBgcolor] = useState('#cdb4db');
    const form = useForm({
        resolver:zodResolver(noteSchema),
        defaultValues: {
            name_to: "",
            content: "",
        }
    })

    const submitNote = (note) => {
        const fullNote = {...note, color : bgcolor};

        axios.defaults.withCredentials = true;
        axios.post('http://localhost:3000/submitNote', fullNote)
            .then(() => {
                navigate("/dashboard/mynotes");
                toast.success("Success!", {
                    description: "Your confession has been submitted.",
                })
            })
            .catch(err => {
                console.log(err);
            })

    }


    return (
        <>
            <div className={'w-full flex flex-col p-10'}>
                <h3 className={'flex text-3xl font-bold'}>
                    <IconBallpen className={'self-center justify-self-center me-2'} size={30}/>
                    Create a Note
                </h3>

                <Separator className={'mt-5 mb-8'}/>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(submitNote)} className={'flex flex-row justify-evenly flex-wrap'}>
                        <div className={'flex flex-col w-2/4'}>
                            <FormField
                                control = {form.control}
                                name = "name_to"
                                render = {({field}) =>(
                                    <FormItem style={{background: bgcolor}} className={'flex flex-row gap-2 items-center border border-input border-b-0 !rounded-bl-none !rounded-br-none rounded-md px-4 pt-1'}>
                                        <FormLabel className={'text-lg'}>To:</FormLabel>
                                        <FormControl>
                                            <Input className={'pt-0 px-0 border-none focus-visible:ring-0 focus-visible:ring-offset-0 text-lg'} placeholder={'Write A Name'} style={{background: bgcolor}} {...field}/>
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control = {form.control}
                                name = "content"
                                render = {({field}) =>(
                                    <FormItem>
                                        <FormControl>
                                            <Textarea placeholder={'What\'s on your mind?'} className={'!h-[300px] w-full resize-none text-xl text-justify border-t-0 rounded-tl-none rounded-tr-none focus-visible:ring-0 focus-visible:ring-offset-0 p-5 pt-3'} style={{background: bgcolor}} {...field}/>
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
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

                            <Button type={'submit'} disabled={!form.formState.isDirty || !form.formState.isValid} className={'w-full'}>Post Your Note</Button>
                        </div>
                    </form>
                </Form>
            </div>
        </>
    )
}

export default CreateNote