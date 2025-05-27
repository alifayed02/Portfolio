import { useChat } from '../contexts/ChatContext';
import MessageBubble from './MessageBubble';

function Chat() {
    const { getCurrentChat } = useChat();
    const currentChat = getCurrentChat();

    if (!currentChat) {
        return (
            <div className="flex w-full h-full">
                <div className="flex items-center justify-center w-full h-full">
                    <p className="text-4xl font-bold text-[#000]">What can I help with?</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col w-full h-full overflow-hidden">
            <div className="flex-1 overflow-y-auto px-6 py-4">
                <div className="">
                    {currentChat.messages.map((message) => (
                        <MessageBubble key={message.id} message={message} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Chat;