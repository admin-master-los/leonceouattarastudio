import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Loader2 } from 'lucide-react';
import { useChatbotKnowledge } from '../lib/useSupabaseData';
import { OpenAIService } from '../services/openaiService';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

const ChatBot: React.FC = () => {
  const { data: chatbotKnowledgeBase, loading } = useChatbotKnowledge();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [conversationHistory, setConversationHistory] = useState<ChatMessage[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialiser OpenAI Service
  const openAIService = useRef<OpenAIService | null>(null);

  useEffect(() => {
    // ⚠️ IMPORTANT: Remplacez par votre clé API OpenAI dans le fichier .env
    // VITE_OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxxxxxxxxxx
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY || '';
    
    if (apiKey) {
      openAIService.current = new OpenAIService(apiKey);
    } else {
      console.warn('⚠️ Clé API OpenAI manquante. Ajoutez VITE_OPENAI_API_KEY dans votre fichier .env');
    }
  }, []);

  const quickReplies = [
    'Vos services',
    'Tarifs et devis',
    'Délais de réalisation',
    'Prendre contact',
    'Aide',
  ];

  // Message de bienvenue
  useEffect(() => {
    if (isOpen && messages.length === 0 && !loading) {
      const greetingMessage =
        "Bonjour ! Je suis Larry de Leonce Ouattara Studio 👋\n\nJe suis là pour répondre à vos questions sur nos services de digitalisation de processus, nos tarifs, nos délais, et bien plus encore.\n\nComment puis-je vous aider aujourd'hui ?";
      addMessage(greetingMessage, 'bot');
    }
  }, [isOpen, loading]);

  // Auto-scroll vers le bas à chaque nouveau message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const addMessage = (text: string, sender: 'user' | 'bot') => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    // Vérifier si OpenAI est configuré
    if (!openAIService.current) {
      addMessage(inputText, 'user');
      setInputText('');
      setTimeout(() => {
        addMessage(
          "⚠️ Le service IA n'est pas configuré. Veuillez contacter l'administrateur ou nous écrire directement à contact@leonceouattarastudiogroup.site",
          'bot'
        );
      }, 500);
      return;
    }

    const userMessage = inputText.trim();
    addMessage(userMessage, 'user');
    setInputText('');
    setIsTyping(true);

    // Ajouter à l'historique de conversation
    const newHistory: ChatMessage[] = [
      ...conversationHistory,
      { role: 'user', content: userMessage },
    ];

    try {
      const response = await openAIService.current.sendMessage(
        userMessage,
        conversationHistory,
        chatbotKnowledgeBase
      );

      // Ajouter la réponse à l'historique
      setConversationHistory([
        ...newHistory,
        { role: 'assistant', content: response },
      ]);

      addMessage(response, 'bot');
    } catch (error) {
      console.error('Erreur OpenAI:', error);
      addMessage(
        "Désolé, je rencontre un problème technique 😔\n\nVeuillez réessayer dans quelques instants ou nous contacter directement :\n📧 contact@leonceouattarastudiogroup.site\n📞 Ou planifiez un appel via notre calendrier",
        'bot'
      );
    } finally {
      setIsTyping(false);
    }
  };

  const handleQuickReply = (reply: string) => {
    setInputText(reply);
    // Auto-envoyer après un court délai
    setTimeout(() => {
      if (openAIService.current) {
        handleSendMessage();
      }
    }, 100);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isTyping) {
      handleSendMessage();
    }
  };

  return (
    <div className="fixed bottom-3 right-3 sm:bottom-4 sm:right-4 z-50">
      {/* Chat Toggle Button - Responsive */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Ouvrir le chat avec Leonce Ouattara Studio"
        className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 flex items-center justify-center ${
          isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'
        }`}
      >
        <MessageCircle size={24} className="sm:w-7 sm:h-7" />
      </button>

      {/* Chat Window - Responsive: Plein écran sur mobile, fenêtre sur desktop */}
      <div
        className={`fixed sm:absolute inset-0 sm:inset-auto sm:bottom-0 sm:right-0 w-full sm:w-[380px] md:w-[420px] lg:w-[480px] h-full sm:h-[500px] md:h-[600px] lg:h-[700px] bg-black/95 backdrop-blur-xl border-0 sm:border sm:border-cyan-500/30 rounded-none sm:rounded-3xl shadow-2xl transition-all duration-300 ${
          isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'
        } sm:origin-bottom-right overflow-hidden flex flex-col`}
      >
        {/* Header - Responsive */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-gray-700/50 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 flex-shrink-0">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1">
            {/* Avatar */}
            <img
              src="/assets/avatar-leonce.jpg"
              alt="Leonce Ouattara"
              className="w-11 h-11 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full object-cover border-2 border-cyan-500/50 flex-shrink-0"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.nextElementSibling?.classList.remove('hidden');
              }}
            />
            {/* Fallback avatar */}
            <div className="hidden w-11 h-11 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg sm:text-xl flex-shrink-0">
              LO
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="text-white font-bold text-base sm:text-lg truncate">
                Larry - Assistant lOS
              </h4>
              <p className="text-cyan-400 text-xs sm:text-sm flex items-center gap-1.5">
                <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-green-500 rounded-full animate-pulse flex-shrink-0"></span>
                {openAIService.current ? 'En ligne' : 'Configuration requise'}
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            aria-label="Fermer le chat"
            className="text-gray-400 hover:text-white transition-colors duration-200 hover:rotate-90 transform flex-shrink-0 ml-2"
          >
            <X size={22} className="sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Messages - Zone flexible avec scroll optimisé */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-4 md:p-6 space-y-3 sm:space-y-4 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0icGF0dGVybiIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIj48Y2lyY2xlIGN4PSIyMCIgY3k9IjIwIiByPSIxIiBmaWxsPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDMpIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI3BhdHRlcm4pIi8+PC9zdmc+')] scrollbar-thin scrollbar-thumb-cyan-500/20 scrollbar-track-transparent">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-[85%] sm:max-w-[80%] md:max-w-[75%] px-3.5 sm:px-4 md:px-5 py-2.5 sm:py-3 rounded-2xl text-sm sm:text-base leading-relaxed shadow-lg ${
                  message.sender === 'user'
                    ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-br-sm'
                    : 'bg-white/10 text-gray-100 border border-gray-700/50 backdrop-blur-sm rounded-bl-sm'
                }`}
              >
                <p className="whitespace-pre-wrap break-words">
                  {message.text}
                </p>
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="max-w-[85%] sm:max-w-[80%] md:max-w-[75%] px-3.5 sm:px-4 md:px-5 py-2.5 sm:py-3 rounded-2xl bg-white/10 border border-gray-700/50 backdrop-blur-sm rounded-bl-sm">
                <div className="flex items-center gap-2">
                  <Loader2 size={16} className="animate-spin text-cyan-400" />
                  <span className="text-gray-400 text-sm">Larry écrit...</span>
                </div>
              </div>
            </div>
          )}

          {/* Quick Replies - Responsive */}
          {messages.length === 1 && !isTyping && (
            <div className="space-y-2.5 sm:space-y-3 pt-3 sm:pt-4">
              <p className="text-gray-400 text-xs sm:text-sm font-medium px-1">
                Suggestions rapides :
              </p>
              <div className="flex flex-wrap gap-2">
                {quickReplies.map((reply) => (
                  <button
                    key={reply}
                    onClick={() => handleQuickReply(reply)}
                    disabled={isTyping}
                    className="px-3 sm:px-4 py-2 sm:py-2.5 bg-white/5 border border-cyan-500/40 text-cyan-300 rounded-full text-xs sm:text-sm hover:bg-cyan-500/20 hover:border-cyan-400 transition-all duration-200 hover:scale-105 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {reply}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Anchor pour auto-scroll */}
          <div ref={messagesEndRef} />
        </div>

        {/* Input - Responsive avec padding adapté pour mobile */}
        <div className="p-3 sm:p-4 border-t border-gray-700/50 bg-black/50 flex-shrink-0 safe-area-bottom">
          <div className="flex gap-2 sm:gap-3 items-center">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Tapez votre message..."
              disabled={isTyping}
              aria-label="Saisir un message pour Leonce Ouattara Studio"
              className="flex-1 bg-white/5 border border-gray-700/50 rounded-full px-4 sm:px-5 py-2.5 sm:py-3 md:py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/60 focus:ring-2 focus:ring-cyan-500/20 text-sm sm:text-base transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputText.trim() || isTyping}
              aria-label="Envoyer le message"
              className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed hover:scale-110 hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-200 active:scale-95 flex-shrink-0"
            >
              {isTyping ? (
                <Loader2 size={18} className="sm:w-5 sm:h-5 text-white animate-spin" />
              ) : (
                <Send size={18} className="sm:w-5 sm:h-5 text-white" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
