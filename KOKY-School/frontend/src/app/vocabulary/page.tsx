'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/store/userStore';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { toast } from 'react-hot-toast';
import {
  Book,
  Star,
  CheckCircle,
  XCircle,
  Target,
  Clock,
  Award,
  Users,
  Plus,
  Search,
  Filter
} from 'lucide-react';

interface VocabularyWord {
  id: string;
  word: string;
  meaning: string;
  example: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  mastered: boolean;
  lastReviewed: string;
  difficulty: number;
}

interface GrammarRule {
  id: string;
  title: string;
  rule: string;
  example: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  mastered: boolean;
  lastPracticed: string;
}

const VOCABULARY_WORDS: VocabularyWord[] = [
  {
    id: '1',
    word: 'Hello',
    meaning: 'مرحبا',
    example: 'Hello, how are you?',
    level: 'beginner',
    category: 'Greetings',
    mastered: false,
    lastReviewed: '',
    difficulty: 1
  },
  {
    id: '2',
    word: 'Beautiful',
    meaning: 'جميل',
    example: 'She is a beautiful person.',
    level: 'intermediate',
    category: 'Adjectives',
    mastered: false,
    lastReviewed: '',
    difficulty: 3
  },
  {
    id: '3',
    word: 'Communication',
    meaning: 'اتصال',
    example: 'Effective communication is key.',
    level: 'advanced',
    category: 'Nouns',
    mastered: false,
    lastReviewed: '',
    difficulty: 5
  }
];

const GRAMMAR_RULES: GrammarRule[] = [
  {
    id: '1',
    title: 'Present Simple',
    rule: 'We use present simple for habits, general truths, and permanent situations.',
    example: 'I work every day. Water boils at 100°C.',
    level: 'beginner',
    category: 'Tenses',
    mastered: false,
    lastPracticed: ''
  },
  {
    id: '2',
    title: 'Past Continuous',
    rule: 'We use past continuous for actions that were in progress at a specific time in the past.',
    example: 'I was studying when you called.',
    level: 'intermediate',
    category: 'Tenses',
    mastered: false,
    lastPracticed: ''
  }
];

const VocabularyPage = () => {
  const router = useRouter();
  const { user, addVocabularyWord, updateVocabularyWord, addGrammarProgress } = useUserStore();
  const [activeTab, setActiveTab] = React.useState<'vocabulary' | 'grammar'>('vocabulary');
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedLevel, setSelectedLevel] = React.useState<string>('all');
  const [selectedCategory, setSelectedCategory] = React.useState<string>('all');
  const [showReview, setShowReview] = React.useState(false);
  const [currentWord, setCurrentWord] = React.useState<VocabularyWord | null>(null);
  const [currentGrammar, setCurrentGrammar] = React.useState<GrammarRule | null>(null);
  const [userAnswer, setUserAnswer] = React.useState('');
  const [showAnswer, setShowAnswer] = React.useState(false);
  const [score, setScore] = React.useState(0);
  const [attempts, setAttempts] = React.useState(0);

  const categories = ['all', 'Greetings', 'Adjectives', 'Nouns', 'Verbs', 'Tenses'];
  const levels = ['all', 'beginner', 'intermediate', 'advanced'];

  const filteredVocabulary = VOCABULARY_WORDS.filter(word => {
    const matchesSearch = word.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         word.meaning.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = selectedLevel === 'all' || word.level === selectedLevel;
    const matchesCategory = selectedCategory === 'all' || word.category === selectedCategory;
    return matchesSearch && matchesLevel && matchesCategory;
  });

  const filteredGrammar = GRAMMAR_RULES.filter(rule => {
    const matchesSearch = rule.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         rule.rule.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = selectedLevel === 'all' || rule.level === selectedLevel;
    const matchesCategory = selectedCategory === 'all' || rule.category === selectedCategory;
    return matchesSearch && matchesLevel && matchesCategory;
  });

  const startReview = () => {
    if (activeTab === 'vocabulary') {
      const randomWord = filteredVocabulary[Math.floor(Math.random() * filteredVocabulary.length)];
      setCurrentWord(randomWord);
      setCurrentGrammar(null);
    } else {
      const randomRule = filteredGrammar[Math.floor(Math.random() * filteredGrammar.length)];
      setCurrentGrammar(randomRule);
      setCurrentWord(null);
    }
    setShowReview(true);
    setUserAnswer('');
    setShowAnswer(false);
    setScore(0);
    setAttempts(0);
  };

  const checkAnswer = () => {
    if (activeTab === 'vocabulary' && currentWord) {
      const isCorrect = userAnswer.toLowerCase().trim() === currentWord.meaning.toLowerCase();
      setShowAnswer(true);
      setAttempts(prev => prev + 1);
      
      if (isCorrect) {
        setScore(prev => prev + 1);
        toast.success('إجابة صحيحة!');
        updateVocabularyWord(currentWord.id, {
          mastered: true,
          lastReviewed: new Date().toISOString()
        });
      } else {
        toast.error(`الإجابة الصحيحة: ${currentWord.meaning}`);
      }
    }
  };

  const nextWord = () => {
    startReview();
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">المفردات والقواعد</h1>
          <p className="text-gray-600">توسيع المفردات وتعلم القواعد النحوية</p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg p-1 shadow-lg">
            <button
              onClick={() => setActiveTab('vocabulary')}
              className={`px-6 py-2 rounded-md font-semibold transition-all ${
                activeTab === 'vocabulary'
                  ? 'bg-primary-600 text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Book className="w-5 h-5 inline mr-2" />
              المفردات
            </button>
            <button
              onClick={() => setActiveTab('grammar')}
              className={`px-6 py-2 rounded-md font-semibold transition-all ${
                activeTab === 'grammar'
                  ? 'bg-primary-600 text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Target className="w-5 h-5 inline mr-2" />
              القواعد
            </button>
          </div>
        </div>

        {!showReview ? (
          <div className="space-y-6">
            
            {/* Filters */}
            <Card className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="بحث..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                
                <select
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  {levels.map(level => (
                    <option key={level} value={level}>
                      {level === 'all' ? 'جميع المستويات' : 
                       level === 'beginner' ? 'مبتدئ' :
                       level === 'intermediate' ? 'متوسط' : 'متقدم'}
                    </option>
                  ))}
                </select>

                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category === 'all' ? 'جميع الفئات' : category}
                    </option>
                  ))}
                </select>

                <Button
                  onClick={startReview}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                >
                  <Star className="w-5 h-5 ml-2" />
                  بدء المراجعة
                </Button>
              </div>
            </Card>

            {/* Vocabulary List */}
            {activeTab === 'vocabulary' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredVocabulary.map(word => (
                  <Card key={word.id} className="p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-2xl font-bold text-gray-900">{word.word}</h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getLevelColor(word.level)}`}>
                        {word.level}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 mb-3">{word.meaning}</p>
                    <p className="text-sm text-gray-500 italic mb-4">{word.example}</p>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>الفئة: {word.category}</span>
                      <span className={word.mastered ? 'text-green-600' : 'text-gray-400'}>
                        {word.mastered ? 'مُتقن' : 'يحتاج المراجعة'}
                      </span>
                    </div>
                  </Card>
                ))}
              </div>
            )}

            {/* Grammar List */}
            {activeTab === 'grammar' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredGrammar.map(rule => (
                  <Card key={rule.id} className="p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-gray-900">{rule.title}</h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getLevelColor(rule.level)}`}>
                        {rule.level}
                      </span>
                    </div>
                    
                    <p className="text-gray-700 mb-4">{rule.rule}</p>
                    <p className="text-sm text-gray-600 italic mb-4">مثال: {rule.example}</p>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>الفئة: {rule.category}</span>
                      <span className={rule.mastered ? 'text-green-600' : 'text-gray-400'}>
                        {rule.mastered ? 'مُتقن' : 'يحتاج المراجعة'}
                      </span>
                    </div>
                  </Card>
                ))}
              </div>
            )}

            {filteredVocabulary.length === 0 && activeTab === 'vocabulary' && (
              <div className="text-center py-12">
                <p className="text-gray-500">لا توجد كلمات مطابقة للبحث</p>
              </div>
            )}

            {filteredGrammar.length === 0 && activeTab === 'grammar' && (
              <div className="text-center py-12">
                <p className="text-gray-500">لا توجد قواعد مطابقة للبحث</p>
              </div>
            )}

          </div>
        ) : (
          /* Review Mode */
          <Card className="p-8">
            <div className="text-center space-y-6">
              <div className="flex justify-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
                  <Star className="w-8 h-8 text-primary-600" />
                </div>
              </div>
              
              <h2 className="text-3xl font-bold text-gray-900">
                {activeTab === 'vocabulary' ? 'مراجعة الكلمة' : 'مراجعة القاعدة'}
              </h2>

              {activeTab === 'vocabulary' && currentWord && (
                <div className="space-y-4">
                  <h3 className="text-4xl font-bold text-primary-600">{currentWord.word}</h3>
                  <p className="text-lg text-gray-600">ما معنى هذه الكلمة؟</p>
                  
                  <input
                    type="text"
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    placeholder="اكتب إجابتك هنا..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-right"
                    onKeyPress={(e) => e.key === 'Enter' && checkAnswer()}
                  />
                  
                  <div className="flex gap-4 justify-center">
                    <Button
                      onClick={checkAnswer}
                      disabled={!userAnswer.trim()}
                      className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white"
                    >
                      <CheckCircle className="w-5 h-5 ml-2" />
                      التحقق من الإجابة
                    </Button>
                    
                    <Button
                      onClick={() => setShowAnswer(true)}
                      variant="outline"
                    >
                      <Search className="w-5 h-5 ml-2" />
                      عرض الإجابة
                    </Button>
                  </div>

                  {showAnswer && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <p className="text-green-800 font-semibold">الإجابة الصحيحة: {currentWord.meaning}</p>
                      <p className="text-green-700 text-sm mt-2">مثال: {currentWord.example}</p>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'grammar' && currentGrammar && (
                <div className="space-y-4 text-right">
                  <h3 className="text-2xl font-bold text-primary-600">{currentGrammar.title}</h3>
                  <p className="text-lg text-gray-600">ما القاعدة النحوية لهذه الجملة؟</p>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-gray-800 italic">{currentGrammar.example}</p>
                  </div>
                  
                  <input
                    type="text"
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    placeholder="اكتب إجابتك هنا..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-right"
                    onKeyPress={(e) => e.key === 'Enter' && checkAnswer()}
                  />
                  
                  <div className="flex gap-4 justify-center">
                    <Button
                      onClick={checkAnswer}
                      disabled={!userAnswer.trim()}
                      className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white"
                    >
                      <CheckCircle className="w-5 h-5 ml-2" />
                      التحقق من الإجابة
                    </Button>
                    
                    <Button
                      onClick={() => setShowAnswer(true)}
                      variant="outline"
                    >
                      <Search className="w-5 h-5 ml-2" />
                      عرض الإجابة
                    </Button>
                  </div>

                  {showAnswer && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <p className="text-green-800 font-semibold">القاعدة: {currentGrammar.rule}</p>
                    </div>
                  )}
                </div>
              )}

              <div className="flex gap-4 justify-center">
                <Button
                  onClick={nextWord}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white"
                >
                  <Plus className="w-5 h-5 ml-2" />
                  كلمة جديدة
                </Button>
                
                <Button
                  onClick={() => setShowReview(false)}
                  variant="outline"
                >
                  العودة للقائمة
                </Button>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default VocabularyPage;