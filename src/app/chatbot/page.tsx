"use client";
import { useState, useEffect, useRef } from "react";
import InputField from "@/components/InputField";
import Button from "@/components/Button";
import Message from "@/components/Message";
import axios from "axios";

interface MessageData {
  sender: "bot" | "user";
  text: string;
}

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<MessageData[]>([
    {
      sender: "bot",
      text: "Hello, welcome to FirstCheque bot. How can I help you today? 🤖",
    },
  ]);
  const [input, setInput] = useState<string>("");

  const bottomRef = useRef<HTMLDivElement | null>(null);

  const formatMessageToHTML = (message: string) => {
    return message
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em>$1</em>")
      .replace(/(?:\r\n|\r|\n)/g, "<br>");
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: "user", text: input },
    ]);

    setInput("");

    try {
      const response = await axios.post("http://127.0.0.1:8000/chat", {
        input_text: input,
      });

      const formattedResponse = formatMessageToHTML(response.data.response);

      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "bot", text: formattedResponse },
      ]);
    } catch (error) {
      console.error("Error fetching chatbot response:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          sender: "bot",
          text: "Oops! Something went wrong. Please try again later.",
        },
      ]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (e.shiftKey) {
        return;
      }
      e.preventDefault();
      handleSendMessage();
    }
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="relative flex flex-col h-screen w-full text-black bg-white">
      <main className="flex-grow p-6 overflow-y-auto">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <Message
              key={index}
              text={message.text}
              isUser={message.sender === "user"}
            />
          ))}
          <div ref={bottomRef}></div>
        </div>
      </main>

      <footer className="bg-white p-4 flex items-center border-t border-gray-300">
        <div className="flex w-full max-w-3xl mx-auto">
          <InputField
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            className="mr-2 flex-grow"
          />
          <Button onClick={handleSendMessage} text="Send" />
        </div>
      </footer>

      <Button
        onClick={() => {
          window.location.href = "/chatbot";
        }}
        text="Restart Chatbot"
        className="absolute bottom-4 left-4 bg-green-900"
      />

      <Button
        onClick={() => {
          window.location.href = "/";
        }}
        text="Exit Chatbot"
        className="absolute bottom-4 right-4 bg-red-900"
      />
    </div>
  );
};

export default Chat;
