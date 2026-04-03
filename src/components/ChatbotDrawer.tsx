import React, { useState, useRef, useEffect } from "react";
import { X, Send, Bot, Phone, MessageSquare, ChevronRight } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "bot";
  text: string;
  timestamp: Date;
}

interface ChatbotDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const FAQ_RESPONSES: Record<string, string> = {
  price: "Our room prices range from S$780/month (common room) to S$2,200/month (studio), depending on location and room type. All prices are all-inclusive with utilities and WiFi.",
  utilities: "Yes! All utilities (water, electricity, gas, WiFi 1Gbps) are included in your monthly rent. No hidden charges.",
  contract: "We offer flexible lease terms starting from 3 months. Month-to-month contracts are available after the initial period.",
  available: "Availability changes frequently. To check real-time availability, please submit your interest form or contact us directly.",
  deposit: "A deposit of 1 month's rent is required. It is fully refundable upon check-out subject to no damages.",
  pet: "We are a pet-free environment in most of our properties. Please check with us if you have specific requirements.",
  foreigner: "Yes, we welcome foreigners! We accept Employment Pass, S Pass, Work Permit, Student Pass, and Dependant's Pass holders.",
  mrt: "All our co-living spaces are within 5–10 minutes walk from an MRT station. We prioritise transit connectivity.",
  furnished: "All rooms are fully furnished with a bed frame, mattress, wardrobe, study desk, and chair. Common areas have full kitchen appliances.",
  viewing: "Yes! Submit the Interest Form and our team will arrange a viewing within 1–2 business days.",
  wifi: "All units come with 1Gbps fibre broadband WiFi included in the rent.",
  guest: "Short-term guests (up to 3 days) are welcome with prior notice to management.",
};

const getResponse = (input: string): string | null => {
  const lower = input.toLowerCase();
  if (lower.includes("price") || lower.includes("cost") || lower.includes("how much") || lower.includes("rent")) {
    return FAQ_RESPONSES.price;
  }
  if (lower.includes("utilit") || lower.includes("electric") || lower.includes("water") || lower.includes("wifi") || lower.includes("internet")) {
    return FAQ_RESPONSES.utilities + " " + FAQ_RESPONSES.wifi;
  }
  if (lower.includes("contract") || lower.includes("lease") || lower.includes("term")) {
    return FAQ_RESPONSES.contract;
  }
  if (lower.includes("available") || lower.includes("availab") || lower.includes("vacancy")) {
    return FAQ_RESPONSES.available;
  }
  if (lower.includes("deposit") || lower.includes("security")) {
    return FAQ_RESPONSES.deposit;
  }
  if (lower.includes("pet") || lower.includes("dog") || lower.includes("cat")) {
    return FAQ_RESPONSES.pet;
  }
  if (lower.includes("foreigner") || lower.includes("ep") || lower.includes("employment pass") || lower.includes("work permit")) {
    return FAQ_RESPONSES.foreigner;
  }
  if (lower.includes("mrt") || lower.includes("train") || lower.includes("transport") || lower.includes("commute")) {
    return FAQ_RESPONSES.mrt;
  }
  if (lower.includes("furnish") || lower.includes("furniture") || lower.includes("bed") || lower.includes("room include")) {
    return FAQ_RESPONSES.furnished;
  }
  if (lower.includes("view") || lower.includes("visit") || lower.includes("see")) {
    return FAQ_RESPONSES.viewing;
  }
  if (lower.includes("guest") || lower.includes("visitor") || lower.includes("friend stay")) {
    return FAQ_RESPONSES.guest;
  }
  return null;
};

const QUICK_QUESTIONS = [
  "What's the monthly rent?",
  "Is WiFi included?",
  "Can foreigners apply?",
  "How do I book a viewing?",
];

const ChatbotDrawer: React.FC<ChatbotDrawerProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "bot",
      text: "Hi there! 👋 I'm CoLive's virtual assistant. I can answer questions about pricing, availability, room types, and more. How can I help you today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      text,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    await new Promise(r => setTimeout(r, 800 + Math.random() * 600));

    const answer = getResponse(text);
    const botMsg: Message = {
      id: (Date.now() + 1).toString(),
      role: "bot",
      text: answer || "I'm not sure about that specific question. For detailed inquiries, please contact our team directly — they'll be happy to help!",
      timestamp: new Date(),
    };

    setIsTyping(false);
    setMessages(prev => [...prev, botMsg]);

    if (!answer) {
      setTimeout(() => {
        const escalation: Message = {
          id: (Date.now() + 2).toString(),
          role: "bot",
          text: "ESCALATE",
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, escalation]);
      }, 500);
    }
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-[#2d2540]/40"
          onClick={onClose}
          style={{ transition: "opacity 200ms ease" }}
        />
      )}

      {/* Drawer */}
      <div
        className="fixed z-50 bg-white flex flex-col"
        style={{
          bottom: 0,
          left: 0,
          right: 0,
          height: "85vh",
          borderRadius: "15px 15px 0 0",
          boxShadow: "0 -10px 36px rgba(0,0,0,0.12)",
          transform: isOpen ? "translateY(0)" : "translateY(100%)",
          transition: "transform 200ms ease",
        }}
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-[#f0edf8] flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#E63946]/10 flex items-center justify-center">
            <Bot size={18} className="text-[#E63946]" />
          </div>
          <div className="flex-1">
            <h3
              className="text-sm font-bold text-[#2d2540]"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              CoLive Assistant
            </h3>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-[#2a9d8f]" />
              <span
                className="text-xs text-[#9e97b0]"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                Online · responds instantly
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#faf8ff] flex items-center justify-center transition-all duration-200 active:scale-90"
          >
            <X size={16} className="text-[#9e97b0]" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3">
          {messages.map((msg) => {
            if (msg.text === "ESCALATE") {
              return (
                <div
                  key={msg.id}
                  className="mx-auto w-full max-w-xs rounded-[10px] p-4"
                  style={{ background: "#faf8ff", border: "1px solid #e8e4f0" }}
                >
                  <p
                    className="text-xs font-bold text-[#2d2540] mb-3 text-center"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  >
                    Prefer to speak with someone?
                  </p>
                  <a
                    href="tel:+6591234567"
                    className="flex items-center gap-3 p-2.5 rounded-[8px] bg-white mb-2 transition-colors hover:bg-[#faf8ff]"
                    style={{ border: "1px solid #e8e4f0" }}
                  >
                    <div className="w-8 h-8 rounded-full bg-[#2a9d8f]/10 flex items-center justify-center">
                      <Phone size={13} className="text-[#2a9d8f]" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-[#2d2540]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                        Call Us
                      </p>
                      <p className="text-xs text-[#9e97b0]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                        +65 9123 4567
                      </p>
                    </div>
                    <ChevronRight size={14} className="text-[#9e97b0] ml-auto" />
                  </a>
                  <a
                    href="https://wa.me/6591234567"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-2.5 rounded-[8px] bg-white transition-colors hover:bg-[#faf8ff]"
                    style={{ border: "1px solid #e8e4f0" }}
                  >
                    <div className="w-8 h-8 rounded-full bg-[#2a9d8f]/10 flex items-center justify-center">
                      <MessageSquare size={13} className="text-[#2a9d8f]" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-[#2d2540]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                        WhatsApp
                      </p>
                      <p className="text-xs text-[#9e97b0]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                        +65 9123 4567
                      </p>
                    </div>
                    <ChevronRight size={14} className="text-[#9e97b0] ml-auto" />
                  </a>
                </div>
              );
            }

            return (
              <div
                key={msg.id}
                className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.role === "bot" && (
                  <div className="w-7 h-7 rounded-full bg-[#E63946]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Bot size={13} className="text-[#E63946]" />
                  </div>
                )}
                <div
                  className="max-w-[80%] px-3.5 py-2.5 rounded-[10px] text-sm leading-relaxed"
                  style={{
                    background: msg.role === "user" ? "#E63946" : "#faf8ff",
                    color: msg.role === "user" ? "white" : "#2d2540",
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    borderRadius: msg.role === "user" ? "10px 10px 2px 10px" : "10px 10px 10px 2px",
                  }}
                >
                  {msg.text}
                </div>
              </div>
            );
          })}

          {isTyping && (
            <div className="flex gap-2 items-center">
              <div className="w-7 h-7 rounded-full bg-[#E63946]/10 flex items-center justify-center flex-shrink-0">
                <Bot size={13} className="text-[#E63946]" />
              </div>
              <div className="px-3.5 py-3 bg-[#faf8ff] rounded-[10px] rounded-tl-[2px] flex gap-1">
                {[0, 1, 2].map(i => (
                  <div
                    key={i}
                    className="w-1.5 h-1.5 rounded-full bg-[#9e97b0] animate-bounce"
                    style={{ animationDelay: `${i * 150}ms` }}
                  />
                ))}
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick questions */}
        {messages.length < 3 && (
          <div className="px-4 pb-3 flex gap-2 overflow-x-auto">
            {QUICK_QUESTIONS.map(q => (
              <button
                key={q}
                onClick={() => sendMessage(q)}
                className="flex-shrink-0 text-xs font-semibold px-3 py-1.5 rounded-full border border-[#e8e4f0] text-[#2d2540] bg-[#faf8ff] hover:border-[#E63946] hover:text-[#E63946] transition-colors duration-200"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                {q}
              </button>
            ))}
          </div>
        )}
        

        {/* Input */}
        <div className="px-4 pb-6 pt-2 border-t border-[#f0edf8]">
          <div className="flex gap-2 items-center">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && sendMessage(input)}
              placeholder="Ask a question..."
              className="flex-1 px-4 py-3 rounded-[10px] text-sm outline-none bg-[#faf8ff] border border-[#e8e4f0] text-[#2d2540] placeholder:text-[#9e97b0] focus:border-[#E63946] focus:ring-2 focus:ring-[#E63946]/10 transition-all duration-200"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={!input.trim()}
              className="w-11 h-11 rounded-[10px] flex items-center justify-center transition-all duration-200 active:scale-90"
              style={{
                background: input.trim() ? "#E63946" : "#e8e4f0",
                boxShadow: input.trim() ? "0 5px 15px rgba(230,57,70,0.25)" : "none",
              }}
            >
              <Send size={15} className={input.trim() ? "text-white" : "text-[#9e97b0]"} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatbotDrawer;
