import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.jsx";
import {z} from "zod"
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormDescription, FormField, FormItem, FormMessage} from "@/components/ui/form.jsx";
import {Input} from "@/components/ui/input.jsx";
import {Button} from "@/components/ui/button.jsx";
import {Separator} from "@/components/ui/separator.jsx";

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
});

const SignUpCard = () => {
    const form = useForm({
        resolver:zodResolver(signupSchema),
        defaultValues: {
            username: "",
            password: "",
            confirmpassword: "",
        },
    })

    function onSubmit(values) {
        console.log(values);
    }

    return (
        <Card className={"w-[350px]"}>
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
    )
}

export default SignUpCard