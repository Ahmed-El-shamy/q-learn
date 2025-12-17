import { Activity, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import { Asterisk, Calendar } from "lucide-react";
import { DayPicker, getDefaultClassNames } from "react-day-picker";
import clsx from "clsx";
import "react-day-picker/style.css";

const classNames = getDefaultClassNames();
const tenYears = new Date((new Date().getFullYear() + 10).toString());

interface Props {
    currentValue?: Date | string;
    onChange: (newDate: Date) => void;
    label: string;
    error?: string;
    className?: string;
    name: string;
    required?: boolean;
    readonly?: boolean;
    disabled?: boolean;
    placeholder?: string;
    closeOnSelect?: boolean;
}

const DateInput = ({
    label,
    onChange,
    currentValue,
    error,
    className,
    name,
    required,
    readonly,
    disabled,
    placeholder,
    closeOnSelect = true,
}: Props) => {

    const [isOpened, setIsOpened] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    const selected: Date = useMemo(() => {
        if(typeof currentValue === "string") return new Date(currentValue as string);
        return currentValue as Date;
    }, [currentValue]);

    const handleChange = useCallback((date: Date | undefined) => {
        if(date) onChange(date);
        if(closeOnSelect) setIsOpened(false);
    }, []);

    useEffect(() => {
        if(isOpened) {
            function handleClickOutside(e: MouseEvent) {
                if(!ref.current?.contains(e.target as HTMLElement)) {
                    setIsOpened(false);
                }
            }

            window.addEventListener("click", handleClickOutside);

            return () => window.removeEventListener("click", handleClickOutside);
        }

    }, [isOpened]);


    return (
        <div
            className={twMerge("relative w-full", className)}
            onClick={() => setIsOpened(true)}
            ref={ref}
        >
            {label && (
                <label htmlFor={name} className="flex font-medium mb-1">
                    {label}{" "}
                    {required && (
                    <span>
                        <Asterisk className="text-red-500 ml-1" size={12} />
                    </span>
                    )}
                </label>
            )}
            <div className="cursor-pointer w-full">
                <div className="relative flex items-center w-full">
                    <Calendar className="absolute end-4 top-0" />
                    <div
                        className={clsx("flex-1 text-sm min-h-7 mt-1 outline-none border-b border-b-[#d1d1d1]  placeholder:text-[#373737]", {
                            "py-0": label,
                            "py-3": !label,
                            "opacity-50 cursor-not-allowed": disabled || disabled,
                            "border-b-red-500": error,
                            "border-b-[#d1d1d1]": !error
                        })}
                        onClick={() => setIsOpened(true)}
                    >
                        <p
                            className={twMerge(clsx("text-lg", {
                                "text-gray-700": currentValue,
                                "text-gray-500": !currentValue || disabled || readonly
                            }))}
                        >
                            {
                                currentValue ? typeof currentValue === "string" ? currentValue : currentValue.toLocaleDateString("en-UK") : placeholder
                            }
                        </p>
                    </div>
                </div>
            </div>
            <Activity
                mode={isOpened ? "visible" : "hidden"}
            >
                <div className="absolute bg-white rounded-md z-50 border top-[65px] start-0 end-0 p-2 w-fit">
                    <DayPicker 
                        selected={selected}
                        mode="single"
                        onSelect={handleChange}
                        pagedNavigation
                        animate
                        showOutsideDays
                        fixedWeeks
                        endMonth={tenYears}
                        captionLayout="dropdown-years"
                        classNames={{
                            selected: "main-background text-white rounded-full flex justify-center items-center",
                            today: "text-purple-500 outline-none rounded-full border-purple-500",
                            day_button: `${classNames.day_button} flex justify-center items-center `,
                            chevron: "fill-purple-500",
                            caption_label: `${classNames.caption_label} text-purple-800`,
                            month_caption: `${classNames.month_caption} text-purple-800`
                        }}
                    />
                </div>
            </Activity>

        </div>
    );
}

export default DateInput;