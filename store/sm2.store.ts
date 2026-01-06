import {persist} from 'zustand/middleware'
import {ISM2Entry} from '@/types'
import {create} from 'zustand'

import default_state_data from '../public/default-sm2-table.json'

const default_state: Record<string, ISM2Entry> = default_state_data as Record<string, ISM2Entry>;

interface SM2TableStore {
    data: Record<string, ISM2Entry>

    updateEntry: (key: string, is_correct: boolean, time_taken: number) => void
    getNextReviewCard: () => ISM2Entry | null
    getQuestionList: () => ISM2Entry[]
    reset: () => void
}

// https://en.wikipedia.org/wiki/SuperMemo - this has been modified slightly from the original SM-2 Algorithm
export const useSM2Table = create<SM2TableStore>()(
    persist(
        (set, get) => ({
            data: default_state,

            updateEntry: (key, isCorrect, timeTakenMS) => {
                const record = get().data
                const entry = {...record[key]}
                if (!entry) return

                entry.last_review = new Date().getTime()

                // 1. Determine Quality (q) 0-3
                let q = 0;
                if (isCorrect) {
                    if (timeTakenMS < 2500) q = 3;      // Perfect
                    else if (timeTakenMS < 5000) q = 2; // Hesitation
                    else q = 1;                         // Significant effort
                }

                // 2. Update Ease Factor (EF)
                entry.ef = entry.ef + (0.1 - (3 - q) * (0.08 + (3 - q) * 0.02));
                if (entry.ef < 1.3) entry.ef = 1.3;

                // 3. Update Interval (I)
                if (!isCorrect) {
                    entry.i = 0;
                    entry.n = 0;
                } else {
                    switch (entry.n) {
                        case 0: entry.i = 1; break;
                        case 1: entry.i = 3; break
                        default:  entry.i = Math.round(entry.i * entry.ef); break
                    }
                    entry.n += 1;
                }
                set({ data: {...record, [key]: entry}})
            },
            getQuestionList: () => {
                const now = new Date().getTime();
                const dayInMS = 24 * 60 * 60 * 1000;

                return Object.values(get().data).filter(entry => {
                    if (!entry.last_review) return true
                    return now >= entry.last_review + (entry.i * dayInMS)
                })
            },
            getNextReviewCard: () => {
                const questionList = get().getQuestionList()
                if (questionList.length === 0) {
                    return null
                }
                return questionList[Math.floor(Math.random() * questionList.length)]
            },
            reset: () => set({data: default_state})
        }),
        {
            name: 'sm2-storage',
        }
    )
)