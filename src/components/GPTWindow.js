import Sidebar from './Sidebar';
import Model from './Model';
import Ask from './Ask';
import Chat from './Chat';
import { ChatProvider } from '../contexts/ChatContext';

function GPTWindow() {
    return (
        <ChatProvider>
            <div className="flex h-screen w-screen">
                <Sidebar />
                <div className="flex flex-col justify-between w-full">
                    <Model />
                    <Chat />
                    <Ask />
                </div>
            </div>
        </ChatProvider>
    )
}

export default GPTWindow;