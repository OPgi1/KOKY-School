'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/store/userStore';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { toast } from 'react-hot-toast';
import {
  BookOpen,
  CheckCircle,
  XCircle,
  HelpCircle,
  Clock,
  Award,
  Users,
  Target
} from 'lucide-react';

interface ReadingPassage {
  id: string;
  title: string;
  content: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  questions: ReadingQuestion[];
}

interface ReadingQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const READING_PASSAGES: ReadingPassage[] = [
  {
    id: '1',
    title: 'A Day at the Park',
    level: 'beginner',
    content: `Sarah and her family went to the park on a sunny Saturday morning. The sky was blue and the birds were singing. Sarah played on the swings while her brother Tom played on the slide. Their parents sat on a bench and watched them. They brought sandwiches and juice for lunch. After eating, they played a game of catch with a ball. It was a wonderful day at the park.`,
    questions: [
      {
        id: '1',
        question: 'What day of the week did Sarah go to the park?',
        options: ['Monday', 'Friday', 'Saturday', 'Sunday'],
        correctAnswer: 2,
        explanation: 'The story says "Sarah and her family went to the park on a sunny Saturday morning."'
      },
      {
        id: '2',
        question: 'What did Sarah play on?',
        options: ['Slide', 'Swings', 'Ball', 'Bench'],
        correctAnswer: 1,
        explanation: 'The story says "Sarah played on the swings while her brother Tom played on the slide."'
      },
      {
        id: '3',
        question: 'What did they bring for lunch?',
        options: ['Pizza', 'Sandwiches and juice', 'Fruit', 'Ice cream'],
        correctAnswer: 1,
        explanation: 'The story says "They brought sandwiches and juice for lunch."'
      }
    ]
  },
  {
    id: '2',
    title: 'The Library Adventure',
    level: 'intermediate',
    content: `Emma loved reading books. Every Saturday, she visited the library near her house. The library had thousands of books on many different topics. Emma always looked for new adventure stories. One day, she found a mysterious book with a golden cover. The book was about ancient Egypt and had pictures of pyramids and pharaohs. Emma was so excited that she checked out the book and read it in one day. She learned many interesting facts about ancient Egyptian life, including how they built the pyramids and what they believed about the afterlife.`,
    questions: [
      {
        id: '1',
        question: 'How often did Emma visit the library?',
        options: ['Every day', 'Every week', 'Every month', 'Once a year'],
        correctAnswer: 1,
        explanation: 'The story says "Every Saturday, she visited the library near her house."'
      },
      {
        id: '2',
        question: 'What made the book special?',
        options: ['It was very old', 'It had a golden cover', 'It was about animals', 'It was very big'],
        correctAnswer: 1,
        explanation: 'The story says "One day, she found a mysterious book with a golden cover."'
      },
      {
        id: '3',
        question: 'What did Emma learn about?',
        options: ['Modern technology', 'Ancient Egypt', 'Space travel', 'Ocean life'],
        correctAnswer: 1,
        explanation: 'The story says "The book was about ancient Egypt and had pictures of pyramids and pharaohs."'
      }
    ]
  }
];

const ReadingPage = () => {
  const router = useRouter();
  const { user, updateProgress } = useUserStore();
  const [currentPassage, setCurrentPassage] = React.useState<ReadingPassage | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0);
  const [selectedAnswers, setSelectedAnswers] = React.useState<number[]>([]);
  const [showResults, setShowResults] = React.useState(false);
  const [score, setScore] = React.useState(0);
  const [timeLeft, setTimeLeft] = React.useState(300); // 5 minutes
  const [isTimerRunning, setIsTimerRunning] = React.useState(false);

  React.useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }
    selectRandomPassage();
  }, [user, router]);

  React.useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isTimerRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      handleSubmit();
    }
    return () => clearInterval(timer);
  }, [isTimerRunning, timeLeft]);

  const selectRandomPassage = () => {
    const randomIndex = Math.floor(Math.random() * READING_PASSAGES.length);
    setCurrentPassage(READING_PASSAGES[randomIndex]);
    setCurrentQuestionIndex(0);
    setSelectedAnswers([]);
    setShowResults(false);
    setScore(0);
    setTimeLeft(300);
    setIsTimerRunning(true);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestionIndex] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < (currentPassage?.questions.length || 0) - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    if (!currentPassage) return;
    
    setIsTimerRunning(false);
    setShowResults(true);
    
    let correctAnswers = 0;
    currentPassage.questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        correctAnswers++;
      }
    });
    
    const percentage = (correctAnswers / currentPassage.questions.length) * 100;
    setScore(percentage);
    
    // Update user progress
    updateProgress(Math.floor(percentage * 10));
    
    if (percentage >= 80) {
      toast.success('ممتاز! أحسنت القراءة والفهم');
    } else if (percentage >= 60) {
      toast.success('جيد! يمكنك التحسن أكثر');
    } else {
      toast.error('تحتاج للقراءة أكثر');
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  if (!user || !currentPassage) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  const currentQuestion = currentPassage.questions[currentQuestionIndex];
  const isAnswered = selectedAnswers[currentQuestionIndex] !== undefined;
  const isLastQuestion = currentQuestionIndex === currentPassage.questions.length - 1;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">القراءة والفهم</h1>
          <p className="text-gray-600">تحسين مهارات القراءة والفهم</p>
        </div>

        {/* Timer and Progress */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="p-4 text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mx-auto mb-2">
              <Clock className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900">الوقت المتبقي</h3>
            <p className={`text-2xl font-bold ${
              timeLeft < 60 ? 'text-red-600' : timeLeft < 120 ? 'text-yellow-600' : 'text-green-600'
            }`}>
              {formatTime(timeLeft)}
            </p>
          </Card>

          <Card className="p-4 text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mx-auto mb-2">
              <Target className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900">المستوى</h3>
            <p className="text-sm text-gray-600">{currentPassage.level}</p>
          </Card>

          <Card className="p-4 text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mx-auto mb-2">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900">السؤال</h3>
            <p className="text-sm text-gray-600">{currentQuestionIndex + 1} من {currentPassage.questions.length}</p>
          </Card>
        </div>

        {!showResults ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Reading Passage */}
            <Card className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">{currentPassage.title}</h2>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    currentPassage.level === 'beginner' ? 'bg-green-100 text-green-800' :
                    currentPassage.level === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {currentPassage.level}
                  </span>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-800 leading-relaxed text-right">{currentPassage.content}</p>
                </div>
              </div>
            </Card>

            {/* Questions */}
            <Card className="p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    السؤال {currentQuestionIndex + 1}
                  </h3>
                  <p className="text-gray-700">{currentQuestion.question}</p>
                </div>

                <div className="space-y-3">
                  {currentQuestion.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswerSelect(index)}
                      className={`w-full text-right text-lg p-4 rounded-lg border-2 transition-all duration-200 text-gray-800 ${
                        selectedAnswers[currentQuestionIndex] === index
                          ? 'border-primary-500 bg-primary-50'
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{option}</span>
                        <span className="text-xs text-gray-500">الإجابة {index + 1}</span>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Navigation */}
                <div className="flex gap-4 justify-between pt-4 border-t border-gray-200">
                  <div className="flex gap-2">
                    {currentPassage.questions.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentQuestionIndex(index)}
                        className={`w-8 h-8 rounded-full text-sm font-semibold transition-all ${
                          index === currentQuestionIndex
                            ? 'bg-primary-600 text-white'
                            : selectedAnswers[index] !== undefined
                            ? 'bg-green-500 text-white'
                            : 'bg-gray-200 text-gray-700'
                        }`}
                      >
                        {index + 1}
                      </button>
                    ))}
                  </div>

                  <div className="flex gap-4">
                    <Button
                      onClick={handlePreviousQuestion}
                      disabled={currentQuestionIndex === 0}
                      variant="outline"
                    >
                      السابق
                    </Button>
                    
                    {isLastQuestion ? (
                      <Button
                        onClick={handleSubmit}
                        disabled={!isAnswered}
                        className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white"
                      >
                        تقديم الإجابات
                      </Button>
                    ) : (
                      <Button
                        onClick={handleNextQuestion}
                        disabled={!isAnswered}
                      >
                        التالي
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        ) : (
          /* Results */
          <Card className="p-8">
            <div className="text-center space-y-6">
              <div className="flex justify-center">
                {score >= 80 ? (
                  <Award className="w-16 h-16 text-yellow-500" />
                ) : score >= 60 ? (
                  <CheckCircle className="w-16 h-16 text-green-500" />
                ) : (
                  <XCircle className="w-16 h-16 text-red-500" />
                )}
              </div>
              
              <h2 className="text-3xl font-bold text-gray-900">نتيجتك</h2>
              <p className="text-6xl font-bold text-primary-600">{Math.round(score)}%</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-semibold text-green-900 mb-2">الإجابات الصحيحة</h4>
                  <p className="text-green-800">
                    {currentPassage.questions.filter((_, index) => 
                      selectedAnswers[index] === currentPassage.questions[index].correctAnswer
                    ).length} من {currentPassage.questions.length}
                  </p>
                </div>
                
                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-900 mb-2">المستوى</h4>
                  <p className="text-blue-800">{currentPassage.level}</p>
                </div>
                
                <div className="bg-purple-50 rounded-lg p-4">
                  <h4 className="font-semibold text-purple-900 mb-2">الوقت المستخدم</h4>
                  <p className="text-purple-800">{formatTime(300 - timeLeft)}</p>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900">مراجعة الإجابات:</h4>
                {currentPassage.questions.map((question, index) => (
                  <div key={question.id} className="text-right">
                    <p className="text-gray-700 mb-2">{question.question}</p>
                    <p className={`font-semibold ${
                      selectedAnswers[index] === question.correctAnswer
                        ? 'text-green-600'
                        : 'text-red-600'
                    }`}>
                      إجابتك: {question.options[selectedAnswers[index] || 0]} 
                      {selectedAnswers[index] === question.correctAnswer ? ' ✓' : ' ✗'}
                    </p>
                    <p className="text-gray-600 text-sm">{question.explanation}</p>
                  </div>
                ))}
              </div>

              <div className="flex gap-4 justify-center">
                <Button
                  onClick={selectRandomPassage}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white"
                >
                  <RefreshCw className="w-5 h-5 ml-2" />
                  قراءة جديدة
                </Button>
                
                <Button
                  variant="outline"
                  onClick={() => router.push('/lessons')}
                >
                  العودة للدروس
                </Button>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ReadingPage;