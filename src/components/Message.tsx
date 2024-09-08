interface MessageProps {
  text: string;
  isUser: boolean;
}

const Message: React.FC<MessageProps> = ({ text, isUser }) => {
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}>
      <div
        className={`border ${
          isUser
            ? "bg-gray-200 text-black border-gray-800"
            : "bg-gray-100 text-black border-gray-400"
        } p-4 rounded-lg max-w-lg shadow-sm`}
        dangerouslySetInnerHTML={{ __html: text }}
      ></div>
    </div>
  );
};

export default Message;
