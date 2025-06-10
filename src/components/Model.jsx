import { LuUpload } from "react-icons/lu";
import { GrNewWindow } from "react-icons/gr";

function Model() {
    return (
        <>
        <div className="flex items-center bg-[#F2F2F2] w-full max-h-[75px] h-[75px]">
            <div className="flex justify-between items-center w-full ml-5 mr-5">
                <div className="flex">
                    <p className="text-xl">ChatGPT</p>
                    <p className="text-xl ml-2 text-[#818181]">4o</p>
                </div>
                <div className="flex">
                    <LuUpload className="w-5 h-5 text-[#818181] mr-5 cursor-pointer hover:text-black" />
                    <GrNewWindow className="w-5 h-5 mr-5 cursor-pointer" />
                </div>
            </div>
        </div>
        </>
    )
}

export default Model;