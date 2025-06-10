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
            messages: [{ id: 1, type: 'assistant', content: "I'd be happy to help with your work experience questions!", timestamp: new Date().toISOString() }],
            isLoading: false
        },
        'projects': {
            id: 'projects',
            title: 'Projects',
            messages: [{ id: 1, type: 'assistant', content: "Let's talk about projects! What would you like to know?", timestamp: new Date().toISOString() }],
            isLoading: false
        },
        'skills': {
            id: 'skills',
            title: 'Skills',
            messages: [{ id: 1, type: 'assistant', content: "I'm here to help with skills. What would you like to explore?", timestamp: new Date().toISOString() }],
            isLoading: false
        }
    });

    const [currentChatId, setCurrentChatId] = useState(null);
    const [messageIdCounter, setMessageIdCounter] = useState(2);

    const setChatLoading = (chatId, isLoading) => {
        setChats(prev => {
            if (!prev[chatId]) return prev;
            return {
                ...prev,
                [chatId]: { ...prev[chatId], isLoading }
            };
        });
    };

    const startNewChat = (userMessage) => {
        const newChatId = `session-${Date.now()}`;
        setChats(prev => ({
            ...prev,
            [newChatId]: {
                id: newChatId,
                title: 'New Chat',
                messages: [{ id: messageIdCounter, type: 'user', content: userMessage, timestamp: new Date().toISOString() }],
                isLoading: false
            }
        }));
        setCurrentChatId(newChatId);
        setMessageIdCounter(prev => prev + 1);
        return newChatId;
    };

    const addMessage = (chatId, message) => {
        setChats(prev => {
            if (!prev[chatId]) {
                console.error(`Chat with id ${chatId} not found.`);
                return prev;
            }
            return {
                ...prev,
                [chatId]: {
                    ...prev[chatId],
                    messages: [ ...prev[chatId].messages, { id: messageIdCounter, ...message, timestamp: new Date().toISOString() }]
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
        startNewChat,
        setChatLoading
    };

    return (
        <ChatContext.Provider value={value}>
            {children}
        </ChatContext.Provider>
    );
}; 