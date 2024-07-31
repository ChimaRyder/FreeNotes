import {IconSettings} from "@tabler/icons-react";
import {Separator} from "@/components/ui/separator.jsx";
import {z} from "zod"
import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import userAuthenticate from "@/components/middleware/userAuthenticate.jsx";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.jsx";
import {Input} from "@/components/ui/input.jsx";

const usernameSchema = z.object({
    username: z
        .string()
        .min(1, "Please enter a valid username.")
        .min(5, "Username should be at least 5 characters."),
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
        }
    })

    const handleSubmit = (user) => {

    }

    return (
        <>
            <div className={'w-full flex flex-col p-10'}>
                <h3 className={'flex text-3xl font-bold'}>
                    <IconSettings className={'self-center justify-self-center me-2'} size={30}/>
                    Settings
                </h3>

                <Separator className={'mt-5 mb-8'}/>

                <div>
                    <Form {...form}>
                        <form onSubmit={handleSubmit} className={"space-y-2 flex flex-col items-start"}>
                            <FormField
                                control = {form.control}
                                name = "username"
                                render = {({field}) =>(
                                    <FormItem>
                                        <FormLabel>Username</FormLabel>
                                        <FormControl>
                                            <Input placeholder={user.username} {...field}/>
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        </form>
                    </Form>
                </div>
            </div>
        </>
    );
}

export default Settings