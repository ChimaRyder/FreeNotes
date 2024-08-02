import {IconSettings} from "@tabler/icons-react";
import {Separator} from "@/components/ui/separator.jsx";
import {z} from "zod"
import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import userAuthenticate, {getAuthenticate} from "@/components/middleware/userAuthenticate.jsx";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.jsx";
import {Input} from "@/components/ui/input.jsx";
import {Switch} from "@/components/ui/switch.jsx";
import {Button} from "@/components/ui/button.jsx";
import {SaveIcon} from "lucide-react";
import {toast} from "sonner";
import axios from "axios";

const usernameSchema = z.object({
    username: z
        .string()
        .optional(),
    dark_mode: z
        .boolean()
        .default(false)
        .optional(),

}).superRefine(async ({username}, ctx) => {
    const userExists = async () => {
        const res = await fetch(import.meta.env.VITE_API_LINK + "/userSearch?query=" + username)
        const data = await res.json();
        return data.userExists;
    }

    const x = await userExists().then((value) => {
        return value;
    }).catch((err) => {
        console.log(err);
    })

    if (x) {
        ctx.addIssue({
            code: "custom",
            message: "Username already exists.",
            path: ['username']
        });
    }
});

const Settings = () => {
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState([]);

    const getUser = async () => {
        const auth_user = await userAuthenticate();
        setUser(auth_user);
    }

    useEffect(() => {
        getUser();
    }, []);

    const form = useForm({
        resolver: zodResolver(usernameSchema),
        defaultValues: {
            username: "",
            dark_mode: false,
        }
    })

    const changeDarkMode = (dark_mode) => {
        console.log("changing dark mode to " + dark_mode)
    }

    const changeUsername = (username) => {
        if (username.length < 5) {
            toast.error("Oops! Username should contain at least 5 characters. Please try again.")
            return;
        }
        const auth = getAuthenticate();
        axios.defaults.withCredentials = true;
        axios.post(import.meta.env.VITE_API_LINK + "/updateUsername", {username}, {headers: {Authorization: auth}})
            .then (result => {
                toast.success("Success! Your name has now been changed to " + result.data.new_username)
            })
            .catch(err => {
                console.log(err);
            })
    }
    const onSubmit = (user) => {
        console.log(user);

        changeDarkMode(user.dark_mode);

        if (user.username.length !== 0) {
            changeUsername(user.username);
        }
    }

    return (
        <>
            <div className={'w-full flex flex-col p-10'}>
                <h3 className={'flex text-3xl font-bold'}>
                    <IconSettings className={'self-center justify-self-center me-2'} size={30}/>
                    Settings
                </h3>

                <Separator className={'mt-5 mb-8'}/>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className={"space-y-5 w-1/2"}>
                            <FormField
                                control = {form.control}
                                name = "username"
                                render = {({field}) =>(
                                    <FormItem className={"flex flex-col items-start"}>
                                        <FormLabel>Username</FormLabel>
                                        <div className={"flex space-x-2 w-full"}>
                                            <FormControl>
                                                <Input placeholder={user.username} {...field}/>
                                            </FormControl>
                                            <Button><SaveIcon/></Button>
                                        </div>
                                        <FormMessage className={"text-left"}/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control = {form.control}
                                name = "dark_mode"
                                render = {({field}) => (
                                    <FormItem className={"!space-y-0 flex items-center space-x-2"}>
                                        <FormControl>
                                            <Switch
                                                type={"submit"}
                                                checked = {field.value}
                                                onCheckedChange = {field.onChange}
                                            />
                                        </FormControl>
                                        <FormLabel>Dark Mode</FormLabel>
                                    </FormItem>
                                )}
                            />
                        </form>
                    </Form>
            </div>
        </>
    );
}

export default Settings