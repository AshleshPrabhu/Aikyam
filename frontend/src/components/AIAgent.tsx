import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Send, 
  Mic, 
  MicOff, 
  Bot, 
  User, 
  Volume2, 
  VolumeX,
  // Minimize2,
  // Maximize2,
  RotateCcw,
  // Settings,
  // HelpCircle
} from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  isAudio?: boolean;
}

interface AIAgentProps {
  isOpen: boolean;
  onClose: () => void;
}

type Language = 'en' | 'hi' | 'kn';

interface LanguageOption {
  code: Language;
  name: string;
  icon: string;
  voiceLang: string;
}

const AIAgent: React.FC<AIAgentProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState<Language>('hi');
  const [showLanguageSelection, setShowLanguageSelection] = useState(true);

  // Language options
  const languages: LanguageOption[] = [
    { code: 'en', name: 'English', icon: 'E', voiceLang: 'en-IN' },
    { code: 'hi', name: 'हिंदी', icon: 'ह', voiceLang: 'hi-IN' },
    { code: 'kn', name: 'ಕನ್ನಡ', icon: 'ಕ', voiceLang: 'kn-IN' }
  ];

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const speechSynthesisRef = useRef<SpeechSynthesis | null>(null);

  // Initialize with language-specific welcome message
  useEffect(() => {
    const welcomeMessage = 'नमस्ते! मैं आपका AI सहायक हूँ। मैं आपकी दुकान चलाने में मदद कर सकता हूँ। आप मुझसे हिंदी, अंग्रेजी या कन्नड़ में बात कर सकते हैं।';

    // Always show initial Hindi welcome message, language selection will be shown separately
    setMessages([{
      id: '1',
      text: welcomeMessage,
      sender: 'ai',
      timestamp: new Date()
    }]);
  }, []); // Remove currentLanguage dependency to show only once

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Initialize speech synthesis
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      speechSynthesisRef.current = window.speechSynthesis;
    }
  }, []);

  const requestMicrophonePermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setHasPermission(true);
      stream.getTracks().forEach(track => track.stop()); // Stop the stream after getting permission
      return true;
    } catch (error) {
      console.error('Microphone permission denied:', error);
      setHasPermission(false);
      return false;
    }
  };

  const startRecording = async () => {
    const hasPermissionGranted = hasPermission || await requestMicrophonePermission();
    
    if (!hasPermissionGranted) {
      alert('माइक्रोफ़ोन की अनुमति आवश्यक है। कृपया ब्राउज़र सेटिंग्स में अनुमति दें।');
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        // TODO: Convert audio to text using speech recognition API
        handleAudioMessage('Audio message received (speech-to-text will be implemented)');
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setIsListening(true);
    } catch (error) {
      console.error('Error starting recording:', error);
      alert('रिकॉर्डिंग शुरू करने में त्रुटि। कृपया फिर से कोशिश करें।');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setIsListening(false);
    }
  };

  const handleAudioMessage = (transcribedText: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text: transcribedText,
      sender: 'user',
      timestamp: new Date(),
      isAudio: true
    };
    
    setMessages(prev => [...prev, userMessage]);
    processAIResponse(transcribedText);
  };

  const handleTextSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText.trim(),
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    processAIResponse(inputText.trim());
    setInputText('');
  };

  const processAIResponse = (userInput: string) => {
    setIsTyping(true);

    // Simulate AI processing delay
    setTimeout(() => {
      let aiResponse = '';

      // Simple keyword-based responses with language support
      const input = userInput.toLowerCase();
      
      if (currentLanguage === 'en') {
        if (input.includes('order')) {
          aiResponse = 'I can help you with order information. You have 3 total orders - 1 pending, 1 processing, and 1 delivered. Which order would you like to check?';
        } else if (input.includes('help')) {
          aiResponse = 'I can help you with:\n• Order information\n• Customer communication\n• Product uploads\n• Payment details\n• Delivery tracking';
        } else if (input.includes('customer')) {
          aiResponse = 'I can help you communicate with customers. Which customer would you like to contact? Please provide the order number.';
        } else if (input.includes('payment')) {
          aiResponse = 'Your total earnings are ₹14,400. This is a 15% increase from last month. Would you like more payment details?';
        } else {
          aiResponse = 'I understand. That\'s an interesting question. I\'m trying to find the answer for you. Can you provide some more information?';
        }
      } else if (currentLanguage === 'hi') {
        if (input.includes('order') || input.includes('ऑर्डर')) {
          aiResponse = 'मैं आपके ऑर्डर्स की जानकारी दे सकता हूँ। आपके पास कुल 3 ऑर्डर्स हैं - 1 pending, 1 processing, और 1 delivered। कौन सा ऑर्डर देखना चाहते हैं?';
        } else if (input.includes('help') || input.includes('मदद')) {
          aiResponse = 'मैं इन कामों में आपकी मदद कर सकता हूँ:\n• ऑर्डर्स की जानकारी\n• कस्टमर से बात करना\n• प्रोडक्ट अपलोड करना\n• पेमेंट की जानकारी\n• डिलीवरी ट्रैकिंग';
        } else if (input.includes('customer') || input.includes('कस्टमर')) {
          aiResponse = 'कस्टमर से बात करने के लिए मैं आपकी मदद कर सकता हूँ। कौन से कस्टमर से बात करना है? ऑर्डर नंबर बताइए।';
        } else if (input.includes('payment') || input.includes('पेमेंट')) {
          aiResponse = 'आपकी कुल कमाई ₹14,400 है। पिछले महीने की तुलना में 15% की बढ़ोतरी है। पेमेंट की और जानकारी चाहिए?';
        } else {
          aiResponse = 'मैं समझ गया। आपका सवाल दिलचस्प है। मैं इसका जवाब ढूंढने की कोशिश कर रहा हूँ। क्या आप कुछ और जानकारी दे सकते हैं?';
        }
      } else if (currentLanguage === 'kn') {
        if (input.includes('order') || input.includes('ಆರ್ಡರ್')) {
          aiResponse = 'ನಾನು ನಿಮ್ಮ ಆರ್ಡರ್‌ಗಳ ಮಾಹಿತಿ ನೀಡಬಲ್ಲೆ. ನಿಮ್ಮ ಬಳಿ ಒಟ್ಟು 3 ಆರ್ಡರ್‌ಗಳಿವೆ - 1 pending, 1 processing, ಮತ್ತು 1 delivered. ಯಾವ ಆರ್ಡರ್ ನೋಡಲು ಬಯಸುತ್ತೀರಿ?';
        } else if (input.includes('help') || input.includes('ಸಹಾಯ')) {
          aiResponse = 'ನಾನು ಈ ಕೆಲಸಗಳಲ್ಲಿ ನಿಮಗೆ ಸಹಾಯ ಮಾಡಬಲ್ಲೆ:\n• ಆರ್ಡರ್‌ಗಳ ಮಾಹಿತಿ\n• ಗ್ರಾಹಕರೊಂದಿಗೆ ಮಾತುಕತೆ\n• ಉತ್ಪನ್ನ ಅಪ್‌ಲೋಡ್\n• ಪಾವತಿ ವಿವರಗಳು\n• ವಿತರಣೆ ಟ್ರ್ಯಾಕಿಂಗ್';
        } else if (input.includes('customer') || input.includes('ಗ್ರಾಹಕ')) {
          aiResponse = 'ಗ್ರಾಹಕರೊಂದಿಗೆ ಮಾತನಾಡಲು ನಾನು ನಿಮಗೆ ಸಹಾಯ ಮಾಡಬಲ್ಲೆ. ಯಾವ ಗ್ರಾಹಕರೊಂದಿಗೆ ಮಾತನಾಡಲು ಬಯಸುತ್ತೀರಿ? ಆರ್ಡರ್ ಸಂಖ್ಯೆ ತಿಳಿಸಿ.';
        } else if (input.includes('payment') || input.includes('ಪಾವತಿ')) {
          aiResponse = 'ನಿಮ್ಮ ಒಟ್ಟು ಗಳಿಕೆ ₹14,400. ಕಳೆದ ತಿಂಗಳಿಗೆ ಹೋಲಿಸಿದರೆ 15% ಹೆಚ್ಚಳ. ಪಾವತಿಯ ಹೆಚ್ಚಿನ ವಿವರಗಳು ಬೇಕೇ?';
        } else {
          aiResponse = 'ನಾನು ಅರ್ಥಮಾಡಿಕೊಂಡೆ. ನಿಮ್ಮ ಪ್ರಶ್ನೆ ಆಸಕ್ತಿಕರವಾಗಿದೆ. ನಾನು ಇದಕ್ಕೆ ಉತ್ತರ ಹುಡುಕಲು ಪ್ರಯತ್ನಿಸುತ್ತಿದ್ದೇನೆ. ನೀವು ಹೆಚ್ಚಿನ ಮಾಹಿತಿ ನೀಡಬಲ್ಲಿರಾ?';
        }
      }

      const aiMessage: Message = {
        id: Date.now().toString(),
        text: aiResponse,
        sender: 'ai',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const speakText = (text: string) => {
    if (!speechSynthesisRef.current) return;

    speechSynthesisRef.current.cancel(); // Cancel any ongoing speech
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Set voice based on current language
    const voices = speechSynthesisRef.current.getVoices();
    const currentLang = languages.find(lang => lang.code === currentLanguage);
    const voice = voices.find(v => v.lang.includes(currentLang?.voiceLang || 'hi-IN'));
    if (voice) {
      utterance.voice = voice;
    }
    
    utterance.rate = 0.9;
    utterance.pitch = 1;
    
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    
    speechSynthesisRef.current.speak(utterance);
  };

  const stopSpeaking = () => {
    if (speechSynthesisRef.current) {
      speechSynthesisRef.current.cancel();
      setIsSpeaking(false);
    }
  };

  const clearChat = () => {
    const welcomeMessages = {
      en: 'Hello! I am your AI assistant. I can help you manage your shop. You can talk to me in English, Hindi, or Kannada.',
      hi: 'नमस्ते! मैं आपका AI सहायक हूँ। मैं आपकी दुकान चलाने में मदद कर सकता हूँ। आप मुझसे हिंदी, अंग्रेजी या कन्नड़ में बात कर सकते हैं।',
      kn: 'ನಮಸ್ಕಾರ! ನಾನು ನಿಮ್ಮ AI ಸಹಾಯಕ. ನಾನು ನಿಮ್ಮ ಅಂಗಡಿ ನಡೆಸಲು ಸಹಾಯ ಮಾಡಬಲ್ಲೆ. ನೀವು ನನ್ನೊಂದಿಗೆ ಇಂಗ್ಲಿಷ್, ಹಿಂದಿ ಅಥವಾ ಕನ್ನಡದಲ್ಲಿ ಮಾತನಾಡಬಹುದು.'
    };

    setMessages([
      {
        id: '1',
        text: welcomeMessages['hi'], // Always start with Hindi welcome message
        sender: 'ai',
        timestamp: new Date()
      }
    ]);
    setShowLanguageSelection(true); // Reset to show language selection
    setCurrentLanguage('hi'); // Reset to default language
  };

  const changeLanguage = (langCode: Language) => {
    setCurrentLanguage(langCode);
    setShowLanguageSelection(false);
    
    // Add confirmation message in selected language
    const confirmationMessages = {
      en: 'Great! I will now communicate with you in English. How can I help you today?',
      hi: 'बहुत बढ़िया! अब मैं आपसे हिंदी में बात करूंगा। आज मैं आपकी कैसे मदद कर सकता हूँ?',
      kn: 'ಸೂಪರ್! ಈಗ ನಾನು ನಿಮ್ಮೊಂದಿಗೆ ಕನ್ನಡದಲ್ಲಿ ಮಾತನಾಡುತ್ತೇನೆ. ಇಂದು ನಾನು ನಿಮಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡಬಲ್ಲೆ?'
    };

    const confirmationMessage: Message = {
      id: Date.now().toString(),
      text: confirmationMessages[langCode],
      sender: 'ai',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, confirmationMessage]);
  };

  const handleLanguageButtonClick = (langCode: Language) => {
    changeLanguage(langCode);
  };

  const getPlaceholderText = () => {
    const placeholders = {
      en: 'Type here or press mic...',
      hi: 'यहाँ लिखें या माइक दबाएं...',
      kn: 'ಇಲ್ಲಿ ಟೈಪ್ ಮಾಡಿ ಅಥವಾ ಮೈಕ್ ಒತ್ತಿ...'
    };
    return placeholders[currentLanguage];
  };

  const getListeningText = () => {
    const texts = {
      en: 'Listening...',
      hi: 'सुन रहा हूँ...',
      kn: 'ಕೇಳುತ್ತಿದ್ದೇನೆ...'
    };
    return texts[currentLanguage];
  };

  if (!isOpen) return null;

  // Fullscreen view for both mobile and desktop
  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col">
      {/* Header */}
      <div className="bg-brown-800 text-white p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-headline text-xl font-bold">AI Assistant</h2>
            <p className="font-body text-sm text-white/80">
              {languages.find(lang => lang.code === currentLanguage)?.name}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {/* Language Selector - Only show after language has been selected */}
          {!showLanguageSelection && (
            <div className="relative">
              <select
                value={currentLanguage}
                onChange={(e) => setCurrentLanguage(e.target.value as Language)}
                className="bg-white/20 text-white rounded-lg px-3 py-2 font-body text-base border border-white/30 focus:border-white/50 focus:outline-none appearance-none cursor-pointer pr-8"
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code} className="text-brown-800 bg-white">
                    {lang.name}
                  </option>
                ))}
              </select>
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <div className="w-4 h-4 text-white/70 text-xs flex items-center justify-center">
                  {languages.find(lang => lang.code === currentLanguage)?.icon}
                </div>
              </div>
            </div>
          )}

          {/* Speaker Toggle */}
          {isSpeaking ? (
            <button
              onClick={stopSpeaking}
              className="p-2 bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
            >
              <VolumeX className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={() => {
                const lastAiMessage = messages.filter(m => m.sender === 'ai').pop();
                if (lastAiMessage) speakText(lastAiMessage.text);
              }}
              className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
            >
              <Volume2 className="w-5 h-5" />
            </button>
          )}

          {/* Clear Chat */}
          <button
            onClick={clearChat}
            className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
          >
            <RotateCcw className="w-5 h-5" />
          </button>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-cream-25">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex items-start space-x-3 max-w-[85%] lg:max-w-[70%] ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                message.sender === 'user' ? 'bg-brown-800' : 'bg-primary-500'
              }`}>
                {message.sender === 'user' ? (
                  <User className="w-5 h-5 text-white" />
                ) : (
                  <Bot className="w-5 h-5 text-brown-800" />
                )}
              </div>
              <div className={`p-5 rounded-lg relative ${
                message.sender === 'user' 
                  ? 'bg-brown-800 text-white' 
                  : 'bg-white text-brown-800 border border-primary-200/20'
              }`}>
                <p className="font-body text-base lg:text-lg whitespace-pre-wrap leading-relaxed">{message.text}</p>
                {message.isAudio && (
                  <div className="flex items-center space-x-1 mt-2 opacity-70">
                    <Mic className="w-4 h-4" />
                    <span className="text-sm">Audio</span>
                  </div>
                )}
                <div className="flex items-center justify-between mt-3">
                  <p className={`text-sm ${
                    message.sender === 'user' ? 'text-white/70' : 'text-brown-600'
                  }`}>
                    {message.timestamp.toLocaleTimeString('en-IN', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </p>
                  
                  {/* Individual message speaker button for AI messages */}
                  {message.sender === 'ai' && (
                    <button
                      onClick={() => speakText(message.text)}
                      className="p-2 bg-primary-500 text-brown-800 rounded hover:bg-primary-600 transition-colors ml-2"
                      disabled={isSpeaking}
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {/* Language Selection Buttons - Show after first message */}
        {showLanguageSelection && messages.length === 1 && (
          <div className="flex justify-start">
            <div className="flex items-start space-x-3 max-w-[85%] lg:max-w-[70%]">
              <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center shrink-0">
                <Bot className="w-5 h-5 text-brown-800" />
              </div>
              <div className="bg-white p-5 rounded-lg border border-primary-200/20">
                <p className="font-body text-base lg:text-lg text-brown-800 mb-4">Please select your preferred language:</p>
                <div className="space-y-3">
                  <button
                    onClick={() => handleLanguageButtonClick('en')}
                    className="w-full p-4 bg-brown-800 text-white rounded-lg text-lg font-bold hover:bg-brown-900 transition-colors"
                  >
                    ENGLISH
                  </button>
                  <button
                    onClick={() => handleLanguageButtonClick('hi')}
                    className="w-full p-4 bg-brown-800 text-white rounded-lg font-headline text-lg font-bold hover:bg-brown-900 transition-colors"
                  >
                    हिंदी
                  </button>
                  <button
                    onClick={() => handleLanguageButtonClick('kn')}
                    className="w-full p-4 bg-brown-800 text-white rounded-lg font-headline text-lg font-bold hover:bg-brown-900 transition-colors"
                  >
                    ಕನ್ನಡ
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="flex items-start space-x-3 max-w-[85%] lg:max-w-[70%]">
              <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center">
                <Bot className="w-5 h-5 text-brown-800" />
              </div>
              <div className="bg-white p-5 rounded-lg border border-primary-200/20">
                <div className="flex space-x-1">
                  <div className="w-3 h-3 bg-brown-600 rounded-full animate-bounce"></div>
                  <div className="w-3 h-3 bg-brown-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-3 h-3 bg-brown-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-6 bg-white border-t border-primary-200/20">
        <form onSubmit={handleTextSubmit} className="flex items-center space-x-4">
          <button
            type="button"
            onClick={isRecording ? stopRecording : startRecording}
            className={`p-4 rounded-lg transition-all duration-200 shrink-0 ${
              isRecording 
                ? 'bg-red-600 text-white animate-pulse' 
                : 'bg-primary-500 text-brown-800 hover:bg-primary-600'
            }`}
          >
            {isRecording ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
          </button>
          
          <div className="flex-1 relative">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={getPlaceholderText()}
              className="w-full p-4 pr-16 border border-primary-200/30 rounded-lg focus:border-primary-500 focus:ring-1 focus:ring-primary-500 font-body text-base lg:text-lg"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 p-3 bg-brown-800 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-brown-900 transition-colors"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </form>
        
        {isListening && (
          <div className="mt-4 flex items-center justify-center space-x-2 text-red-600">
            <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse"></div>
            <span className="font-body text-base">{getListeningText()}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIAgent;