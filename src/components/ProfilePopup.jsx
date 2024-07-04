import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.jsx";
import {IconUserFilled} from "@tabler/icons-react";
import {Separator} from "@/components/ui/separator.jsx";
import {Button} from "@/components/ui/button.jsx";
import {Link, useNavigate} from 'react-router-dom'
const ProfilePopup = ({username, onLogout}) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        fetch('http://localhost:3000/logout', {credentials: "include"})
            .then(res => {
                onLogout();
                navigate('/');
            })
            .catch(err => console.log(err))
    }

    return (
        <Card className={"border-0 flex flex-col justify-center items-center"}>
            <CardHeader className={'!p-3'}>
                <IconUserFilled size={80}/>
                <CardTitle className={"!mt-5"}>{username}</CardTitle>
            </CardHeader>
            <CardContent className={'flex flex-col w-full space-y-2'}>
                <Separator className={'my-3'}/>
                <Button variant={'outline'} className={'w-max-full'} asChild>
                    <Link to={'/dashboard'}>Dashboard</Link>
                </Button>
                <Button variant={'outline'} className={'!w-max-full'} onClick={()=> {handleLogout()}}>Logout</Button>
            </CardContent>
        </Card>
    );
}

export default ProfilePopup;