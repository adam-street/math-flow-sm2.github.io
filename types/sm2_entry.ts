import { IMathOperation } from "./math_operation";

export interface ISM2Entry {
    id: string,

    // repetition number - the number of times the card has been successfully recalled
    n: number;
    //  easiness factor - a measure of how easy it is for the user to recall the card
    "ef": number,
    // inter-repetition - the number of days between reviews
    "i": number,
    "last_review": number | null,
    "values": number[],
    "operation": IMathOperation
}