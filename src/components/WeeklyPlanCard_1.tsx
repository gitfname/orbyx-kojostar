

interface Props {
    is_holiday: boolean;
    day_name: string;
    start_morning_time: string;
    end_morning_time: string;
    start_afternoon_time: string;
    end_afternoon_time: string;
}

function WeeklyPlanCard_1({
    day_name, end_afternoon_time, end_morning_time, is_holiday, start_afternoon_time, start_morning_time
}: Props) {
    return (
        <div className={`flex flex-col gap-y-2 py-4 justify-center border border-blue-500 ${is_holiday ? "bg-blue-500/20" : "bg-white"} rounded-xl`}>
            <p
                className="text-center text-slate-800 text-xs font-[vazirMedium]"
            >
                {day_name}
            </p>
            {
                is_holiday
                    ?
                    <p
                        className="text-center text-slate-800 text-xs font-[vazir]"
                    >
                        تعطیل
                    </p>
                    :
                    <>
                        <p
                            className="text-center text-slate-800 text-xs font-[vazir]"
                        >
                            {start_morning_time} - {end_morning_time}
                        </p>
                        <p
                            className="text-center text-slate-800 text-xs font-[vazir]"
                        >
                            {start_afternoon_time} - {end_afternoon_time}
                        </p>
                    </>
            }
        </div>
    )
}

export default WeeklyPlanCard_1