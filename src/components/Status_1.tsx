
interface Props {
    status: -1 | 0 | 1;
    text?: {
        notAccepted?: string;
        waiting?: string;
        accepted?: string;
    }
}

function Status_1({
    status,
    text={
        accepted: "تایید شده",
        notAccepted: "تایید نشده",
        waiting: "در انتظار تایید"
    }
}: Props) {

    let statusText = ""
    let style = ""
    switch (status) {
        case -1:
            statusText = text.notAccepted
            style = "text-rose-700 border-rose-300 bg-rose-500/25"
        break;

        case 0:
            statusText = text.waiting
            style = "text-yellow-700 border-yellow-300 bg-yellow-500/25"
        break;

        case 1:
            statusText = text.accepted
            style = "text-emerald-700 border-emerald-300 bg-emerald-500/25"
        break;

        default:
            statusText = text.waiting
        break;
    }



    return (
        <p
            className={
                `text-xs font-[vazir] rounded-lg py-1 px-2.5 border ${style}`
            }
        >
            {statusText}
        </p>
    )
}

export default Status_1