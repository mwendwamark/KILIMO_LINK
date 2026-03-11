import React, { useState, useEffect, useRef } from "react";
import { formatDistanceToNow } from "date-fns";
import { getConversations, getMessages, sendMessage } from "/src/services/api";
import { PaperPlaneTilt, ChatCircleDots } from "@phosphor-icons/react";
import "../Messaging.css";

const MessagingPage = () => {
  const [conversations, setConversations] = useState([]);
  const [activeConvoId, setActiveConvoId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) setUser(JSON.parse(userData));
    fetchConversations();

    // Polling for new conversations every 10 seconds
    const interval = setInterval(fetchConversations, 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (activeConvoId) {
      fetchMessages();
      // Polling for new messages every 3 seconds when a chat is open
      const interval = setInterval(fetchMessages, 3000);
      return () => clearInterval(interval);
    }
  }, [activeConvoId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const fetchConversations = async () => {
    const result = await getConversations();
    if (result.success) {
      setConversations(result.conversations);
    }
    setLoading(false);
  };

  const fetchMessages = async () => {
    if (!activeConvoId) return;
    const result = await getMessages(activeConvoId);
    if (result.success) {
      setMessages(result.messages);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !activeConvoId) return;

    const currentMsg = newMessage;
    setNewMessage(""); // Clear early for better UX

    const result = await sendMessage(activeConvoId, currentMsg);
    if (result.success) {
      setMessages((prev) => [...prev, result.message]);
      fetchConversations(); // Update preview in sidebar
    }
  };

  const activeConvo = conversations.find((c) => c.id === activeConvoId);

  return (
    <div className="messaging-container">
      <div className="conversation-list">
        <div className="convo-header">
          <h2>Messages</h2>
          <ChatCircleDots size={24} weight="bold" color="var(--green_color)" />
        </div>
        <div className="convo-scroll">
          {conversations.map((convo) => (
            <div
              key={convo.id}
              className={`convo-item ${activeConvoId === convo.id ? "active" : ""}`}
              onClick={() => setActiveConvoId(convo.id)}
            >
              <div className="convo-avatar">
                {convo.participants[0]?.avatar_url ? (
                  <img src={convo.participants[0].avatar_url} alt="User" />
                ) : (
                  convo.participants[0]?.first_name?.[0]
                )}
              </div>
              <div className="convo-info">
                <div className="convo-top">
                  <span className="convo-name">
                    {convo.participants[0]?.first_name}{" "}
                    {convo.participants[0]?.last_name}
                  </span>
                  <span className="convo-time">
                    {convo.last_message &&
                      formatDistanceToNow(
                        new Date(convo.last_message.sent_at),
                        { addSuffix: false },
                      )}
                  </span>
                </div>
                <div className="convo-preview">
                  {convo.last_message?.body || "No messages yet"}
                </div>
              </div>
            </div>
          ))}
          {!loading && conversations.length === 0 && (
            <p
              style={{
                textAlign: "center",
                color: "var(--light_grey_color)",
                padding: "2rem",
              }}
            >
              No conversations yet.
            </p>
          )}
        </div>
      </div>

      <div className="chat-window">
        {activeConvo ? (
          <>
            <div className="chat-header">
              <div className="convo-avatar">
                {activeConvo.participants[0]?.avatar_url ? (
                  <img
                    src={activeConvo.participants[0].avatar_url}
                    alt="User"
                  />
                ) : (
                  activeConvo.participants[0]?.first_name?.[0]
                )}
              </div>
              <div className="chat-user-meta">
                <div className="convo-name">
                  {activeConvo.participants[0]?.first_name}{" "}
                  {activeConvo.participants[0]?.last_name}
                </div>
                <div
                  className="user-status"
                  style={{ fontSize: "0.8rem", color: "#4CAF50" }}
                >
                  Online
                </div>
              </div>
            </div>

            <div className="chat-messages">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`message-bubble ${msg.sent_by_me ? "sent" : "received"}`}
                >
                  {msg.body}
                  <span className="message-time">
                    {new Date(msg.created_at).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <div className="chat-footer">
              <form className="message-input-form" onSubmit={handleSendMessage}>
                <input
                  type="text"
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                />
                <button
                  type="submit"
                  className="send-btn"
                  disabled={!newMessage.trim()}
                >
                  <PaperPlaneTilt size={20} weight="bold" />
                </button>
              </form>
            </div>
          </>
        ) : (
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--light_grey_color)",
            }}
          >
            <ChatCircleDots size={64} weight="thin" />
            <p>Select a conversation to start chatting</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagingPage;
