import {Button} from "@/components/ui/button.jsx";
import {Link, Outlet, useLocation} from "react-router-dom";
import {Separator} from "@/components/ui/separator.jsx";
import {useState} from "react";
import {IconLayoutDashboardFilled} from "@tabler/icons-react";

const DashBoard = () => {
    const loc = useLocation();
    const path = loc.pathname.split('/')[2];

    return (
        <>
            <div className={'border-2 rounded-2xl h-[500px] m-10 flex min-w-fit'}>
                <nav className={'flex flex-col max-w-40 space-y-2 m-2'}>
                    <h4 className={'flex font-bold mt-2 mb-3 text-lg'}><IconLayoutDashboardFilled className={'me-1'}/>Dashboard</h4>
                    <Button asChild variant={path === 'settings' ? '' : 'outline'} className={'border-none justify-start'}>
                        <Link to={'/dashboard/settings'}>Settings</Link>
                    </Button>
                    <Button asChild variant={path === 'mynotes' ? '' : 'outline'} className={'border-none justify-start'}>
                        <Link to={'/dashboard/mynotes'}>My Notes</Link>
                    </Button>
                    <Button asChild variant={path === 'create' ? '' : 'outline'} className={'border-none justify-start pe-20'}>
                        <Link to={'/dashboard/create'}>Create a Note</Link>
                    </Button>
                </nav>

                <Separator orientation={'vertical'}/>

                <Outlet/>
            </div>
        </>
    )
}

export default DashBoard