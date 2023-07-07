import { useEffect, useState } from "react";
import Status_1 from "../../../../components/Status_1";

interface Props {
    status: -1 | 0 | 1;
    onChange?(status: -1 | 0 | 1): void
}

function JobStatus({ onChange, status }: Props) {


    const [statusValue, setStatusValue] = useState(status)

    const handleOnJobStatusClicked = () => {
        switch (statusValue) {
            case -1:
                setStatusValue(0)
                break;

            case 0:
                setStatusValue(1)
                break;

            case 1:
                setStatusValue(-1)
                break;
        }
    }

    useEffect(
        () => {
            if(onChange) onChange(statusValue)
        },
        [statusValue]
    )

    return (
        <div onClick={handleOnJobStatusClicked} className="cursor-pointer select-none">
            <Status_1 status={statusValue} />
        </div>
    )
}

export default JobStatus