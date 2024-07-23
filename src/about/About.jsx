import about_guy from '../assets/about-guy.svg'
const About = () => {
    return (
        <>

            <div className={'p-20 flex space-y-10 flex-col justify-center items-center'}>
                <img src={about_guy} alt={'A guy on the phone while cycling.'} className={'size-1/2'}/>
                <h3 className={'font-bold text-2xl'}>About FreeNotes</h3>
                <p className={'text-justify indent-10 leading-loose text-lg'}>
                    FreeNotes is a safe and anonymous space where you can share your deepest
                    thoughts and feelings without fear of judgment. Inspired by UnsentProject,
                    this platform was born from a desire to provide a place for people to unburden
                    themselves. By offering complete anonymity, we aim to create a sanctuary where
                    you can freely express your burdens, worries, or simply anything that weighs on
                    your mind. Let FreeNotes be your digital confidant.
                </p>
            </div>
        </>
    )
}


export default About