import { useState } from "react";
import { FaAngleDown } from "react-icons/fa";

interface QA {
    question: string;
    answer: string;
};


export default function FAQ() {
    return (
        <div className="w-full flex flex-col items-center py-20">
            <div className="w-2/3 flex flex-col items-center">
                <div className="text-indigo-600 dark:text-gray-100 font-semibold text-xl py-4 uppercase">Frequently Asked Questions:</div>
                <div className="w-11/12 bg-indigo-100 dark:bg-gray-700 flex flex-col items-center rounded-lg py-4">
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

interface QuestionProps {
    question: QA
};

function Question({ question }: QuestionProps) {
    const [is_open, setIsOpen] = useState(false);

    function toggle() {
        setIsOpen(state => !state);
    }

    return (
        <div className="w-11/12 flex flex-col items-center bg-indigo-200 dark:bg-gray-800 rounded-lg my-1">
            <div onClick={toggle} className="cursor-pointer w-full px-8 flex flex-row items-center justify-between text-indigo-500 dark:text-white py-4">
                <div className="">{question.question}</div>
                <div><FaAngleDown /></div>
            </div>
            <div className={"w-full px-8 py-2 text-indigo-400 dark:text-indigo-50 text-sm dark:bg-gray-900 rounded-b-lg" + (is_open ? "" : " hidden")}>{question.answer}</div>
        </div>

    )
}

const questions: QA[] = [
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