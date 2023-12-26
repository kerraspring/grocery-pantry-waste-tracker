export default function Home() {
    return(
        <div className="bg-main-blue w-screen h-screen text-white text-lg p-10 flex justify-center items-center">
            <div className="bg-dark-blue h-3/5 w-3/5 flex justify-center items-center flex-col shadow-xl rounded-3xl space-y-20">
            <h1 className=" text-6xl">GroceryHead</h1>
            <a href="/login/federated/google" class="button bg-main-blue text-xl py-2 px-4 rounded-xl">Sign in with Google</a>
            </div>
        </div>
    )
}