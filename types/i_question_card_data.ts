import {IMathOperation} from "@/types/index";

export interface IQuestionCardData {
    sm2Id: string,
    x: number,
    y: number,
    operation: IMathOperation,
    answer: number,
}