import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.jsx";
import {z} from "zod"
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form.jsx";
import {Input} from "@/components/ui/input.jsx";
import {Button} from "@/components/ui/button.jsx";
import axios from "axios";
import {toast} from "sonner";
import {useNavigate} from "react-router-dom"

const signupSchema = z.object({
    username: z
        .string()
        .min(1, "Please enter a valid username.")
        .min(5, "Username should be at least 5 characters."),
    password: z
        .string()
        .min(1, "Please enter a valid password.")
        .min(6, "Password should be at least 6 characters."),
    confirmpassword: z
        .string()
        .min(1, "Please confirm your password.")
}).superRefine(({confirmpassword, password}, ctx) => {
    if (confirmpassword !== password) {
        ctx.addIssue({
            code:"custom",
            message: "Passwords do not match.",
            path: ['confirmpassword']
        });
    }
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

const SignUpCard = () => {
    const navigate = useNavigate();
    const form = useForm({
        resolver:zodResolver(signupSchema),
        defaultValues: {
            username: "",
            password: "",
            confirmpassword: "",
        },
    })

    const onSubmit = (user) => {
        axios.post(import.meta.env.VITE_API_LINK + '/register', user)
            .then(() => {
                toast.success("Success!", {
                    description:"Your account has been created. Please login.",
                })
                navigate('/');
            })
            .catch(err => console.log(err))
    }

    return (
        <>
        <Card className={"w-[350px] bg-background"}>
            <CardHeader>
                <CardTitle>Sign Up!</CardTitle>
                <CardDescription>Start writing your FreeNotes today.</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className={"space-y-2"}>
                        <FormField
                            control = {form.control}
                            name = "username"
                            render = {({field}) =>(
                                <FormItem>
                                    <FormControl>
                                        <Input placeholder={"Username"} {...field}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control = {form.control}
                            name = "password"
                            render = {({field}) =>(
                                <FormItem>
                                    <FormControl>
                                        <Input type="password" placeholder={"Password"} {...field}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control = {form.control}
                            name = "confirmpassword"
                            render = {({field}) =>(
                                <FormItem>
                                    <FormControl>
                                        <Input type="password" placeholder={"Confirm Password"} {...field}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        <Button type={"submit"} className={"w-full !mt-5"}>Sign Up</Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
        </>
    )
}

export default SignUpCard