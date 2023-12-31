import { useEffect, useState } from "react";
import App from "./App";

const backendUri = "http://localhost:5000";

const handleSignInClick = () => {
    window.open(`${backendUri}/auth/google`, "_self");
};

const handleLogoutClick = (onLogout) => {
    window.open(`${backendUri}/auth/logout`, "_self");
    onLogout();
};

function SignInDialog() {
    return (
        <div className="md:bg-main-blue bg-dark-blue w-screen h-screen text-white text-lg p-10 flex justify-center items-center">
            <div className="bg-dark-blue md:h-3/5 md:w-3/5 flex justify-center items-center flex-col md:shadow-xl md:rounded-3xl md:space-y-20 space-y-40">
                <h1 className=" text-6xl">GroceryHead</h1>
                <a onClick={handleSignInClick} className="button bg-main-blue text-2xl font-semibold py-4 px-8 md:text-xl md:py-2 md:px-4 rounded-xl cursor-pointer">Sign in with Google</a>
            </div>
        </div>
    )
}


export default function Home() {
    const [session, setSession] = useState({
        authenticated: false,
        user: null,
    });

    useEffect(() => {
        fetch(`${backendUri}/auth/user`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Authorization": "Bearer SomeToken",
                Accept: "application/json",
                "Access-Control-Allow-Credentials": true
                }
            })
            .then((res) => {
                if (res.status === 200) {
                    return res.json();
                }

                throw new Error("failed to authenticate user");
            })
            .then((data) => {
                setSession({
                    authenticated: true,
                    user: data.user,
                });
            })
            .catch((err) => {
                console.log(err);
                setSession({
                    authenticated: false,
                    user: null,
                });
            });
    }, []);


    return (
        <div>
            {session.authenticated ? (
                <App
                    onLogout={() => setSession({ authenticated: false, user: null })}
                    handleLogoutClick={handleLogoutClick}
                    backendUri={backendUri}
                />
            ) : (
                <SignInDialog />
            )}
        </div>
    );
    
}