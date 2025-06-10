import { PiSelection } from "react-icons/pi";
import { useState } from "react";
import { useChat } from '../contexts/ChatContext';

function Ask() {
    const [text, setText] = useState("");
    const [isTransitioning, setIsTransitioning] = useState(false);
    const { currentChatId, addMessage, getCurrentChat } = useChat();

    const handleTextChange = (e) => {
        const newText = e.target.value;
        const currentHasText = newText.length > 0;
        const prevHasText = text.length > 0;
        
        if (currentHasText !== prevHasText) {
            setIsTransitioning(true);
            setTimeout(() => {
                setText(newText);
                setTimeout(() => {
                    setIsTransitioning(false);
                }, 50);
            }, 50);
        } else {
            setText(newText);
        }
        
        e.target.style.height = 'auto';
        e.target.style.height = Math.min(e.target.scrollHeight, 300) + 'px';
    };

    const handleSendMessage = async () => {
        if (!text.trim() || !currentChatId) return;
        
        const userMessage = text.trim();
        
        // Add user message immediately
        addMessage(currentChatId, {
            type: 'user',
            content: userMessage
        });
        
        // Clear the input
        setText("");
        
        // Reset textarea height
        const textarea = document.querySelector('textarea');
        if (textarea) {
            textarea.style.height = 'auto';
        }
        
        try {
            // Get current chat history for the API call
            const currentChat = getCurrentChat();
            const history = currentChat ? currentChat.messages : [];
            
            // Determine API URL based on environment
            const apiUrl = process.env.NODE_ENV === 'development' 
                ? 'http://localhost:3001/api/v1/ai/chat'
                : 'https://portfoliobackend-np5j.onrender.com/api/v1/ai/chat';
            
            // Make API call to backend
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    history: history,
                    query: userMessage
                })
            });
            
            const data = await response.json();
            
            if (data.success) {
                // Add AI response to chat
                addMessage(currentChatId, {
                    type: 'assistant',
                    content: data.response
                });
            } else {
                // Handle error response
                addMessage(currentChatId, {
                    type: 'assistant',
                    content: `Sorry, I encountered an error: ${data.response}`
                });
            }
        } catch (error) {
            // Handle network or other errors
            addMessage(currentChatId, {
                type: 'assistant',
                content: `Sorry, I'm having trouble connecting to the server. Please try again later.`
            });
            console.error('Error calling AI chat API:', error);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <>
        <div className="flex flex-col w-full min-h-[150px]">
            <div className="flex flex-col h-full p-4">
                <div className="flex flex-col h-full bg-[#F2F2F2] rounded-2xl">
                    <div className="flex flex-col h-full ml-6 justify-center">
                        <div className="flex text-[#5E5E5E] mb-6">
                            <textarea
                                value={text}
                                onChange={handleTextChange}
                                onKeyPress={handleKeyPress}
                                placeholder="Ask anything"
                                className="w-full text-[#000] bg-transparent outline-none resize-none overflow-y-auto max-h-[300px] placeholder-[#5E5E5E]"
                                rows={1}
                                style={{ height: 'auto' }}
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <div className="mr-2 cursor-pointer">
                                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="" class="icon-md"><path d="M8.25 15.75V9.75H2.25C1.83579 9.75 1.5 9.41421 1.5 9C1.5 8.58579 1.83579 8.25 2.25 8.25H8.25V2.25C8.25 1.83579 8.58579 1.5 9 1.5C9.41421 1.5 9.75 1.83579 9.75 2.25V8.25H15.75L15.8271 8.25391C16.2051 8.29253 16.5 8.61183 16.5 9C16.5 9.38817 16.2051 9.70747 15.8271 9.74609L15.75 9.75H9.75V15.75C9.75 16.1642 9.41421 16.5 9 16.5C8.58579 16.5 8.25 16.1642 8.25 15.75Z" fill="currentColor"></path></svg>
                                </div>
                                <div className="mr-2 cursor-pointer">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="h-[18px] w-[18px]"><path fill-rule="evenodd" clip-rule="evenodd" d="M2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM11.9851 4.00291C11.9933 4.00046 11.9982 4.00006 11.9996 4C12.001 4.00006 12.0067 4.00046 12.0149 4.00291C12.0256 4.00615 12.047 4.01416 12.079 4.03356C12.2092 4.11248 12.4258 4.32444 12.675 4.77696C12.9161 5.21453 13.1479 5.8046 13.3486 6.53263C13.6852 7.75315 13.9156 9.29169 13.981 11H10.019C10.0844 9.29169 10.3148 7.75315 10.6514 6.53263C10.8521 5.8046 11.0839 5.21453 11.325 4.77696C11.5742 4.32444 11.7908 4.11248 11.921 4.03356C11.953 4.01416 11.9744 4.00615 11.9851 4.00291ZM8.01766 11C8.08396 9.13314 8.33431 7.41167 8.72334 6.00094C8.87366 5.45584 9.04762 4.94639 9.24523 4.48694C6.48462 5.49946 4.43722 7.9901 4.06189 11H8.01766ZM4.06189 13H8.01766C8.09487 15.1737 8.42177 17.1555 8.93 18.6802C9.02641 18.9694 9.13134 19.2483 9.24522 19.5131C6.48461 18.5005 4.43722 16.0099 4.06189 13ZM10.019 13H13.981C13.9045 14.9972 13.6027 16.7574 13.1726 18.0477C12.9206 18.8038 12.6425 19.3436 12.3823 19.6737C12.2545 19.8359 12.1506 19.9225 12.0814 19.9649C12.0485 19.9852 12.0264 19.9935 12.0153 19.9969C12.0049 20.0001 11.9999 20 11.9999 20C11.9999 20 11.9948 20 11.9847 19.9969C11.9736 19.9935 11.9515 19.9852 11.9186 19.9649C11.8494 19.9225 11.7455 19.8359 11.6177 19.6737C11.3575 19.3436 11.0794 18.8038 10.8274 18.0477C10.3973 16.7574 10.0955 14.9972 10.019 13ZM15.9823 13C15.9051 15.1737 15.5782 17.1555 15.07 18.6802C14.9736 18.9694 14.8687 19.2483 14.7548 19.5131C17.5154 18.5005 19.5628 16.0099 19.9381 13H15.9823ZM19.9381 11C19.5628 7.99009 17.5154 5.49946 14.7548 4.48694C14.9524 4.94639 15.1263 5.45584 15.2767 6.00094C15.6657 7.41167 15.916 9.13314 15.9823 11H19.9381Z" fill="currentColor"></path></svg>
                                </div>
                                <div className="mr-2 cursor-pointer">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="h-[18px] w-[18px]"><path fill-rule="evenodd" clip-rule="evenodd" d="M12.47 15.652a1 1 0 0 1 1.378.318l2.5 4a1 1 0 1 1-1.696 1.06l-2.5-4a1 1 0 0 1 .318-1.378Z" fill="currentColor"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M11.53 15.652a1 1 0 0 1 .318 1.378l-2.5 4a1 1 0 0 1-1.696-1.06l2.5-4a1 1 0 0 1 1.378-.318ZM17.824 4.346a.5.5 0 0 0-.63-.321l-.951.309a1 1 0 0 0-.642 1.26l1.545 4.755a1 1 0 0 0 1.26.642l.95-.309a.5.5 0 0 0 .322-.63l-1.854-5.706Zm-1.248-2.223a2.5 2.5 0 0 1 3.15 1.605l1.854 5.706a2.5 2.5 0 0 1-1.605 3.15l-.951.31a2.992 2.992 0 0 1-2.443-.265l-2.02.569a1 1 0 1 1-.541-1.926l1.212-.34-1.353-4.163L5 10.46a1 1 0 0 0-.567 1.233l.381 1.171a1 1 0 0 0 1.222.654l3.127-.88a1 1 0 1 1 .541 1.926l-3.127.88a3 3 0 0 1-3.665-1.961l-.38-1.172a3 3 0 0 1 1.7-3.697l9.374-3.897a3 3 0 0 1 2.02-2.285l.95-.31Z" fill="currentColor"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M12 12.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3ZM8.5 14a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0Z" fill="currentColor"></path></svg>
                                </div>
                                <div className="mr-2 cursor-pointer">
                                    <PiSelection />
                                </div>
                            </div>
                            <div className="flex items-center mr-5">
                                <div className="mr-2 cursor-pointer">
                                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="" class="h-[18px] w-[18px]" font-size="inherit"><path d="M11.165 4.41699C11.165 3.22048 10.1955 2.25018 8.99902 2.25C7.80241 2.25 6.83203 3.22038 6.83203 4.41699V8.16699C6.83221 9.36346 7.80252 10.333 8.99902 10.333C10.1954 10.3328 11.1649 9.36335 11.165 8.16699V4.41699ZM12.665 8.16699C12.6649 10.1918 11.0238 11.8328 8.99902 11.833C6.97409 11.833 5.33221 10.1919 5.33203 8.16699V4.41699C5.33203 2.39195 6.97398 0.75 8.99902 0.75C11.0239 0.750176 12.665 2.39206 12.665 4.41699V8.16699Z" fill="currentColor"></path><path d="M14.8058 9.11426C14.4089 8.99623 13.9915 9.22244 13.8732 9.61914C13.2481 11.7194 11.3018 13.25 9.00011 13.25C6.69845 13.25 4.75214 11.7194 4.12706 9.61914C4.00876 9.22245 3.59126 8.99626 3.19444 9.11426C2.79744 9.23241 2.57141 9.65085 2.68956 10.0479C3.43005 12.5353 5.60114 14.4067 8.25011 14.707V15.75H6.91612C6.50191 15.75 6.16612 16.0858 6.16612 16.5C6.16612 16.9142 6.50191 17.25 6.91612 17.25H11.0831L11.1593 17.2461C11.5376 17.2078 11.8331 16.8884 11.8331 16.5C11.8331 16.1116 11.5376 15.7922 11.1593 15.7539L11.0831 15.75H9.75011V14.707C12.3991 14.4066 14.5702 12.5353 15.3107 10.0479C15.4288 9.65085 15.2028 9.23241 14.8058 9.11426Z" fill="currentColor"></path></svg>
                                </div>
                                <div>
                                    <div 
                                        className={`text-white bg-[#000] rounded-full p-1 transition-transform duration-50 ease-in-out cursor-pointer ${
                                            isTransitioning ? 'scale-0' : 'scale-100'
                                        }`}
                                        onClick={handleSendMessage}
                                    >
                                        {text ? (
                                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon-md">
                                                <path d="M7.99992 14.9993V5.41334L4.70696 8.70631C4.31643 9.09683 3.68342 9.09683 3.29289 8.70631C2.90237 8.31578 2.90237 7.68277 3.29289 7.29225L8.29289 2.29225L8.36906 2.22389C8.76184 1.90354 9.34084 1.92613 9.70696 2.29225L14.707 7.29225L14.7753 7.36842C15.0957 7.76119 15.0731 8.34019 14.707 8.70631C14.3408 9.07242 13.7618 9.09502 13.3691 8.77467L13.2929 8.70631L9.99992 5.41334V14.9993C9.99992 15.5516 9.55221 15.9993 8.99992 15.9993C8.44764 15.9993 7.99993 15.5516 7.99992 14.9993Z" fill="currentColor"/>
                                            </svg>
                                        ) : (
                                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon-md">
                                                <path d="M5.66699 14.4165V3.5835C5.66699 2.89314 6.22664 2.3335 6.91699 2.3335C7.6072 2.33367 8.16699 2.89325 8.16699 3.5835V14.4165C8.16699 15.1068 7.6072 15.6663 6.91699 15.6665C6.22664 15.6665 5.66699 15.1069 5.66699 14.4165ZM9.83301 11.9165V6.0835C9.83301 5.39325 10.3928 4.83367 11.083 4.8335C11.7734 4.8335 12.333 5.39314 12.333 6.0835V11.9165C12.333 12.6069 11.7734 13.1665 11.083 13.1665C10.3928 13.1663 9.83301 12.6068 9.83301 11.9165ZM1.5 10.2505V7.75049C1.5 7.06013 2.05964 6.50049 2.75 6.50049C3.44036 6.50049 4 7.06013 4 7.75049V10.2505C3.99982 10.9407 3.44025 11.5005 2.75 11.5005C2.05975 11.5005 1.50018 10.9407 1.5 10.2505ZM14 10.2505V7.75049C14 7.06013 14.5596 6.50049 15.25 6.50049C15.9404 6.50049 16.5 7.06013 16.5 7.75049V10.2505C16.4998 10.9407 15.9402 11.5005 15.25 11.5005C14.5598 11.5005 14.0002 10.9407 14 10.2505Z" fill="currentColor"/>
                                            </svg>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default Ask;