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
import userAuthenticate from "@/components/middleware/userAuthenticate.jsx";
import ProfilePopup from "@/components/ProfilePopup.jsx";
import {useEffect, useState} from "react";

const LoginPopup = () => {
    const [user, setUser] = useState([]);

    const onLogin = () => {
        const x = async () => {
            const y = await userAuthenticate();
            setUser(y);
        }

        x();
    }

    useEffect(() => {
        onLogin();
    }, []);

    return (
        <>
            {user ? <ProfilePopup username = {user.username} onLogout={onLogin}/> : <LoginCard onLogin = {onLogin}/>}
        </>
    )
}

const Navbar = () => {


    return (
       <NavigationMenu className={"max-w-full justify-between"}>
           <NavigationMenuList>
               <NavigationMenuItem className={"mr-5"}>
                   <NavigationMenuLink asChild to={"/"} className={"font-bold cursor-pointer"}><Link to={"/"}>FreeNotes</Link></NavigationMenuLink>
               </NavigationMenuItem>
               <NavigationMenuItem>
                   <NavigationMenuLink className={navigationMenuTriggerStyle()}>About</NavigationMenuLink>
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