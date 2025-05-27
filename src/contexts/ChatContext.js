import React, { createContext, useContext, useState } from 'react';

const ChatContext = createContext();

export const useChat = () => {
    const context = useContext(ChatContext);
    if (!context) {
        throw new Error('useChat must be used within a ChatProvider');
    }
    return context;
};

export const ChatProvider = ({ children }) => {
    const [chats, setChats] = useState({
        'work-experience': {
            id: 'work-experience',
            title: 'Work experience',
            messages: [
                {
                    id: 1,
                    type: 'assistant',
                    content: "I have practical experience as a Software Engineer Intern at NetCoro, where I automated large scale network device configuration, resolved production authentication issues, and wrote onboarding documentation. I have also led several personal projects, including an LLM powered resume builder, a high throughput CS2 skin marketplace, a computer vision tool for estimating food waste, and a mentorship chatbot platform. These experiences show my ability to deliver production ready code, optimize performance, and apply machine learning across cloud based systems.\n\nAsk me more and I will be happy to dive deeper!",
                    timestamp: new Date().toISOString()
                }
            ]
        },
        'projects': {
            id: 'projects',
            title: 'Projects',
            messages: [
                {
                    id: 1,
                    type: 'assistant',
                    content: "My projects show how I combine machine learning with scalable cloud systems to solve real problems. I created Resumate, an AI agent that reads job posts and crafts tailored resumes that raise interview response rates, and 2m, a high-throughput CS2 skin marketplace that handles tens of thousands of price requests each second. I also built Ecobite, a computer-vision tool that estimates food waste from images, and Mai, a mentorship chatbot that pairs learners with experts using a fine-tuned large language model.\n\nAsk me more and I’ll be glad to dive deeper!",
                    timestamp: new Date().toISOString()
                }
            ]
        },
        'skills': {
            id: 'skills',
            title: 'Skills',
            messages: [
                {
                    id: 1,
                    type: 'assistant',
                    content: "I work fluently in Python, TypeScript, JavaScript, C plus plus, Java, SQL, and C sharp. I build models with TensorFlow and Scikit Learn, integrate large language models with OpenAI and Gemini, and ship full stack apps using React, MongoDB, and PostgreSQL. My toolkit also includes Git, Docker, Kubernetes, and cloud services on AWS and Google Cloud Platform, all running on Linux.\n\nAsk me more and I’ll be glad to dive deeper!",
                    timestamp: new Date().toISOString()
                }
            ]
        }
    });

    const [currentChatId, setCurrentChatId] = useState(null);
    const [messageIdCounter, setMessageIdCounter] = useState(2);

    const addMessage = (chatId, message) => {
        setChats(prev => ({
            ...prev,
            [chatId]: {
                ...prev[chatId],
                messages: [
                    ...prev[chatId].messages,
                    {
                        id: messageIdCounter,
                        ...message,
                        timestamp: new Date().toISOString()
                    }
                ]
            }
        }));
        setMessageIdCounter(prev => prev + 1);
    };

    const switchChat = (chatId) => {
        setCurrentChatId(chatId);
    };

    const getCurrentChat = () => {
        return currentChatId ? chats[currentChatId] : null;
    };

    const value = {
        chats,
        currentChatId,
        addMessage,
        switchChat,
        getCurrentChat
    };

    return (
        <ChatContext.Provider value={value}>
            {children}
        </ChatContext.Provider>
    );
}; 