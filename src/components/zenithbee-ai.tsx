import { useState } from "react";
import { Power, Send, X } from "lucide-react";
import { FaRobot } from "react-icons/fa";

export default function ZenithBeeChatBot() {
  const [isPowerOn, setIsPowerOn] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { role: "system", content: "How can I assist you today?" },
  ]);

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { role: "user", content: input }]);

      // Simulate AI response
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            role: "system",
            content: `Your query was: "${input}"`,
          },
        ]);
      }, 500);

      setInput("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const togglePower = () => {
    setIsPowerOn(!isPowerOn);
  };

  return (
    <div className="sticky top-0 z-[20] w-full">
      {/* Header */}
      <div className="bg-primary-color dark:bg-primary-dark-color flex w-full items-center justify-between gap-1 rounded-md p-5 shadow-md shadow-black/20">
        <div className="flex w-full items-center gap-4">
          <FaRobot size={30} />
          <h1 className="text-lg font-bold">ZenithBee AI</h1>
        </div>

        <div className="flex items-center gap-4">
          <button
            type="button"
            className={`cursor-pointer rounded-full p-2 ${isPowerOn ? "bg-green-500" : "bg-gray-400"} transition-colors hover:opacity-80`}
            onClick={togglePower}
          >
            <Power size={20} className="text-white" />
          </button>
        </div>
      </div>

      {/* Chat Interface - Shows when power is on */}
      {isPowerOn && (
        <div className="bg-secondary-color dark:bg-secondary-dark-color z-20 w-full overflow-hidden rounded-md shadow-lg">
          {/* Chat Messages */}
          <div className="bg-secondary-color dark:bg-primary-dark-color/55 h-64 overflow-y-auto p-4">
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-3/4 rounded-lg px-4 py-2 ${
                      message.role === "user"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-800"
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Input Area */}
          <div className="bg-primary-color dark:bg-primary-dark-color border-t border-gray-200 p-4">
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Type your message..."
                  className="focus:ring-black-500 w-full resize-none rounded-md border border-gray-300 p-3 pr-10 focus:ring-2 focus:outline-none"
                  rows={1}
                />
                {input && (
                  <button
                    onClick={() => setInput("")}
                    className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
                  >
                    <X size={18} />
                  </button>
                )}
              </div>
              <button
                onClick={handleSend}
                disabled={!input.trim()}
                className={`rounded-md p-3 ${
                  input.trim()
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "cursor-not-allowed bg-gray-200 text-gray-400"
                }`}
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
