import { GoDotFill } from "react-icons/go";

function LoadingIndicator() {
    return (
        <div className="flex items-center space-x-1 p-2rounded-full">
            <GoDotFill className="animate-pulse-size" style={{ animationDelay: '0s' }} />
        </div>
    );
}

export default LoadingIndicator; 