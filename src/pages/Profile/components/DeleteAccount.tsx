import { RxExit } from "react-icons/rx"
import Card_2 from "../../../components/Card_2"
import Modal_2 from "../../../components/Modal_2"
import { useRef } from "react"


interface Props {
    logOut(): void
}

function DeleteAccount({ logOut }: Props) {

    const CloseModalRef = useRef(undefined);

    return (
        <Modal_2
            title="توجه !"
            showCloseIcon={true}
            close={closeFn => {
                CloseModalRef.current = closeFn
            }}
            modalBody={<>
                <div className="w-full">
                    <p className="text-sm">
                        آیا واقعا میخواهید اکانتتان را حذف کنید ؟
                    </p>

                    <div className="mt-8 pb-3 flex gap-x-3 w-full items-center max-w-xs mx-auto">
                        <button
                            onClick={logOut}
                            className="primary-btn text-gray-50 bg-rose-500 py-2.5"
                        >
                            بله
                        </button>

                        <button
                            onClick={() => CloseModalRef.current&&CloseModalRef.current()}
                            className="primary-btn py-2.5"
                        >
                            لغو
                        </button>
                    </div>
                </div>
            </>}
        >
            <Card_2
                title="خروج"
                titleIcon={<RxExit className="w-5 h-5 text-rose-500" />}
                onClick={undefined}
                textClassName="!text-rose-500"
            />
        </Modal_2>
    )
}

export default DeleteAccount