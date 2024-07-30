import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.jsx";
import {IconUserFilled} from "@tabler/icons-react";
import {Separator} from "@/components/ui/separator.jsx";
import {Button} from "@/components/ui/button.jsx";
import {Link, useNavigate} from 'react-router-dom'
import {setAuthenticate} from "@/components/middleware/userAuthenticate.jsx";
import {Skeleton} from "@/components/ui/skeleton.jsx";
import {useState} from "react";
import {Loader2} from "lucide-react";
const ProfilePopup = ({loading, username, onLogout, closePopup}) => {
    const [logoutLoading, setLogoutLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        setLogoutLoading(true);
        fetch(import.meta.env.VITE_API_LINK + '/logout', {credentials: "include"})
            .then(() => {
                setLogoutLoading(false);
                setAuthenticate(null);
                onLogout();
                closePopup();
                navigate('/');
            })
            .catch(err =>
            {
                setLogoutLoading(false);
                console.log(err)
            })
    }

    return (
        <Card className={"border-0 shadow-none flex flex-col justify-center items-center bg-background"}>
            <CardHeader className={'!p-3 flex items-center'}>
                {loading &&
                    <>
                    <Skeleton className={'w-[80px] h-[80px] rounded-full'}/>
                    <CardTitle className={"!mt-5"}><Skeleton className={'w-[100px] h-[24px] rounded-md'}/></CardTitle>
                    </>
                }
                {!loading &&
                    <>
                    <IconUserFilled size={80}/>
                    <CardTitle className={"!mt-5"}>{username}</CardTitle>
                    </>
                }
            </CardHeader>
            <CardContent className={'flex flex-col w-full space-y-2'}>
                <Separator className={'my-3'}/>
                {loading &&
                    <>
                    <Skeleton className={'h-10 w-max-full'}></Skeleton>
                    <Skeleton className={'h-10 w-max-full'}></Skeleton>
                    </>
                }
                {!loading &&
                    <>
                    <Button variant={'outline'} className={'w-max-full'} asChild>
                        <Link to={'/dashboard/settings'}>Dashboard</Link>
                    </Button>
                    <Button disabled = {loading} variant={'outline'} className={'!w-max-full'} onClick={()=> {handleLogout()}}>
                        {logoutLoading && <Loader2 className={"mr-2 w-4 h-4 animate-spin"}/>}
                        Logout </Button>
                    </>
                }
            </CardContent>
        </Card>
    );
}

export default ProfilePopup;