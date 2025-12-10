import { forwardRef } from "react";

const ResultModal = forwardRef(function ResultModal({ result, targetTime }, ref) {
    return (<dialog ref={ref} className="result-modal" open>
        <h2> You {result}</h2>
        <p>Target time was <strong>{targetTime} seconds</strong></p>
        <p>You topped the time with <strong>{result} seconds left.</strong></p>
        <form method="dialog">
            <button>Close</button>
        </form>
    </dialog>
    );
}
);

export default ResultModal;

