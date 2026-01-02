import {ISM2Entry} from "@/types";

export default function ReviewCard({ entry }: { entry: ISM2Entry }) {
    return (
        <div className="card">
            <h2 className="text-xl font-bold">Entry Details</h2>
            <p>Easiness Factor: {entry.ef}</p>
            <button className="btn-primary">Update Entry</button>
        </div>
    )
}