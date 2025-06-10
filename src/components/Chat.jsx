import { useChat } from '../contexts/ChatContext';
import MessageBubble from './MessageBubble';

function Chat() {
    const { getCurrentChat, addMessage, startNewChat } = useChat();
    const currentChat = getCurrentChat();

    const handleCardClick = async (userMessage) => {
        const newChatId = startNewChat(userMessage);

        try {
            const apiUrl = process.env.NODE_ENV === 'development'
                ? 'http://localhost:3001/api/v1/ai/chat'
                : 'https://portfoliobackend-np5j.onrender.com/api/v1/ai/chat';

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    history: [{ type: 'user', content: userMessage }],
                    query: userMessage,
                }),
            });

            const data = await response.json();

            if (data.success) {
                addMessage(newChatId, {
                    type: 'assistant',
                    content: data.response,
                });
            } else {
                addMessage(newChatId, {
                    type: 'assistant',
                    content: `Sorry, I encountered an error: ${data.response}`,
                });
            }
        } catch (error) {
            addMessage(newChatId, {
                type: 'assistant',
                content: `Sorry, I'm having trouble connecting to the server. Please try again later.`,
            });
            console.error('Error calling AI chat API:', error);
        }
    };

    const handleResumeClick = () => {
        const newChatId = startNewChat("Can I see your resume?");
        addMessage(newChatId, {
            type: 'assistant_with_pdf',
            text: "Sure! Here is my resume. Ask any questions you may have.",
            pdf: '/Resume.pdf'
        });
    };

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
                            <div 
                                className="flex justify-left items-center bg-radial bg-radial-[at_10%_0%] from-[#FF7DCB]/30 from-10% to-[#F5F5F5] to-50% w-[20rem] h-[12rem] rounded-lg transition-all duration-300 ease-in-out hover:border-gray-200 hover:shadow-lg cursor-pointer"
                                onClick={handleResumeClick}
                            >
                                <div className="flex flex-col mt-10 ml-6">
                                    <p className="text-2xl font-medium">View my Resume</p>
                                    <p className="text-md font-light text-[#737373]">Take a look at my resume as a PDF</p>
                                </div>
                            </div>
                            <div 
                                className="flex justify-left items-center bg-radial bg-radial-[at_10%_0%] from-[#FF7DCB]/30 from-10% to-[#F5F5F5] to-50% w-[20rem] h-[12rem] rounded-lg transition-all duration-300 ease-in-out hover:border-gray-200 hover:shadow-lg cursor-pointer"
                                onClick={() => handleCardClick("what are your skills?")}
                            >
                                <div className="flex flex-col mt-10 ml-6">
                                    <p className="text-2xl font-medium">My Skills</p>
                                    <p className="text-md font-light text-[#737373]">View my languages & frameworks</p>
                                </div>
                            </div>
                            <div 
                                className="flex justify-left items-center bg-radial bg-radial-[at_10%_0%] from-[#FF7DCB]/30 from-10% to-[#F5F5F5] to-50% w-[20rem] h-[12rem] rounded-lg transition-all duration-300 ease-in-out hover:border-gray-200 hover:shadow-lg cursor-pointer"
                                onClick={() => handleCardClick("what are your recent projects?")}
                            >
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