import { useState } from "react";
import { FaAngleDown } from "react-icons/fa";

const questions = [
    {
        question: "Do you support Youtube ?",
        answer: "Yes we do."
    },
    {
        question: "Can I search for youtube video inside the platform ?",
        answer: "Yes, you can."
    },
    {
        question: "Can i share the room via a Link ?",
        answer: "Yes, you can."
    }
];

export default function FAQ(){
    return(
        <div className="w-full flex flex-col items-center font-mono py-20">
            <div className="w-2/3 flex flex-col items-center">
                <div className="text-white text-xl py-4">The most frequently asked questions</div>
                <div className="w-11/12 flex flex-col items-center bg-sky-700 rounded-lg py-4">
                    {
                        questions.map((question, index) => {
                            return <Question key={index} question={question} />
                        })
                    }
                </div>
            </div>
        </div>
    )
}

function Question({ question }){
    const [is_open,setIsOpen] = useState(false);

    function toggle(){
        setIsOpen(state => !state);
    }

    return(
        <div className="w-11/12 flex flex-col items-center bg-sky-800 rounded-lg my-1">
            <div onClick={toggle} className="cursor-pointer w-full px-8 flex flex-row items-center justify-between text-white py-4">
                <div className="">{question.question}</div>
                <div><FaAngleDown /></div>
            </div>
            <div className={"w-full px-8 py-2 text-white text-sm bg-sky-900 rounded-b-lg"+ (is_open ? "" : " hidden")}>{question.answer}</div>
        </div>

    )
}