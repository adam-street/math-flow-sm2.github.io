"use client"

import {FormEvent, useEffect, useState} from "react";
import {useCurrentQuestion} from "@/store/current_question.store";
import { useSyncExternalStore } from 'react';


const subscribe = () => () => {}; // No-op subscribe
const getSnapshot = () => true;   // Client value
const getServerSnapshot = () => false; // Server value

export function useHasHydrated() {
    return useSyncExternalStore(
        subscribe,
        getSnapshot,
        getServerSnapshot
    );
}

export default function QuestionCard() {
    const hasHydrated = useHasHydrated();

    const data = useCurrentQuestion(state => state.data)
    const nextQuestion = useCurrentQuestion(state => state.nextQuestion)
    const isCorrect = useCurrentQuestion(state => state.isCorrect)
    const timeTaken = useCurrentQuestion(state => state.timeTakenMS)
    const solve = useCurrentQuestion(state => state.solve)
    const startTimer = useCurrentQuestion(state => state.startTimer)

    const [answerValue, setAnswerValue] = useState<string>("")

    useEffect(() => {
        if (hasHydrated && data) {
            startTimer();
        }
    }, [data, startTimer, hasHydrated]);

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setAnswerValue("")
        solve(answerValue)
    }

    if (!hasHydrated || !data) {
        return <div className="card text-black">Loading...</div>
    }

    return (
        <div className={`
    relative flex flex-col items-center justify-center 
    w-full max-w-md mx-auto p-8 rounded-3xl shadow-xl transition-all duration-300
    ${isCorrect === true ? 'bg-green-50 ring-4 ring-green-400' :
            isCorrect === false ? 'bg-red-50 ring-4 ring-red-400' :
                'bg-white border border-slate-200'}
  `}>
            {/* Equation Row */}
            <div className="flex items-center justify-center gap-6 text-7xl font-bold tracking-tight text-slate-800 mb-8">
                <span className="w-20 text-center">{data.x}</span>
                <span className="text-slate-400 text-5xl">{data.operation === '*' ? '×' : data.operation}</span>
                <span className="w-20 text-center">{data.y}</span>
            </div>

            {isCorrect !== null ? (
                <div className="flex flex-col items-center animate-in fade-in zoom-in duration-200">
                    {/* Answer Feedback */}
                    <div className={`text-6xl font-black mb-2 ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                        {data.answer}
                    </div>

                    {/* Meta-Info: Time Taken */}
                    <div className="text-sm font-medium text-slate-400 uppercase tracking-widest mb-6">
                        {timeTaken ? (timeTaken / 1000).toFixed(2) : '0.00'}s
                    </div>

                    <button
                        onClick={nextQuestion}
                        autoFocus
                        className="px-8 py-3 bg-slate-900 text-white rounded-full font-bold hover:bg-slate-800 transform active:scale-95 transition-all shadow-lg"
                    >
                        Next Question
                    </button>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="w-full">
                    <input
                        type="number"
                        step="any"
                        autoFocus
                        value={answerValue}
                        onChange={(e) => setAnswerValue(e.target.value)}
                        className="w-full bg-slate-100 border-none rounded-2xl p-6 text-black text-5xl text-center font-mono focus:ring-4 focus:ring-blue-500 focus:bg-white transition-all outline-none"
                        placeholder="?"
                    />
                    <p className="text-center text-slate-400 mt-4 text-sm font-medium uppercase tracking-widest">
                        Press Enter to Solve
                    </p>
                </form>
            )}
        </div>
    );
}