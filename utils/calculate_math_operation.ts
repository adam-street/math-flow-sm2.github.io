import {IMathOperation} from "@/types";

export function calculateMathOperation(x: number, y: number, operation: IMathOperation) {
    switch (operation) {
        case IMathOperation.MULTIPLICATION:
            return x * y
    }
}