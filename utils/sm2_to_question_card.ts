import {ISM2Entry} from "@/types";
import {IQuestionCardData} from "@/types/i_question_card_data";
import {calculateMathOperation} from "@/utils/calculate_math_operation";

export function SM2ToQuestionCard(entry: ISM2Entry): IQuestionCardData {
    const sm2Id = entry.id
    const top_index = Math.floor(Math.random() * entry.values.length)
    const bottom_index = 1 - top_index

    const x = entry.values[top_index]
    const y = entry.values[bottom_index]
    const operation = entry.operation
    const answer = calculateMathOperation(x, y, operation)

    return {
        sm2Id,
        x,
        y,
        operation,
        answer
    }
}