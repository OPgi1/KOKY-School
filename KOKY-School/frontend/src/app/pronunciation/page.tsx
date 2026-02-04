'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/store/userStore';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { toast } from 'react-hot-toast';
import {
  Mic,
  MicOff,
  Play,
  Volume2,
  CheckCircle,
  XCircle,
  RefreshCw,
  Target,
  Users
} from 'lucide-react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-kit';

interface PronunciationExercise {
  id: string;
  word: string;
  phonetic: string;
  meaning: string;
  example: string;
  audioUrl?: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

const PRONUNCIATION_EXERCISES: PronunciationExercise[] = [
  {
    id: '1',
    word: 'Hello',
    phonetic: '/həˈloʊ/',
    meaning: 'مرحبا',
    example: 'Hello, how are you?',
    difficulty: 'beginner'
  },
  {
    id: '2',
    word: 'Thank you',
    phonetic: '/ˈθæŋk ju/',
    meaning: 'شكراً لك',
    example: 'Thank you for your help.',
    difficulty: 'beginner'
  },
  {
    id: '3',
    word: 'Beautiful',
    phonetic: '/ˈbjuːtɪfəl/',
    meaning: 'جميل',
    example: 'She is a beautiful person.',
    difficulty: 'intermediate'
  },
  {
    id: '4',
    word: 'Pronunciation',
    phonetic: '/prəˌnʌnsiˈeɪʃən/',
    meaning: 'نطق',
    example: 'Good pronunciation is important.',
    difficulty: 'advanced'
  },
  {
    id: '5',
    word: 'Communication',
    phonetic: '/kəˌmjuːnɪˈkeɪʃən/',
    meaning: 'اتصال',
    example: 'Effective communication is key.',
    difficulty: 'advanced'
  }
];

const PronunciationPage = () => {
  const router = useRouter();
  const { user, updatePronunciationProgress } = useUserStore();
  const [currentExercise, setCurrentExercise] = React.useState<PronunciationExercise | null>(null);
  const [isRecording, setIsRecording] = React.useState(false);
  const [score, setScore] = React.useState<number | null>(null);
  const [attempts, setAttempts] = React.useState(0);
  const [feedback, setFeedback] = React.useState<string>('');
  const [showAnswer, setShowAnswer] = React.useState(false);

  // Speech recognition setup
  const [transcript, setTranscript] = React.useState('');
  const [isListening, setIsListening] = React.useState(false);

  const {
    listen,
    listening,
    stop,
    resetTranscript,
  } = useSpeechRecognition({
    onResult: (result) => {
      setTranscript(result);
    },
    onEnd: () => {
      setIsListening(false);
      evaluatePronunciation(result);
    }
  });

  React.useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }
    selectRandomExercise();
  }, [user, router]);

  const selectRandomExercise = () => {
    const randomIndex = Math.floor(Math.random() * PRONUNCIATION_EXERCISES.length);
    setCurrentExercise(PRONUNCIATION_EXERCISES[randomIndex]);
    setScore(null);
    setAttempts(0);
    setFeedback('');
    setShowAnswer(false);
    setTranscript('');
  };

  const startRecording = () => {
    if (!currentExercise) return;
    
    setIsRecording(true);
    setTranscript('');
    setScore(null);
    setFeedback('');
    setShowAnswer(false);
    
    // Start listening
    listen({
      continuous: false,
      interimResults: false,
    });
    setIsListening(true);
  };

  const stopRecording = () => {
    stop();
    setIsRecording(false);
  };

  const evaluatePronunciation = (userInput: string) => {
    if (!currentExercise) return;

    const targetWord = currentExercise.word.toLowerCase();
    const userWord = userInput.toLowerCase().trim();

    // Simple similarity check (in a real app, you'd use more sophisticated algorithms)
    const similarity = calculateSimilarity(targetWord, userWord);
    const accuracy = Math.min(100, Math.max(0, similarity * 100));

    setScore(accuracy);
    setAttempts(prev => prev + 1);

    if (accuracy >= 80) {
      setFeedback('ممتاز! نطقك ممتاز');
      toast.success('أحسنت! نطقك ممتاز');
      
      // Update progress
      updatePronunciationProgress(currentExercise.word, {
        accuracy,
        attempts: attempts + 1,
        lastPracticed: new Date().toISOString()
      });
    } else if (accuracy >= 60) {
      setFeedback('جيد! يمكنك التحسن أكثر');
      toast.success('جيد! استمر في التدريب');
    } else {
      setFeedback('تحتاج للمزيد من التدريب');
      toast.error('حاول مرة أخرى');
    }
  };

  const calculateSimilarity = (str1: string, str2: string): number => {
    // Simple Levenshtein distance calculation
    const matrix: number[][] = [];

    for (let i = 0; i <= str2.length; i++) {
      matrix[i] = [i];
    }

    for (let j = 0; j <= str1.length; j++) {
      matrix[0][j] = j;
    }

    for (let i = 1; i <= str2.length; i++) {
      for (let j = 1; j <= str1.length; j++) {
        if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
          );
        }
      }
    }

    const maxLength = Math.max(str1.length, str2.length);
    return 1 - (matrix[str2.length][str1.length] / maxLength);
  };

  const playAudio = () => {
    // In a real implementation, this would play the correct pronunciation audio
    toast.info('تشغيل النطق الصحيح');
  };

  if (!user || !currentExercise) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">تدريب النطق</h1>
          <p className="text-gray-600">تحسين نطق الكلمات الإنجليزية</p>
        </div>

        {/* Progress Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="p-4 text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mx-auto mb-2">
              <Target className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900">المستوى</h3>
            <p className="text-sm text-gray-600">{currentExercise.difficulty}</p>
          </Card>

          <Card className="p-4 text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mx-auto mb-2">
              <Users className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900">عدد المحاولات</h3>
            <p className="text-sm text-gray-600">{attempts}</p>
          </Card>

          <Card className="p-4 text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mx-auto mb-2">
              <Volume2 className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900">الدقة</h3>
            <p className="text-sm text-gray-600">{score !== null ? `${score.toFixed(1)}%` : 'جاهز'}</p>
          </Card>
        </div>

        {/* Main Exercise Card */}
        <Card className="p-8 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Word Information */}
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-6xl font-bold text-gray-900 mb-2">{currentExercise.word}</h2>
                <p className="text-xl text-gray-600 mb-2">{currentExercise.phonetic}</p>
                <p className="text-lg text-gray-700">{currentExercise.meaning}</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">مثال:</h3>
                <p className="text-gray-700 italic">{currentExercise.example}</p>
              </div>

              <div className="flex gap-4 justify-center">
                <Button 
                  variant="outline" 
                  onClick={playAudio}
                  className="flex items-center space-x-2 space-x-reverse"
                >
                  <Volume2 className="w-5 h-5" />
                  <span>سماع النطق</span>
                </Button>
                
                <Button 
                  variant="outline" 
                  onClick={() => setShowAnswer(!showAnswer)}
                  className="flex items-center space-x-2 space-x-reverse"
                >
                  <span>{showAnswer ? 'إخفاء' : 'عرض'} الإجابة</span>
                </Button>
              </div>

              {showAnswer && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h3 className="font-semibold text-green-900 mb-2">الإجابة الصحيحة:</h3>
                  <p className="text-green-800">{currentExercise.word}</p>
                </div>
              )}
            </div>

            {/* Pronunciation Interface */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg p-6 border-2 border-dashed border-gray-300">
                <div className="text-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">سجل صوتك</h3>
                  <p className="text-sm text-gray-600">قل الكلمة كما تسمعها</p>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-center">
                    <div className={`relative w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isRecording ? 'bg-red-500 shadow-lg animate-pulse' : 'bg-gray-200'
                    }`}>
                      {isRecording ? (
                        <MicOff className="w-8 h-8 text-white" />
                      ) : (
                        <Mic className="w-8 h-8 text-gray-600" />
                      )}
                    </div>
                  </div>

                  <div className="flex gap-4 justify-center">
                    <Button
                      onClick={startRecording}
                      disabled={isRecording}
                      className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white"
                    >
                      <Mic className="w-5 h-5 ml-2" />
                      بدء التسجيل
                    </Button>
                    
                    <Button
                      onClick={stopRecording}
                      disabled={!isRecording}
                      variant="outline"
                    >
                      <MicOff className="w-5 h-5 ml-2" />
                      إيقاف
                    </Button>
                  </div>
                </div>
              </div>

              {/* Results */}
              {score !== null && (
                <div className={`p-4 rounded-lg ${
                  score >= 80 ? 'bg-green-50 border border-green-200' : 
                  score >= 60 ? 'bg-yellow-50 border border-yellow-200' : 
                  'bg-red-50 border border-red-200'
                }`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 space-x-reverse">
                      {score >= 80 ? (
                        <CheckCircle className="w-6 h-6 text-green-600" />
                      ) : score >= 60 ? (
                        <CheckCircle className="w-6 h-6 text-yellow-600" />
                      ) : (
                        <XCircle className="w-6 h-6 text-red-600" />
                      )}
                      <div>
                        <p className="font-semibold text-gray-900">النتيجة: {score.toFixed(1)}%</p>
                        <p className="text-sm text-gray-600">{feedback}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Transcript */}
              {transcript && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">ما قلته:</h4>
                  <p className="text-gray-700">{transcript}</p>
                </div>
              )}
            </div>
          </div>
        </Card>

        {/* Actions */}
        <div className="flex gap-4 justify-center">
          <Button 
            onClick={selectRandomExercise}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
          >
            <RefreshCw className="w-5 h-5 ml-2" />
            كلمة جديدة
          </Button>
          
          <Button 
            variant="outline"
            onClick={() => router.push('/lessons')}
          >
            العودة للدروس
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PronunciationPage;