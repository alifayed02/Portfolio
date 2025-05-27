import Sidebar from './Sidebar';
import Model from './Model';
import Ask from './Ask';

function GPTWindow() {
    return (
        <div className="flex h-screen w-screen">
            <Sidebar />
            <div className="flex flex-col justify-between w-full">
                <Model />
                <Ask />
            </div>
        </div>
    )
}

export default GPTWindow;