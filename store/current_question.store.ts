import {ISM2Entry} from "@/types";
import {create} from "zustand";
import {IQuestionCardData} from "@/types/i_question_card_data";
import {SM2ToQuestionCard} from "@/utils/sm2_to_question_card";
import {useSM2Table} from "@/store/sm2.store";

interface ICurrentQuestionStore {
    data: IQuestionCardData | null
    isCorrect: boolean | null
    startTime: Date | null
    timeTakenMS: number | null

    setData: (data: ISM2Entry) => void
    nextQuestion: () => void
    startTimer: () => void
    solve: (input: string) => void
}

export const useCurrentQuestion = create<ICurrentQuestionStore>(
    (set, get) => ({
        data: SM2ToQuestionCard(useSM2Table.getState().getNextReviewCard()),
        isCorrect: null,
        startTime: null,
        timeTakenMS: null,

        setData: (entry) => set({
            data: SM2ToQuestionCard(entry),
            isCorrect: null
        }),
        nextQuestion: () => set({
            data: SM2ToQuestionCard(useSM2Table.getState().getNextReviewCard()),
            isCorrect: null,
            startTime: null,
            timeTakenMS: null,
        }),
        startTimer: () => set({
            startTime: new Date()
        }),
        solve: (input) => {
            const data = get().data;
            if (!data) return

            const startTime = get().startTime
            if(!startTime) return

            const numberInput = Number(input.trim())
            if (Number.isNaN(numberInput)) return

            const timeTakenMS = new Date().getTime() - startTime.getTime()
            const isCorrect = numberInput === data.answer
            set({
                isCorrect,
                timeTakenMS,
            })

            useSM2Table.getState().updateEntry(data.sm2Id, isCorrect, timeTakenMS);
        },
    })
);