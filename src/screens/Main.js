import Courses from "./Courses";

const Main = () => {

    return (
        <div className='d-flex flex-column  flex-justify-center'>
            <div className='d-flex flex-justify-end w-100'>
                <h2>
                    {new Intl.DateTimeFormat('en-GB', {
                        day: '2-digit',
                        month: 'long',
                        hour: '2-digit',
                        minute: '2-digit',
                    }).format(new Date())}
                </h2>
            </div>
            <Courses className='d-flex flex-items-center flex-justify-center'></Courses>
        </div>
    );
}

export default Main;
