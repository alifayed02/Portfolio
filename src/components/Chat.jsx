import { useChat } from '../contexts/ChatContext';
import MessageBubble from './MessageBubble';

function Chat() {
    const { getCurrentChat } = useChat();
    const currentChat = getCurrentChat();

    if (!currentChat) {
        return (
            <div className="flex w-full h-full">
                <div className="flex flex-col items-center justify-center w-full h-full ">
                    <div>
                        <p className="text-6xl text-center pb-1 font-semibold bg-gradient-to-r from-[#FF7DCB] to-[#BC84FF] bg-clip-text text-transparent">
                            Hello! I'm Ali Fayed
                        </p>
                        <p className="text-2xl text-right font-medium text-[#737373] mt-5">
                            What would you like to know?
                        </p>
                    </div>
                    <div>
                        <div className="grid grid-cols-3 gap-24 mt-24">
                            <div className="flex justify-left items-center bg-radial bg-radial-[at_10%_0%] from-[#FF7DCB]/30 from-10% to-[#F5F5F5] to-50% w-[20rem] h-[12rem] rounded-lg transition-all duration-300 ease-in-out hover:border-gray-200 hover:shadow-lg cursor-pointer">
                                <div className="flex flex-col mt-10 ml-6">
                                    <p className="text-2xl font-medium">View my Resume</p>
                                    <p className="text-md font-light text-[#737373]">Take a look at my resume as a PDF</p>
                                </div>
                            </div>
                            <div className="flex justify-left items-center bg-radial bg-radial-[at_10%_0%] from-[#FF7DCB]/30 from-10% to-[#F5F5F5] to-50% w-[20rem] h-[12rem] rounded-lg transition-all duration-300 ease-in-out hover:border-gray-200 hover:shadow-lg cursor-pointer">
                                <div className="flex flex-col mt-10 ml-6">
                                    <p className="text-2xl font-medium">My Skills</p>
                                    <p className="text-md font-light text-[#737373]">View my languages & frameworks</p>
                                </div>
                            </div>
                            <div className="flex justify-left items-center bg-radial bg-radial-[at_10%_0%] from-[#FF7DCB]/30 from-10% to-[#F5F5F5] to-50% w-[20rem] h-[12rem] rounded-lg transition-all duration-300 ease-in-out hover:border-gray-200 hover:shadow-lg cursor-pointer">
                                <div className="flex flex-col mt-10 ml-6">
                                    <p className="text-2xl font-medium">My Projects</p>
                                    <p className="text-md font-light text-[#737373]">See projects I've proudly completed</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <>
        <div className="flex flex-col w-full h-full overflow-hidden">
            <div className="flex-1 overflow-y-auto px-6 py-4">
                <div className="">
                    {currentChat.messages.map((message) => (
                        <MessageBubble key={message.id} message={message} />
                    ))}
                </div>
            </div>
        </div>
        </>
    );
}

export default Chat;