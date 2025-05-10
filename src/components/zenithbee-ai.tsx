import { useState, useEffect, useRef } from "react";
import { Power, Send, X, Minimize } from "lucide-react";
import { FaRobot } from "react-icons/fa";
import { zenithAI } from "../actions/zenith-ai";
import { Messages } from "../utils/types";
import ReactMarkdown from "react-markdown";
import ProductCardChat from "./product-card-chat";
import LoadingDots from "./loading-ai";
import ReservedCardChat from "./reserved-card-chat";

export default function ZenithBeeChatBot() {
  const userId = JSON.parse(localStorage.getItem("id") as string);
  const [isPowerOn, setIsPowerOn] = useState(false);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [messages, setMessages] = useState<Messages[]>([
    {
      role: "assistant",
      content: "How can I assist you today?",
      product: null,
      reserved: null,
    },
  ]);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (input.trim()) {
      setMessages((prev) => [
        ...prev,
        {
          role: "user",
          content: input,
        },
      ]);

      setIsLoading(true);
      setInput("");

      try {
        const response = await zenithAI({ input, userId });
        console.log(response);

        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            {
              role: "assistant",
              content: response.message,
              product: response.product,
              reserved: response.reserved,
            },
          ]);
          setIsLoading(false);
        }, 500);
      } catch (error) {
        console.error("Error getting response:", error);

        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: "Sorry, I encountered an error. Please try again.",
            product: null,
          },
        ]);
        setIsLoading(false);
      }
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
    <div
      className={`${isPowerOn ? "fixed inset-0 z-50 flex flex-col" : "sticky top-0 z-20 w-full"}`}
    >
      {/* Header */}
      <div className="bg-primary-color dark:bg-primary-dark-color flex w-full items-center justify-between gap-1 rounded-t-md p-5 shadow-md shadow-black/20">
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
            {isPowerOn ? (
              <Minimize size={20} className="text-white" />
            ) : (
              <Power size={20} className="text-white" />
            )}
          </button>
        </div>
      </div>

      {isPowerOn && (
        <div className="bg-secondary-color dark:bg-secondary-dark-color flex flex-1 flex-col overflow-hidden rounded-b-md shadow-lg">
          {/* Chat Messages */}
          <div
            ref={messagesContainerRef}
            className="bg-secondary-color dark:bg-primary-dark-color/55 flex-1 overflow-y-auto p-4"
          >
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className="max-w-3/4">
                    <div
                      className={`rounded-lg px-4 py-2 ${
                        message.role === "user"
                          ? "bg-blue-600 text-white"
                          : "bg-gray-200 text-gray-800"
                      }`}
                    >
                      <ReactMarkdown>{message.content}</ReactMarkdown>
                    </div>

                    {message.role === "assistant" &&
                      message.product &&
                      message.product.length > 0 && (
                        <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                          {message.product.map((prod) => (
                            <ProductCardChat key={prod.$id} product={prod} />
                          ))}
                        </div>
                      )}

                    {message.role === "assistant" &&
                      message.reserved &&
                      message.reserved.length > 0 && (
                        <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                          {message.reserved.map((res) => (
                            <ReservedCardChat key={res.$id} reserved={res} />
                          ))}
                        </div>
                      )}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="rounded-lg bg-gray-200 px-4 py-2 text-gray-800">
                    <LoadingDots />
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="bg-primary-color dark:bg-primary-dark-color border-t border-gray-200 p-4">
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Type your message..."
                  className="focus:ring-black-500 w-full resize-none rounded-md border border-gray-300 p-3 pr-10 focus:outline-none"
                  rows={1}
                  disabled={isLoading}
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
                disabled={!input.trim() || isLoading}
                className={`rounded-md p-3 ${
                  input.trim() && !isLoading
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
