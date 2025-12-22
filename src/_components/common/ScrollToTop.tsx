'use client';

import { useEffect, useState } from "react";
import MainBtn from "./buttons/MainBtn"
import { ArrowUp } from "lucide-react";
import clsx from "clsx";

const ScrollToTop = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    useEffect(() => {

        function handleScroll() {
            if(window.scrollY > 300) {
                setIsScrolled(true)
            } else {
                setIsScrolled(false);
            }
        }
        if(window !== undefined) {
            window.addEventListener("scroll", handleScroll);
        }

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <MainBtn 
            className={clsx("rounded-full duration-100 p-2 fixed bottom-36 lg:bottom-17 start-6", {
                "opacity-0 pointer-events-none": !isScrolled,
            })}
            onClick={() => {
                window.scrollTo({
                    behavior: "smooth",
                    top: 0
                })
            }}
        >
            <ArrowUp className="text-white" size={20} />
        </MainBtn>
    );
}

export default ScrollToTop;