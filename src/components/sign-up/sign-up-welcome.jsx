import Button from "../button/button";

export default function SignUpWelcome() {

    return (
        <div className="container mx-auto bg-white mt-10 p-5 rounded-lg shadow-sm sm:max-w-sm">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm ">
                <h2 className="text-2xl font-bold mb-4 text-center">Thank you for signing up!</h2>
                <p className="mb-10">Before you can use your account, please confirm your email by clicking the link we just emailed you.</p>
                <div><Button variant="primary" className="self-center	" to="/">Homepage</Button></div>
            </div>
        </div>
    );
};


