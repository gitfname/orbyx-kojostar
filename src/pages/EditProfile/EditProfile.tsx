
import { useEffect, useRef, useState } from "react"
import middleware from "./middleware"
import useUserStore from "../../stores/userStore"
import { updateProfile } from "../../utils/http"
import { useApplicationLoadingStore } from "../../stores/useApplicationLoadingStore"
import { AiOutlineEdit } from "react-icons/ai"
import {
    Menu,
    MenuList,
    MenuButton,
    MenuItem
} from "@chakra-ui/react"

interface pickImageProps {
    cb(files: FileList): any
}

function pickImage({ cb }: pickImageProps) {
    const inputFileElem = document.createElement("input");
    inputFileElem.setAttribute("type", "file")
    inputFileElem.click()
    inputFileElem.files
    inputFileElem.addEventListener("change", (e:Event) => {
        const files = (e.target as HTMLInputElement).files
        cb(files)
    })
}


function EditProfile() {

    useEffect(
        () => {
            middleware()
        },
        []
    )

    const fnameRef = useRef<HTMLInputElement>(undefined)
    const lnameRef = useRef<HTMLInputElement>(undefined)
    const usernamRef = useRef<HTMLInputElement>(undefined)
    const setIsLoading = useApplicationLoadingStore(selector => selector.setIsLoading)
    const [
        username, firstname, lastname, avatar,
        set_first_name, set_last_name, set_username, set_avatar
    ] = useUserStore(selector => [
        selector.user.username, selector.user.firstname, selector.user.lastname,
        selector.user.avatar,

        selector.api.set_first_name, selector.api.set_last_name, selector.api.set_username,
        selector.api.set_avatar
    ])
    const [avatarValue, setAvatarValue] = useState<string>(avatar)
    const [avatarFile, setAvatarFile] = useState<File>(undefined)
    

    const onSubmit = () => {
        if (
            fnameRef?.current?.value && lnameRef?.current?.value && usernamRef?.current?.value
        ) {
            setIsLoading(true)
            updateProfile({
                first_name: fnameRef.current.value,
                last_name: lnameRef.current.value,
                username: usernamRef.current.value,
                avatar: avatarFile
            })
                .then(data => {
                    setIsLoading(false)
                    set_first_name(data.data.first_name)
                    set_last_name(data.data.last_name)
                    set_username(data.data.username)
                    set_avatar(data.data.avatar)
                    
                })
                .catch(err => {
                    setIsLoading(false)
                    console.log(err);
                })
        } else {
            alert("fill the fields")
        }
    }

    return (
        <div className="w-full h-screen overflow-y-auto">
            <div className="w-full h-max py-8 px-4">

                <p
                    className="text-lg text-slate-800 font-[iranyekan400]"
                >
                    ویرایش اطلاعات
                </p>

                <div className="space-y-4 mt-12">

                    <div className="grid place-items-center gap-y-2.5 items-center justify-center">

                        <div className="relative">
                            {
                                avatarValue && avatarValue.trim() !== ""
                                    ?
                                    <img
                                        alt="profile picture"
                                        src={avatarValue}
                                        className="w-64 h-64 rounded-full shadow-md shadow-black/10
                                        object-center object-cover"
                                    />
                                    :
                                    <div className="w-64 h-64 rounded-full bg-gray-100 shadow-md shadow-black/5 grid place-items-center">
                                        <p className="text-4xl text-blue-500 font-[iranyekan400]">{firstname[0]}</p>
                                    </div>
                            }
                            {/* <div className="absolute top-0 -right-10 p-1.5 rounded-lg
                            hover:bg-transparent/5 transition-colors duration-200 cursor-pointer">
                                <AiOutlineEdit className="w-6 h-6 fill-emerald-500" /> */}
                            <Menu>
                                <MenuButton
                                    fontSize="sm"
                                    className="absolute top-0 -right-10"
                                    p="8px"
                                    rounded="lg"
                                    _hover={{
                                        bg: "blackAlpha.50"
                                    }}
                                    _expanded={{
                                        bg: "blackAlpha.100"
                                    }}
                                >
                                    <AiOutlineEdit className="w-6 h-6 fill-emerald-500" />
                                </MenuButton>
                                <MenuList
                                    borderColor="blackAlpha.100"
                                >
                                    {
                                        avatarValue
                                            ?
                                            <>
                                                <MenuItem
                                                    onClick={() => {
                                                        pickImage({
                                                            cb(files) {
                                                                setAvatarValue(URL.createObjectURL(files[0]))
                                                                setAvatarFile(files[0])
                                                            },
                                                        });
                                                    }}
                                                    fontFamily="iranyekan300"
                                                    fontSize="0.95rem"
                                                >
                                                    تغییر عکس
                                                </MenuItem>

                                                <MenuItem
                                                    onClick={() => {
                                                        setAvatarValue("")
                                                        setAvatarFile(undefined)
                                                    }}
                                                    fontFamily="iranyekan300"
                                                    fontSize="0.95rem"
                                                    color="red.500"
                                                >
                                                    حذف عکس
                                                </MenuItem>
                                            </>
                                            :
                                            <MenuItem
                                                onClick={() => {
                                                    pickImage({
                                                        cb(files) {
                                                            setAvatarValue(URL.createObjectURL(files[0]))
                                                            setAvatarFile(files[0])
                                                        },
                                                    });
                                                }}
                                                fontFamily="iranyekan300"
                                                fontSize="0.95rem"
                                            >
                                                افزودن عکس
                                            </MenuItem>

                                    }
                                </MenuList>
                            </Menu>
                            {/* {/* </div> */}
                        </div>


                    </div>

                    <div>
                        <p className="text-sm text-blue-500/80 font-[iranyekan400]">نام کاربری</p>
                        <input
                            ref={usernamRef}
                            type="text"
                            className="primary-text-input mt-3"
                            placeholder="نام کاربری را وارد کنید"
                            defaultValue={username}
                        />
                    </div>

                    <div>
                        <p className="text-sm text-blue-500/80 font-[iranyekan400]">نام</p>
                        <input
                            ref={fnameRef}
                            type="text"
                            className="primary-text-input mt-3"
                            placeholder="نامتان را وارد کنید"
                            defaultValue={firstname}
                        />
                    </div>

                    <div>
                        <p className="text-sm text-blue-500/80 font-[iranyekan400]">نام خانوادگی</p>
                        <input
                            ref={lnameRef}
                            type="text"
                            className="primary-text-input mt-3"
                            placeholder="نام خانوادگیتان را وارد کنید"
                            defaultValue={lastname}
                        />
                    </div>

                </div>

                <button onClick={onSubmit} className="primary-btn max-w-xs block mx-auto mt-8">
                    ویرایش
                </button>

            </div>
        </div>
    )
}

export default EditProfile