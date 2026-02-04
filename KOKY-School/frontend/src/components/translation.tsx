'use client';

import * as React from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { toast } from 'react-hot-toast';
import { 
  Languages,
  Copy,
  RefreshCw,
  Volume2,
  CheckCircle,
  XCircle
} from 'lucide-react';

interface TranslationResult {
  original: string;
  translated: string;
  from: string;
  to: string;
  confidence: number;
}

const TranslationComponent = () => {
  const [inputText, setInputText] = React.useState('');
  const [outputText, setOutputText] = React.useState('');
  const [isTranslating, setIsTranslating] = React.useState(false);
  const [fromLanguage, setFromLanguage] = React.useState('ar');
  const [toLanguage, setToLanguage] = React.useState('en');
  const [history, setHistory] = React.useState<TranslationResult[]>([]);

  const languages = [
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
  ];

  const translateText = async () => {
    if (!inputText.trim()) {
      toast.error('يرجى إدخال نص للترجمة');
      return;
    }

    setIsTranslating(true);
    
    // Simulate translation API call
    setTimeout(() => {
      const translated = mockTranslate(inputText, fromLanguage, toLanguage);
      setOutputText(translated);
      
      const result: TranslationResult = {
        original: inputText,
        translated,
        from: fromLanguage,
        to: toLanguage,
        confidence: 0.95
      };
      
      setHistory(prev => [result, ...prev.slice(0, 9)]); // Keep last 10 translations
      setIsTranslating(false);
      toast.success('تمت الترجمة بنجاح');
    }, 1000);
  };

  const mockTranslate = (text: string, from: string, to: string): string => {
    // Simple mock translations for demo
    const translations: { [key: string]: string } = {
      'مرحبا': 'Hello',
      'كيف حالك': 'How are you',
      'أنا بخير': 'I am fine',
      'شكرا': 'Thank you',
      'من فضلك': 'Please',
      'مع السلامة': 'Goodbye',
      'ما اسمك': 'What is your name',
      'أنا أتعلم الإنجليزية': 'I am learning English',
      'هذا جميل': 'This is beautiful',
      'كم الساعة': 'What time is it',
      'أين المدرسة': 'Where is the school',
      'أريد ماء': 'I want water',
      'كم السعر': 'How much is it',
      'أحتاج مساعدة': 'I need help',
      'أحب القراءة': 'I love reading',
      'الطقس جميل': 'The weather is nice',
      'أريد أن أتحدث': 'I want to speak',
      'هذا صعب': 'This is difficult',
      'أنا فهمت': 'I understood',
      'كرر من فضلك': 'Repeat please',
    };

    if (from === 'ar' && to === 'en') {
      return translations[text] || `${text} (ترجمة وهمية)`;
    } else if (from === 'en' && to === 'ar') {
      // Reverse lookup
      const reverseTranslations = Object.entries(translations).reduce((acc, [ar, en]) => {
        acc[en] = ar;
        return acc;
      }, {} as { [key: string]: string });
      return reverseTranslations[text] || `${text} (Mock translation)`;
    }
    
    return text;
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success('تم النسخ إلى الحافظة');
    } catch (err) {
      toast.error('فشل النسخ إلى الحافظة');
    }
  };

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = toLanguage === 'ar' ? 'ar-SA' : 'en-US';
      utterance.rate = 0.9;
      utterance.pitch = 1;
      speechSynthesis.speak(utterance);
    } else {
      toast.error('المتصفح لا يدعم قراءة النص');
    }
  };

  const swapLanguages = () => {
    setFromLanguage(toLanguage);
    setToLanguage(fromLanguage);
    setInputText(outputText);
    setOutputText(inputText);
  };

  const clearText = () => {
    setInputText('');
    setOutputText('');
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2 space-x-reverse">
          <Languages className="w-5 h-5" />
          <span>الترجمة الفورية</span>
        </h3>
        <div className="flex items-center space-x-2">
          <select
            value={fromLanguage}
            onChange={(e) => setFromLanguage(e.target.value)}
            className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            {languages.map(lang => (
              <option key={lang.code} value={lang.code}>
                {lang.flag} {lang.name}
              </option>
            ))}
          </select>
          
          <Button
            variant="outline"
            size="sm"
            onClick={swapLanguages}
            className="p-2"
          >
            <RefreshCw className="w-4 h-4" />
          </Button>
          
          <select
            value={toLanguage}
            onChange={(e) => setToLanguage(e.target.value)}
            className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            {languages.map(lang => (
              <option key={lang.code} value={lang.code}>
                {lang.flag} {lang.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Input */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            النص الأصلي ({fromLanguage === 'ar' ? 'العربية' : 'الإنجليزية'})
          </label>
          <div className="relative">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={`اكتب النص هنا... (${fromLanguage === 'ar' ? 'جرب: مرحبا' : 'Try: Hello'})`}
              className="w-full h-32 p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <div className="absolute bottom-2 left-2 right-2 flex justify-between text-xs text-gray-500">
              <span>{inputText.length}/500</span>
              <div className="flex space-x-2">
                <button
                  onClick={clearText}
                  className="hover:text-gray-700"
                  title="مسح"
                >
                  مسح
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Output */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            النص المترجم ({toLanguage === 'ar' ? 'العربية' : 'الإنجليزية'})
          </label>
          <div className="relative">
            <textarea
              value={outputText}
              readOnly
              placeholder="ستظهر الترجمة هنا..."
              className="w-full h-32 p-3 border border-gray-300 rounded-lg resize-none bg-gray-50"
            />
            {outputText && (
              <div className="absolute top-2 right-2 flex space-x-2">
                <button
                  onClick={() => speakText(outputText)}
                  className="p-2 hover:bg-gray-200 rounded-full"
                  title="قراءة النص"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => copyToClipboard(outputText)}
                  className="p-2 hover:bg-gray-200 rounded-full"
                  title="نسخ إلى الحافظة"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-center mt-4">
        <Button
          onClick={translateText}
          disabled={isTranslating || !inputText.trim()}
          className="bg-gradient-to-r from-primary-600 to-accent-500 hover:from-primary-700 hover:to-accent-600 text-white px-8 py-2"
        >
          {isTranslating ? (
            <div className="flex items-center space-x-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              <span>جاري الترجمة...</span>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Languages className="w-5 h-5" />
              <span>ترجم</span>
            </div>
          )}
        </Button>
      </div>

      {/* Quick Examples */}
      {fromLanguage === 'ar' && (
        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800 mb-2">نصوص تجريبية:</p>
          <div className="flex flex-wrap gap-2">
            {['مرحبا', 'كيف حالك', 'أنا أتعلم الإنجليزية', 'هذا جميل'].map((text, index) => (
              <button
                key={index}
                onClick={() => setInputText(text)}
                className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm hover:bg-blue-200 transition-colors"
              >
                {text}
              </button>
            ))}
          </div>
        </div>
      )}

      {fromLanguage === 'en' && (
        <div className="mt-4 p-3 bg-green-50 rounded-lg">
          <p className="text-sm text-green-800 mb-2">Sample texts:</p>
          <div className="flex flex-wrap gap-2">
            {['Hello', 'How are you', 'I am learning English', 'This is beautiful'].map((text, index) => (
              <button
                key={index}
                onClick={() => setInputText(text)}
                className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm hover:bg-green-200 transition-colors"
              >
                {text}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Translation History */}
      {history.length > 0 && (
        <div className="mt-6">
          <h4 className="text-sm font-medium text-gray-700 mb-2">تاريخ الترجمة</h4>
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {history.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg text-sm">
                <div className="flex items-center space-x-2 space-x-reverse">
                  <span className="text-gray-600">{item.original}</span>
                  <span className="text-gray-400">→</span>
                  <span className="font-medium">{item.translated}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-gray-500">{item.from} → {item.to}</span>
                  <CheckCircle className="w-4 h-4 text-green-500" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
};

export default TranslationComponent;