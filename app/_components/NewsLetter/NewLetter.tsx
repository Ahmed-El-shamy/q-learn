import { Send } from "lucide-react";

const NewsLetter = () => {
    return (
        <div>
            <p className="font-bold mb-2 text-lg">
                Subscribe to get our latest news!
            </p>
            <form className="border flex w-full max-w-xl">
                <input 
                    className="appearance-none flex-1 outline-none font-bold px-2 w-full"
                    type="email"
                    name="email"
                />
                <button className="flex bg-black justify-center cursor-pointer hover:bg-black/90 duration-100 items-center p-2">
                    <Send color="white" />
                </button>
            </form>
        </div>
    );
}

export default NewsLetter;