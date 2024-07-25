import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList, navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu.jsx";
import {IconUserFilled} from "@tabler/icons-react";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.jsx";
import LoginCard from "@/components/LoginCard.jsx";
import {Link} from "react-router-dom"
import userAuthenticate, {getAuthenticate, setAuthenticate} from "@/components/middleware/userAuthenticate.jsx";
import ProfilePopup from "@/components/ProfilePopup.jsx";
import {useEffect, useState} from "react";
import {NotebookPen} from "lucide-react";

const LoginPopup = () => {
    const [user, setUser] = useState([]);
    const [loading, setLoading] = useState(false);

    const onLogin = (auth) => {
        const x = async () => {
            setAuthenticate(auth ?? getAuthenticate());
            setLoading(true);
            const y = await userAuthenticate();
            setUser(y);
            setLoading(false);
        }

        x();
    }

    useEffect(() => {
        onLogin();
    }, []);

    return (
        <>
            {user ? <ProfilePopup loading = {loading} username = {user.username} onLogout={onLogin}/> : <LoginCard onLogin = {onLogin}/>}
        </>
    )
}

const Navbar = () => {


    return (
       <NavigationMenu className={"max-w-full justify-between flex-initial"}>
           <NavigationMenuList>
               <NavigationMenuItem className={"mr-5"}>
                   <NavigationMenuLink asChild className={"font-bold cursor-pointer"}>
                       <Link to={"/"} className={'flex flex-row'}>
                           <NotebookPen className={'mr-2'}/>FreeNotes
                       </Link>
                   </NavigationMenuLink>
               </NavigationMenuItem>
               <NavigationMenuItem>
                   <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                       <Link to={'/about'}>
                           About
                       </Link>
                   </NavigationMenuLink>
               </NavigationMenuItem>
           </NavigationMenuList>
           <NavigationMenuList>
               <NavigationMenuItem>
                       <Popover>
                           <PopoverTrigger>
                               <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                   <IconUserFilled/>
                               </NavigationMenuLink>
                           </PopoverTrigger>
                           <PopoverContent align={"end"} sideOffset={5}>
                               <LoginPopup/>
                           </PopoverContent>
                       </Popover>
               </NavigationMenuItem>
           </NavigationMenuList>
       </NavigationMenu>
    );
}

export default Navbar