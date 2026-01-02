"use client"
import QuestionCard from "@/app/components/review_card/question_card";
import { useSM2Table } from "@/store/sm2.store";

export default function Home() {
    const questionRemaining = useSM2Table(state => state.getQuestionList().length);
    const resetSM2Table = useSM2Table(state => state.reset);

    return (
        <main className="min-h-screen bg-slate-50 flex flex-col items-center justify-between p-6 md:p-12 font-sans selection:bg-blue-100">

            {/* Top Navigation / Progress Area */}
            <div className="w-full max-w-2xl flex justify-between items-center">
                <div className="flex flex-col">
                    <h1 className="text-xl font-bold text-slate-900 tracking-tight">
                        MathFlow <span className="text-blue-600">SM2</span>
                    </h1>
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
                        Daily Training
                    </p>
                </div>

                <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-2xl shadow-sm border border-slate-200">
                    <div className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                    </div>
                    <span className="text-sm font-bold text-slate-700">
                        {questionRemaining} <span className="text-slate-400 font-medium">due</span>
                    </span>
                </div>
            </div>

            {/* Main Stage */}
            <div className="flex-1 flex items-center justify-center w-full max-w-4xl py-12">
                {questionRemaining > 0 ? (
                    <QuestionCard />
                ) : (
                    <div className="text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <div className="text-6xl mb-4">🎉</div>
                        <h2 className="text-3xl font-black text-slate-900 mb-2">Daily Goal Reached!</h2>
                        <p className="text-slate-500 max-w-xs mx-auto">
                            You&apos;ve mastered your math facts for today. Your memory is being optimized.
                        </p>
                    </div>
                )}
            </div>

            {/* Footer / Utility Area */}
            <div className="w-full max-w-2xl flex justify-center items-center pt-8 border-t border-slate-200">
                <button
                    onClick={() => {
                        if(confirm("Are you sure you want to reset all progress?")) resetSM2Table();
                    }}
                    className="group flex items-center gap-2 text-slate-400 hover:text-red-500 transition-colors text-xs font-bold uppercase tracking-widest"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transform group-hover:rotate-180 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Reset Progress
                </button>
            </div>
        </main>
    );
}