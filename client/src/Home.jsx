import { useEffect, useState } from "react"

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
        <div className="bg-main-blue w-screen h-screen text-white text-lg p-10 flex justify-center items-center">
            <div className="bg-dark-blue h-3/5 w-3/5 flex justify-center items-center flex-col shadow-xl rounded-3xl space-y-20">
                <h1 className=" text-6xl">GroceryHead</h1>
                <a onClick={handleSignInClick} className="button bg-main-blue text-xl py-2 px-4 rounded-xl cursor-pointer">Sign in with Google</a>
            </div>
        </div>
    )
}

function Dashboard(onLogout) {
    return (
        <div className="bg-main-blue w-screen h-screen text-white text-lg p-10 flex justify-center items-center">
            <div className="bg-dark-blue h-3/5 w-3/5 flex justify-center items-center flex-col shadow-xl rounded-3xl space-y-20">
            <h1 className="text-6xl">Dashboard</h1>
            <p className="text-2xl">Welcome to the dashboard</p>
            
            <a onClick={() => handleLogoutClick(onLogout)} className="button bg-main-blue text-xl py-2 px-4 rounded-xl cursor-pointer">Logout</a>
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


    return(
        <div>
            {session.authenticated ? (
                <Dashboard onLogout={() => setSession({ authenticated: false, user: null })} />
            ) : (
                <SignInDialog />
            )}
        </div>
    )
}