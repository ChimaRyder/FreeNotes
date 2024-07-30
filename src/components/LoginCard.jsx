import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.jsx";
import {
    Form,
    FormControl, FormDescription,
    FormField,
    FormItem,
    FormMessage
} from "@/components/ui/form.jsx";
import {z} from "zod"
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Input} from "@/components/ui/input.jsx";
import {Button} from "@/components/ui/button.jsx";
import {Separator} from "@/components/ui/separator.jsx";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios"
import {useState} from "react";
import {Loader2} from "lucide-react";

const loginSchema = z.object({
    username: z
        .string()
        .min(1, "Please enter a valid username."),
    password: z
        .string()
        .min(1, "Please enter your password."),
})
const LoginCard = ({onLogin, closePopup}) => {
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const form = useForm({
        resolver:zodResolver(loginSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    })

    function onSubmit(user) {
        setLoading(true);
        axios.defaults.withCredentials = true;
        axios.post(import.meta.env.VITE_API_LINK + '/login', user)
            .then((result) => {
                setLoading(false);
                setMessage("");
                navigate("/dashboard/settings");
                closePopup();
                onLogin(result.headers.authorization);
            })
            .catch(err => {
                setLoading(false);
                setMessage(err.response.data)
            })
    }

    return (
        <Card className={"border-0 shadow-none bg-background"}>
           <CardHeader>
               <CardTitle>Welcome Back!</CardTitle>
               <CardDescription>Please login to continue.</CardDescription>
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
                                   <FormDescription className={"text-xs hover:text-foreground"}><Link to={"#"}>Forgot your password?</Link></FormDescription>
                                   <FormMessage>{message}</FormMessage>
                               </FormItem>
                           )}
                       />

                       <Button disabled = {loading} type={"submit"} className={"w-full !my-5"}>
                           {loading && <Loader2 className={"mr-2 w-4 h-4 animate-spin"}/>}
                               Login
                           </Button>
                   </form>
               </Form>
               <Separator className={"flex items-center justify-center"}>
                  <div className={"text-xs bg-background p-2 text-muted-foreground"}>Or</div>
               </Separator>

               <Button asChild className={"w-full !mt-5"}>
                   <Link to="/signup">Sign Up</Link>
               </Button>
           </CardContent>
       </Card>
    );
}

export default LoginCard