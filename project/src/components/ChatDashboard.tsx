import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { MessageSquare, PenLine, List, ChevronDown, ThumbsUp, ThumbsDown, MoreVertical, Send, ArrowUp } from "lucide-react";

interface ChatMessage {
  id: string;
  text: string;
  timestamp: string;
  isBot: boolean;
}

interface ChatHistory {
  id: string;
  title: string;
  timestamp: string;
}

const ChatDashboard = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '1', text: 'This is an AI Based Chatbot.', timestamp: '02:25', isBot: true }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isExpanded, setIsExpanded] = useState(true);

  const todayHistory: ChatHistory[] = [
    { id: '1', title: 'How to be a better person?', timestamp: 'Today' },
    { id: '2', title: 'How to get rich from youtube as an influen...', timestamp: 'Today' },
    { id: '3', title: 'REACT NEXTJS Tutorial', timestamp: 'Today' }
  ];

  const previousHistory: ChatHistory[] = [
    { id: '4', title: 'ROM Types and uses', timestamp: '7 days ago' },
    { id: '5', title: 'Platform template for developers', timestamp: '7 days ago' },
    { id: '6', title: 'Mobile development with golang', timestamp: '7 days ago' }
  ];

  const handleSend = () => {
    if (inputMessage.trim()) {
      setMessages([...messages, {
        id: Date.now().toString(),
        text: inputMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isBot: false
      }]);
      setInputMessage('');
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center">
              <span className="text-white font-semibold">AM</span>
            </div>
            <span className="font-semibold">AskMore</span>
          </div>
          <div className="flex mt-4 gap-2">
            <button className="p-2 hover:bg-gray-100 rounded">
              <PenLine size={20} />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded">
              <List size={20} />
            </button>
          </div>
        </div>

        {/* Chat History */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Today</span>
              <button onClick={() => setIsExpanded(!isExpanded)}>
                <ChevronDown size={16} />
              </button>
            </div>
            {todayHistory.map(chat => (
              <div key={chat.id} className="p-2 hover:bg-gray-100 rounded-lg cursor-pointer">
                <div className="flex items-center gap-2">
                  <MessageSquare size={16} className="text-gray-500" />
                  <span className="text-sm truncate">{chat.title}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Previous 7 Days</span>
              <span className="text-sm text-gray-600">118</span>
            </div>
            {previousHistory.map(chat => (
              <div key={chat.id} className="p-2 hover:bg-gray-100 rounded-lg cursor-pointer">
                <div className="flex items-center gap-2">
                  <MessageSquare size={16} className="text-gray-500" />
                  <span className="text-sm truncate">{chat.title}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* User Profile */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img src="/user-avatar.jpg" alt="User" className="w-8 h-8 rounded-full" />
              <span>Smiling Guy</span>
            </div>
            <button className="p-1 hover:bg-gray-100 rounded">
              <MoreVertical size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4">
          {messages.map(message => (
            <div key={message.id} className={`flex gap-4 mb-4 ${message.isBot ? '' : 'justify-end'}`}>
              {message.isBot && (
                <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center">
                  <span className="text-white text-sm">AM</span>
                </div>
              )}
              <div className="max-w-2xl">
                <Card className="p-4">
                  <p>{message.text}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-sm text-gray-500">{message.timestamp}</span>
                    {message.isBot && (
                      <>
                        <button className="p-1 hover:bg-gray-100 rounded">
                          <ThumbsUp size={16} />
                        </button>
                        <button className="p-1 hover:bg-gray-100 rounded">
                          <ThumbsDown size={16} />
                        </button>
                      </>
                    )}
                  </div>
                </Card>
              </div>
              {!message.isBot && (
                <img src="/user-avatar.jpg" alt="User" className="w-8 h-8 rounded-full" />
              )}
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="border-t border-gray-200 p-4">
          <div className="flex items-center gap-2">
            <Card className="flex-1 p-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Message AskMore..."
                className="w-full focus:outline-none"
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              />
            </Card>
            <button
              onClick={handleSend}
              className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Send size={20} />
            </button>
            <button className="p-2 text-blue-600 rounded-lg hover:bg-blue-50">
              <ArrowUp size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatDashboard;