import { IMathOperation } from "./math_operation";

export interface ISM2Entry {
    n: number; // repetition number - the number of times the card has been successfully recalled
    "ef": number, //  easiness factor - a measure of how easy it is for the user to recall the card
    "i": number, // inter-repetition - the number of days between reviews
    "last_review": Date | null,
    "values": number[],
    "operation": IMathOperation
}