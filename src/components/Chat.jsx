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
                            <div className="bg-radial from-pink-400 from-40% to-fuchsia-700 p-24 pl-32 pr-32 rounded-lg">
                                View Resume
                            </div>
                            <div className="bg-gradient-to-tr from-[#F5F5F5] from-70% to-[#FF7DCB] p-24 pl-32 pr-32 rounded-lg">
                                My Skills
                            </div>
                            <div className="bg-gradient-to-tr from-[#F5F5F5] from-70% to-[#FF7DCB] p-24 pl-32 pr-32 rounded-lg">
                                My Projects
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