interface MessageProps {
  text: string;
  isUser: boolean;
}

const Message: React.FC<MessageProps> = ({ text, isUser }) => {
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}>
      <div
        className={`${
          isUser ? "bg-gray-300 text-black" : "bg-gray-200 text-black"
        } p-3 rounded-lg max-w-xs shadow-sm`}
      >
        {text}
      </div>
    </div>
  );
};

export default Message;
