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
                    content: "I'd be happy to help you with information about work experience! What would you like to know?",
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
                    content: "Let's talk about projects! I can help you with project ideas, management, or showcase your work. What interests you?",
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
                    content: "I'm here to help with skills development and assessment! What skills would you like to explore or improve?",
                    timestamp: new Date().toISOString()
                }
            ]
        }
    });

    const [currentChatId, setCurrentChatId] = useState(null);
    const [messageIdCounter, setMessageIdCounter] = useState(2);

    const startNewChat = (userMessage) => {
        const newChatId = `session-${Date.now()}`;
        setChats(prev => ({
            ...prev,
            [newChatId]: {
                id: newChatId,
                title: 'New Chat',
                messages: [{
                    id: messageIdCounter,
                    type: 'user',
                    content: userMessage,
                    timestamp: new Date().toISOString()
                }]
            }
        }));
        setCurrentChatId(newChatId);
        setMessageIdCounter(prev => prev + 1);
        return newChatId;
    };

    const addMessage = (chatId, message) => {
        setChats(prev => {
            // Ensure the chat exists before trying to add a message
            if (!prev[chatId]) {
                console.error(`Chat with id ${chatId} not found.`);
                return prev;
            }
            return {
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
            };
        });
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
        getCurrentChat,
        startNewChat
    };

    return (
        <ChatContext.Provider value={value}>
            {children}
        </ChatContext.Provider>
    );
}; 