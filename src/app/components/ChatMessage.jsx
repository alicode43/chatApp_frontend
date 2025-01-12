'use client'
import { format, isToday, isYesterday } from "date-fns";

export const ChatMessages = ({ messages, senderId, users }) => {
  const groupedMessages = messages.reduce((groups, message) => {
    const messageDate = new Date(message.timestamp).toDateString();
    if (!groups[messageDate]) {
      groups[messageDate] = [];
    }
    groups[messageDate].push(message);
    return groups;
  }, {});

  const formatDateHeader = (date) => {
    const messageDate = new Date(date);
    if (isToday(messageDate)) return "Today";
    if (isYesterday(messageDate)) return "Yesterday";
    return format(messageDate, "MMMM d, yyyy");
  };

  return (
    <div className="overflow-y-auto h-full">
      {Object.keys(groupedMessages).map((date) => (
        <div key={date}>
          <div className="text-center text-gray-500 text-sm my-4">
            {formatDateHeader(date)}
          </div>
          {groupedMessages[date].map((msg, index) => (
            <div
              key={index}
              className={`flex mb-4 ${msg.sender === senderId ? "justify-end" : "justify-start"
                }`}
            >
              {msg.sender !== senderId && (
                <img
                  src={users.find((u) => u.id === msg.sender)?.avatar || "https://cdn-icons-png.flaticon.com/512/3177/3177440.png"}
                  alt="Avatar"
                  className="w-8 h-8 rounded-full mr-3"
                />
              )}
              <div
                className={`p-3 rounded-lg ${msg.sender === senderId ? "bg-blue-500 text-white" : "bg-white"}`}
              >
                <p>{msg.content}</p>
                <span className="text-xs text-gray-300">
                  {new Date(msg.timestamp).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};