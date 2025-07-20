"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  MessageSquare,
  Send,
  Phone,
  Video,
  MoreVertical,
  Paperclip,
  Smile,
  Check,
  CheckCheck
} from "lucide-react";

interface Message {
  id: string;
  sender: "hotel" | "cleaner";
  senderName: string;
  content: string;
  timestamp: string;
  jobId?: string;
  status: "sent" | "delivered" | "read";
  type: "text" | "image" | "file";
}

interface ChatThread {
  id: string;
  jobId: string;
  jobTitle: string;
  hotelName: string;
  cleanerName: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  status: "active" | "completed" | "archived";
}

interface MessagingProps {
  userType: "hotel" | "cleaner";
  currentUser: string;
}

export default function Messaging({ userType, currentUser }: MessagingProps) {
  const [activeThread, setActiveThread] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [threads] = useState<ChatThread[]>([
    {
      id: "thread_1",
      jobId: "job_001",
      jobTitle: "3rd Floor Deep Cleaning",
      hotelName: "Grand Plaza Hotel",
      cleanerName: "Sarah Johnson",
      lastMessage: "I'll arrive at 9 AM sharp. Do you have any specific instructions?",
      lastMessageTime: "2 hours ago",
      unreadCount: 1,
      status: "active"
    },
    {
      id: "thread_2",
      jobId: "job_002",
      jobTitle: "Resort Suite Morning Clean",
      hotelName: "Sunset Resort",
      cleanerName: "Mike Wilson",
      lastMessage: "Job completed successfully. Please review when convenient.",
      lastMessageTime: "1 day ago",
      unreadCount: 0,
      status: "completed"
    },
    {
      id: "thread_3",
      jobId: "job_003",
      jobTitle: "Express Business Cleaning",
      hotelName: "Business Inn",
      cleanerName: "Tom Brown",
      lastMessage: "I need to discuss the scope of work for tomorrow.",
      lastMessageTime: "3 hours ago",
      unreadCount: 2,
      status: "active"
    }
  ]);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "msg_1",
      sender: "hotel",
      senderName: "Grand Plaza Hotel",
      content: "Hi Sarah! Thanks for accepting our cleaning job. We have 25 rooms that need deep cleaning on the 3rd floor.",
      timestamp: "Today 8:30 AM",
      jobId: "job_001",
      status: "read",
      type: "text"
    },
    {
      id: "msg_2",
      sender: "cleaner",
      senderName: "Sarah Johnson",
      content: "Perfect! I've reviewed the requirements. I'll bring all necessary supplies and equipment.",
      timestamp: "Today 8:45 AM",
      jobId: "job_001",
      status: "read",
      type: "text"
    },
    {
      id: "msg_3",
      sender: "hotel",
      senderName: "Grand Plaza Hotel",
      content: "Great! Please use the service elevator and check in with our front desk when you arrive.",
      timestamp: "Today 8:50 AM",
      jobId: "job_001",
      status: "read",
      type: "text"
    },
    {
      id: "msg_4",
      sender: "cleaner",
      senderName: "Sarah Johnson",
      content: "I'll arrive at 9 AM sharp. Do you have any specific instructions for the VIP suites?",
      timestamp: "Today 2:15 PM",
      jobId: "job_001",
      status: "delivered",
      type: "text"
    }
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !activeThread) return;

    const message: Message = {
      id: `msg_${Date.now()}`,
      sender: userType,
      senderName: currentUser,
      content: newMessage,
      timestamp: "Just now",
      jobId: activeThread,
      status: "sent",
      type: "text"
    };

    setMessages(prev => [...prev, message]);
    setNewMessage("");

    // Simulate message delivery
    setTimeout(() => {
      setMessages(prev =>
        prev.map(msg =>
          msg.id === message.id ? { ...msg, status: "delivered" } : msg
        )
      );
    }, 1000);
  };

  const getActiveThreadMessages = () => {
    return messages.filter(msg => msg.jobId === activeThread);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "sent": return <Check className="h-3 w-3 text-gray-400" />;
      case "delivered": return <CheckCheck className="h-3 w-3 text-gray-400" />;
      case "read": return <CheckCheck className="h-3 w-3 text-blue-500" />;
      default: return null;
    }
  };

  return (
    <div className="h-full flex">
      {/* Chat Threads Sidebar */}
      <div className="w-80 border-r bg-white">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Messages</h2>
            <Button variant="ghost" size="sm">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <ScrollArea className="h-full">
          <div className="p-2">
            {threads.map((thread) => (
              <Card
                key={thread.id}
                className={`mb-2 cursor-pointer transition-colors ${
                  activeThread === thread.id ? "bg-blue-50 border-blue-200" : "hover:bg-gray-50"
                }`}
                onClick={() => setActiveThread(thread.id)}
              >
                <CardContent className="p-3">
                  <div className="flex items-start space-x-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback>
                        {userType === "hotel"
                          ? thread.cleanerName.substring(0, 2).toUpperCase()
                          : thread.hotelName.substring(0, 2).toUpperCase()
                        }
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium truncate">
                          {userType === "hotel" ? thread.cleanerName : thread.hotelName}
                        </p>
                        {thread.unreadCount > 0 && (
                          <Badge variant="default" className="h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                            {thread.unreadCount}
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 mb-1">{thread.jobTitle}</p>
                      <p className="text-xs text-gray-600 truncate">{thread.lastMessage}</p>
                      <p className="text-xs text-gray-400 mt-1">{thread.lastMessageTime}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Chat Messages Area */}
      <div className="flex-1 flex flex-col">
        {activeThread ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b bg-white flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback>
                    {userType === "hotel" ? "CL" : "HT"}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">
                    {userType === "hotel"
                      ? threads.find(t => t.id === activeThread)?.cleanerName
                      : threads.find(t => t.id === activeThread)?.hotelName
                    }
                  </p>
                  <p className="text-sm text-gray-500">
                    {threads.find(t => t.id === activeThread)?.jobTitle}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm">
                  <Phone className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Video className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {getActiveThreadMessages().map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === userType ? "justify-end" : "justify-start"}`}
                  >
                    <div className={`max-w-xs lg:max-w-md ${
                      message.sender === userType
                        ? "bg-blue-500 text-white"
                        : "bg-gray-100 text-gray-900"
                    } rounded-lg px-4 py-2`}>
                      <p className="text-sm">{message.content}</p>
                      <div className={`flex items-center justify-between mt-1 ${
                        message.sender === userType ? "text-blue-100" : "text-gray-500"
                      }`}>
                        <span className="text-xs">{message.timestamp}</span>
                        {message.sender === userType && (
                          <div className="ml-2">
                            {getStatusIcon(message.status)}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            {/* Message Input */}
            <div className="p-4 border-t bg-white">
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm">
                  <Paperclip className="h-4 w-4" />
                </Button>
                <div className="flex-1 relative">
                  <Input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2"
                  >
                    <Smile className="h-4 w-4" />
                  </Button>
                </div>
                <Button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  className="bg-blue-500 hover:bg-blue-600"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">Select a conversation to start messaging</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
