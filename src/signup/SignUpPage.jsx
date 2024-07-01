import Navbar from "@/components/Navbar.jsx";
import "../App.css"
import SignUpCard from "@/components/SignUpCard.jsx";

const SignUpPage = () => {
    return (
        <>
            <div className={"flex justify-center items-center mt-20 text-left"}>
                <SignUpCard></SignUpCard>
            </div>
        </>
    )
}

export default SignUpPage