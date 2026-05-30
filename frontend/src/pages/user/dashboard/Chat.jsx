import { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../../../utils/api";
import { socket } from "../../../utils/socket";
import { formatDistanceToNow } from "date-fns";
import {
  Send,
  Search,
  MessageSquare,
  ArrowLeft,
  MoreVertical,
  Car,
} from "lucide-react";
import { toast } from "react-toastify";

const BACKEND_URL = "https://jaum-t3no.onrender.com";

const Chat = () => {
  const [conversations, setConversations] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const scrollRef = useRef();
  const location = useLocation();
  const navigate = useNavigate();

  // Get current user
  const userStr = localStorage.getItem("user");
  const user = userStr ? JSON.parse(userStr) : null;
  const userId = user?._id || user?.id;

  // 1. Initialize Socket Listeners
  useEffect(() => {
    if (!userId) {
      navigate("/login");
      return;
    }

    // Ensure socket is connected and user is added (though Navbar also does this)
    if (!socket.connected) {
      socket.connect();
    }
    socket.emit("addUser", userId);

    const handleGetMessage = (data) => {
      setArrivalMessage({
        _id: data._id,
        conversationId: data.conversationId,
        sender: data.sender,
        text: data.text,
        createdAt: data.createdAt,
      });
    };

    socket.on("getMessage", handleGetMessage);

    return () => {
      socket.off("getMessage", handleGetMessage);
    };
  }, [userId, navigate]);

  // 2. Handle incoming messages
  useEffect(() => {
    if (
      arrivalMessage &&
      activeConversation &&
      activeConversation._id === arrivalMessage.conversationId
    ) {
      setMessages((prev) => [...prev, arrivalMessage]);
    }

    // Update the conversation's lastMessage and unread count in the sidebar
    if (arrivalMessage) {
      setConversations((prev) =>
        prev
          .map((c) => {
            if (c._id === arrivalMessage.conversationId) {
              // Increment unread count if it's not the active conversation
              const isTargetActive =
                activeConversation && activeConversation._id === c._id;
              const isMine = arrivalMessage.sender._id === userId;
              const newUnreadCount =
                !isTargetActive && !isMine
                  ? (c.unreadCount || 0) + 1
                  : c.unreadCount;

              return {
                ...c,
                lastMessage: arrivalMessage.text,
                updatedAt: Date.now(),
                unreadCount: newUnreadCount,
              };
            }
            return c;
          })
          .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)),
      );

      // If the message is for the active conversation, mark it as read immediately
      if (
        activeConversation &&
        activeConversation._id === arrivalMessage.conversationId &&
        arrivalMessage.sender._id !== userId
      ) {
        api.put(`/chat/${activeConversation._id}/read`).catch(console.error);

        // Dispatch an event so Navbar can update its global badge
        window.dispatchEvent(new Event("chatReadUpdated"));
      }
    }
  }, [arrivalMessage, activeConversation, userId]);

  // 3. Fetch conversations
  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await api.get("/chat");
        setConversations(res.data);

        // Auto-select if redirected from ListingDetails
        if (location.state?.activeConversation) {
          const target = res.data.find(
            (c) => c._id === location.state.activeConversation,
          );
          if (target) setActiveConversation(target);
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to load conversations");
      }
    };
    getConversations();
  }, [location.state]);

  // 4. Fetch messages for active conversation & join socket room
  useEffect(() => {
    const getMessagesAndMarkRead = async () => {
      if (!activeConversation) return;
      try {
        const res = await api.get(`/chat/${activeConversation._id}`);
        setMessages(res.data);

        // If there are unread messages, mark them as read
        if (activeConversation.unreadCount > 0) {
          await api.put(`/chat/${activeConversation._id}/read`);

          // Clear local unread count
          setConversations((prev) =>
            prev.map((c) =>
              c._id === activeConversation._id ? { ...c, unreadCount: 0 } : c,
            ),
          );

          // Notify Navbar to update global count
          window.dispatchEvent(new Event("chatReadUpdated"));
        }
      } catch (err) {
        console.error(err);
      }
    };

    getMessagesAndMarkRead();

    if (activeConversation) {
      socket.emit("joinRoom", activeConversation._id);
    }
  }, [activeConversation]);

  // 5. Auto scroll to bottom
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Handlers
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !activeConversation) return;

    const tempMessage = newMessage;
    setNewMessage("");

    // Identify the receiver
    const receiver = activeConversation.members.find(
      (m) => m._id !== userId && m.id !== userId,
    );

    try {
      const res = await api.post(`/chat/${activeConversation._id}`, {
        text: tempMessage,
      });

      // Send to socket
      socket.emit("sendMessage", {
        conversationId: activeConversation._id,
        senderId: userId,
        receiverId: receiver?._id,
        text: tempMessage,
        messageId: res.data._id,
        createdAt: res.data.createdAt,
      });

      // Update sidebar
      setConversations((prev) =>
        prev
          .map((c) =>
            c._id === activeConversation._id
              ? { ...c, lastMessage: tempMessage, updatedAt: Date.now() }
              : c,
          )
          .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)),
      );
    } catch (err) {
      console.error(err);
      toast.error("Failed to send message");
    }
  };

  const getChatPartner = (members) => {
    return members.find((m) => m._id !== userId && m.id !== userId);
  };

  const filteredConversations = conversations.filter((c) => {
    const partner = getChatPartner(c.members);
    return (
      partner?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.listing?.name?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="flex h-[calc(100vh-80px)] max-w-7xl mx-auto bg-white border-x border-slate-200 shadow-sm overflow-hidden sm:rounded-2xl sm:my-4 sm:h-[calc(100vh-32px)]">
      {/* LEFT SIDEBAR: Conversations List */}
      <div
        className={`${activeConversation ? "hidden md:flex" : "flex"} w-full md:w-[350px] lg:w-[400px] flex-col border-r border-slate-200 bg-slate-50/50`}
      >
        {/* Header */}
        <div className="p-4 border-b border-slate-200 bg-white">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">
              Messages
            </h1>
            <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center border border-indigo-100">
              <MessageSquare size={16} className="text-blue-500" />
            </div>
          </div>
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-100 border border-slate-200 rounded-xl py-2.5 pl-10 pr-4 text-sm text-slate-900 placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all"
            />
          </div>
        </div>

        {/* Conversation List */}
        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200 bg-white">
          {filteredConversations.length === 0 ? (
            <div className="p-8 text-center text-slate-500">
              <MessageSquare
                size={32}
                className="mx-auto mb-3 opacity-20 text-slate-400"
              />
              <p className="text-sm">No conversations found.</p>
            </div>
          ) : (
            filteredConversations.map((c) => {
              const partner = getChatPartner(c.members);
              const isActive = activeConversation?._id === c._id;
              const hasUnread = c.unreadCount > 0;

              return (
                <div
                  key={c._id}
                  onClick={() => setActiveConversation(c)}
                  className={`flex items-start gap-3 p-4 cursor-pointer transition-colors border-b border-slate-100 hover:bg-slate-50 ${
                    isActive
                      ? "bg-blue-50/50 border-l-4 border-l-blue-500"
                      : "border-l-4 border-l-transparent"
                  }`}
                >
                  {/* Avatar */}
                  <div className="relative shrink-0 mt-0.5">
                    {partner?.profilePicture ? (
                      <img
                        src={`${BACKEND_URL}${partner.profilePicture}`}
                        alt={partner.name}
                        className="w-12 h-12 rounded-full object-cover shadow-sm border border-slate-200"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-white font-bold text-lg shadow-sm">
                        {(partner?.name || "U")[0].toUpperCase()}
                      </div>
                    )}
                    <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full"></div>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline mb-0.5">
                      <h3
                        className={`truncate pr-2 ${hasUnread ? "font-black text-slate-900" : "font-semibold text-slate-900"}`}
                      >
                        {partner?.name || "User"}
                      </h3>
                      <span
                        className={`text-[10px] shrink-0 ${hasUnread ? "font-bold text-blue-600" : "font-medium text-slate-500"}`}
                      >
                        {c.updatedAt
                          ? formatDistanceToNow(new Date(c.updatedAt), {
                              addSuffix: true,
                            })
                          : ""}
                      </span>
                    </div>
                    <p className="text-xs text-blue-600 font-bold tracking-wide uppercase truncate mb-1">
                      {c.listing?.name || "Vehicle"}
                    </p>
                    <div className="flex justify-between items-center gap-2">
                      <p
                        className={`text-sm truncate ${hasUnread ? "font-bold text-slate-900" : "text-slate-500"}`}
                      >
                        {c.lastMessage || "No messages yet"}
                      </p>
                      {hasUnread && (
                        <div className="w-2.5 h-2.5 bg-blue-600 rounded-full shrink-0" />
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* RIGHT SIDE: Active Chat Room */}
      <div
        className={`${!activeConversation ? "hidden md:flex" : "flex"} flex-1 flex-col bg-slate-50 relative`}
      >
        {activeConversation ? (
          <>
            {/* Chat Header */}
            <div className="h-16 px-4 border-b border-slate-200 flex items-center justify-between bg-white sticky top-0 z-10 shadow-sm">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setActiveConversation(null)}
                  className="md:hidden p-2 -ml-2 text-slate-400 hover:text-slate-900 transition-colors"
                >
                  <ArrowLeft size={20} />
                </button>

                {(() => {
                  const partner = getChatPartner(activeConversation.members);
                  return (
                    <div className="flex items-center gap-3">
                      {partner?.profilePicture ? (
                        <img
                          src={`${BACKEND_URL}${partner.profilePicture}`}
                          alt="Avatar"
                          className="w-9 h-9 rounded-full object-cover border border-slate-200"
                        />
                      ) : (
                        <div className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center text-white font-bold text-sm">
                          {(partner?.name || "U")[0].toUpperCase()}
                        </div>
                      )}
                      <div>
                        <h2 className="font-bold text-slate-900 leading-tight">
                          {partner?.name}
                        </h2>
                        <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
                          <Car size={10} className="text-blue-500" />
                          <span className="truncate max-w-[150px] sm:max-w-[200px]">
                            {activeConversation.listing?.name}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>

              <button className="text-slate-400 hover:text-slate-900 p-2 transition-colors">
                <MoreVertical size={20} />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-slate-200 bg-white">
              {messages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-slate-500 space-y-3">
                  <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100">
                    <MessageSquare size={24} className="text-slate-300" />
                  </div>
                  <p className="text-sm font-medium">
                    Send a message to start the conversation.
                  </p>
                </div>
              ) : (
                messages.map((m, index) => {
                  const isMine =
                    m.sender._id === userId ||
                    m.sender.id === userId ||
                    m.sender === userId;
                  const showAvatar =
                    index === 0 ||
                    messages[index - 1].sender._id !== m.sender._id;

                  return (
                    <div
                      key={m._id}
                      className={`flex items-end gap-2 ${isMine ? "justify-end" : "justify-start"}`}
                    >
                      {/* Avatar for receiver */}
                      {!isMine && showAvatar ? (
                        <div className="w-7 h-7 rounded-full bg-slate-800 flex items-center justify-center text-white text-xs font-bold shrink-0 mb-1 shadow-sm">
                          {(m.sender.name || "U")[0].toUpperCase()}
                        </div>
                      ) : (
                        !isMine && <div className="w-7 shrink-0"></div>
                      )}

                      <div
                        className={`flex flex-col ${isMine ? "items-end" : "items-start"} max-w-[75%]`}
                      >
                        <div
                          className={`px-4 py-2.5 rounded-2xl shadow-sm ${
                            isMine
                              ? "bg-indigo-600 text-white rounded-br-sm"
                              : "bg-slate-100 text-slate-800 rounded-bl-sm border border-slate-200"
                          }`}
                        >
                          <p className="text-[15px] leading-relaxed whitespace-pre-wrap break-words">
                            {m.text}
                          </p>
                        </div>
                        <span className="text-[10px] font-semibold text-slate-400 mt-1 px-1 uppercase tracking-wider">
                          {formatDistanceToNow(new Date(m.createdAt), {
                            addSuffix: true,
                          })}
                        </span>
                      </div>
                    </div>
                  );
                })
              )}
              <div ref={scrollRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-slate-200 shrink-0">
              <form
                onSubmit={handleSubmit}
                className="flex gap-3 items-end max-w-4xl mx-auto"
              >
                <textarea
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-indigo-100 resize-none max-h-32 min-h-[48px] scrollbar-thin transition-all"
                  rows="1"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSubmit(e);
                    }
                  }}
                />
                <button
                  type="submit"
                  disabled={!newMessage.trim()}
                  className="p-3.5 bg-blue-600 text-white rounded-full hover:bg-blue-700 hover:shadow-lg hover:shadow-indigo-500/30 hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0 disabled:cursor-not-allowed transition-all active:scale-95 shrink-0"
                >
                  <Send size={18} className="ml-0.5" />
                </button>
              </form>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-slate-500 p-8 text-center bg-white">
            <div className="w-24 h-24 rounded-full bg-slate-50 flex items-center justify-center mb-6 border border-slate-100">
              <MessageSquare size={40} className="text-slate-300" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">
              Your Messages
            </h2>
            <p className="max-w-xs text-sm font-medium">
              Select a conversation from the sidebar or start a new one from a
              vehicle listing.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;
