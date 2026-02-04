'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/store/userStore';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { toast } from 'react-hot-toast';
import {
  BarChart3,
  LineChart,
  PieChart,
  Target,
  Award,
  Star,
  TrendingUp,
  Calendar,
  Clock,
  Users,
  BookOpen,
  Mic,
  PenTool
} from 'lucide-react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar, Line, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const ProgressPage = () => {
  const router = useRouter();
  const { user } = useUserStore();
  const [activeTab, setActiveTab] = React.useState<'overview' | 'detailed' | 'achievements'>('overview');

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner': return '#10b981';
      case 'intermediate': return '#f59e0b';
      case 'advanced': return '#3b82f6';
      default: return '#6b7280';
    }
  };

  const getProgressPercentage = () => {
    if (!user) return 0;
    return user.progress;
  };

  const getLevelProgress = () => {
    if (!user) return 0;
    const levelThresholds = { beginner: 33, intermediate: 66, advanced: 100 };
    const currentLevel = user.level;
    const nextLevel = currentLevel === 'beginner' ? 'intermediate' : currentLevel === 'intermediate' ? 'advanced' : 'advanced';
    const currentThreshold = levelThresholds[currentLevel];
    const nextThreshold = levelThresholds[nextLevel];
    const progress = user.progress;
    
    if (progress <= currentThreshold) {
      return (progress / currentThreshold) * 100;
    } else {
      return ((progress - currentThreshold) / (nextThreshold - currentThreshold)) * 100;
    }
  };

  const getDailyStreakColor = () => {
    if (!user) return '#6b7280';
    const streak = user.dailyStreak;
    if (streak >= 7) return '#f59e0b';
    if (streak >= 3) return '#10b981';
    return '#6b7280';
  };

  const chartData = {
    labels: ['النطق', 'القراءة', 'الكتابة', 'المفردات', 'القواعد'],
    datasets: [
      {
        label: 'التقدم (%)',
        data: [85, 72, 68, 90, 75],
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(34, 197, 94, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(168, 85, 247, 0.8)',
          'rgba(239, 68, 68, 0.8)',
        ],
        borderColor: [
          'rgba(59, 130, 246, 1)',
          'rgba(34, 197, 94, 1)',
          'rgba(245, 158, 11, 1)',
          'rgba(168, 85, 247, 1)',
          'rgba(239, 68, 68, 1)',
        ],
        borderWidth: 2,
      },
    ],
  };

  const timeData = {
    labels: ['الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت', 'الأحد'],
    datasets: [
      {
        label: 'ساعات الدراسة',
        data: [1.5, 2.0, 1.0, 2.5, 1.8, 0.5, 0.0],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
      },
    ],
  };

  const achievements = [
    { id: '1', title: 'المبتدئ المثابر', description: 'أكملت 10 دروس في المستوى المبتدئ', icon: '🌟', date: '2024-01-15' },
    { id: '2', title: 'قارئ نشيط', description: 'قرأت 20 قصة قصيرة', icon: '📚', date: '2024-01-20' },
    { id: '3', title: 'متحدث ممتاز', description: 'حصلت على 90% في اختبار النطق', icon: '🎤', date: '2024-01-25' },
    { id: '4', title: 'كاتب محترف', description: 'كتبت 15 مقالة بدون أخطاء', icon: '✍️', date: '2024-01-30' },
  ];

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">تقرير التقدم</h1>
          <p className="text-gray-600">تابع تقدمك واحصل على إلهام للاستمرار</p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg p-1 shadow-lg">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-6 py-2 rounded-md font-semibold transition-all ${
                activeTab === 'overview'
                  ? 'bg-primary-600 text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <BarChart3 className="w-5 h-5 inline mr-2" />
              نظرة عامة
            </button>
            <button
              onClick={() => setActiveTab('detailed')}
              className={`px-6 py-2 rounded-md font-semibold transition-all ${
                activeTab === 'detailed'
                  ? 'bg-primary-600 text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <LineChart className="w-5 h-5 inline mr-2" />
              تفاصيل مفصلة
            </button>
            <button
              onClick={() => setActiveTab('achievements')}
              className={`px-6 py-2 rounded-md font-semibold transition-all ${
                activeTab === 'achievements'
                  ? 'bg-primary-600 text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Award className="w-5 h-5 inline mr-2" />
              الإنجازات
            </button>
          </div>
        </div>

        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Main Progress */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <Card className="p-6 text-center">
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full mx-auto mb-4">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">المستوى الحالي</h3>
                <p className={`text-3xl font-bold ${user.level === 'beginner' ? 'text-green-600' : user.level === 'intermediate' ? 'text-yellow-600' : 'text-blue-600'}`}>
                  {user.level === 'beginner' ? 'مبتدئ' : user.level === 'intermediate' ? 'متوسط' : 'متقدم'}
                </p>
                <div className="mt-4">
                  <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
                    <div 
                      className="h-4 rounded-full" 
                      style={{ 
                        width: `${getLevelProgress()}%`,
                        backgroundColor: getLevelColor(user.level)
                      }}
                    />
                  </div>
                  <p className="text-sm text-gray-600">{Math.round(getLevelProgress())}% نحو المستوى التالي</p>
                </div>
              </Card>

              <Card className="p-6 text-center">
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full mx-auto mb-4">
                  <Calendar className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">الاستمرارية</h3>
                <p className="text-3xl font-bold" style={{ color: getDailyStreakColor() }}>
                  {user.dailyStreak} يوم
                </p>
                <p className="text-sm text-gray-600 mt-2">أيام متتالية</p>
              </Card>

              <Card className="p-6 text-center">
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mx-auto mb-4">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">الخبرة</h3>
                <p className="text-3xl font-bold text-purple-600">{user.xp}</p>
                <p className="text-sm text-gray-600 mt-2">نقطة خبرة</p>
              </Card>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">التقدم حسب المهارة</h3>
                <Bar 
                  data={chartData} 
                  options={{
                    responsive: true,
                    plugins: {
                      legend: { position: 'top' },
                    },
                    scales: {
                      y: { beginAtZero: true, max: 100 }
                    }
                  }}
                />
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">نشاطك الأسبوعي</h3>
                <Line 
                  data={timeData} 
                  options={{
                    responsive: true,
                    plugins: {
                      legend: { position: 'top' },
                    },
                    scales: {
                      y: { beginAtZero: true }
                    }
                  }}
                />
              </Card>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="p-6 text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mx-auto mb-3">
                  <Mic className="w-6 h-6 text-blue-600" />
                </div>
                <p className="text-2xl font-bold text-gray-900">85%</p>
                <p className="text-sm text-gray-600">النطق</p>
              </Card>

              <Card className="p-6 text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mx-auto mb-3">
                  <BookOpen className="w-6 h-6 text-green-600" />
                </div>
                <p className="text-2xl font-bold text-gray-900">72%</p>
                <p className="text-sm text-gray-600">القراءة</p>
              </Card>

              <Card className="p-6 text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-yellow-100 rounded-full mx-auto mb-3">
                  <PenTool className="w-6 h-6 text-yellow-600" />
                </div>
                <p className="text-2xl font-bold text-gray-900">68%</p>
                <p className="text-sm text-gray-600">الكتابة</p>
              </Card>

              <Card className="p-6 text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mx-auto mb-3">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <p className="text-2xl font-bold text-gray-900">90%</p>
                <p className="text-sm text-gray-600">المفردات</p>
              </Card>
            </div>
          </div>
        )}

        {activeTab === 'detailed' && (
          <div className="space-y-8">
            {/* Detailed Progress */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">التفاصيل حسب المهارة</h3>
                <div className="space-y-4">
                  {[
                    { skill: 'النطق', progress: 85, color: 'from-blue-500 to-cyan-500' },
                    { skill: 'القراءة', progress: 72, color: 'from-green-500 to-emerald-500' },
                    { skill: 'الكتابة', progress: 68, color: 'from-yellow-500 to-orange-500' },
                    { skill: 'المفردات', progress: 90, color: 'from-purple-500 to-pink-500' },
                    { skill: 'القواعد', progress: 75, color: 'from-red-500 to-rose-500' },
                  ].map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-900">{item.skill}</span>
                        <span className="text-sm text-gray-600">{item.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                          className={`h-3 rounded-full bg-gradient-to-r ${item.color}`}
                          style={{ width: `${item.progress}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">الإحصائيات الزمنية</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3 space-x-reverse">
                      <Clock className="w-5 h-5 text-gray-600" />
                      <span className="font-medium">إجمالي الوقت</span>
                    </div>
                    <span className="text-lg font-bold">42 ساعة</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3 space-x-reverse">
                      <TrendingUp className="w-5 h-5 text-green-600" />
                      <span className="font-medium">أفضل أداء</span>
                    </div>
                    <span className="text-lg font-bold text-green-600">95%</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3 space-x-reverse">
                      <Calendar className="w-5 h-5 text-blue-600" />
                      <span className="font-medium">أطول سلسلة</span>
                    </div>
                    <span className="text-lg font-bold text-blue-600">12 يوم</span>
                  </div>
                </div>
              </Card>
            </div>

            {/* Weekly Breakdown */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">تحليل أسبوعي</h3>
              <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
                {['الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت', 'الأحد'].map((day, index) => (
                  <div key={day} className="text-center space-y-2">
                    <div className="text-sm font-medium text-gray-600">{day}</div>
                    <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold shadow-lg">
                      {index < 5 ? `${index + 1}.5h` : index === 5 ? '0.5h' : '0h'}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'achievements' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {achievements.map((achievement) => (
                <Card key={achievement.id} className="p-6 text-center hover:shadow-lg transition-shadow">
                  <div className="text-4xl mb-4">{achievement.icon}</div>
                  <h4 className="font-bold text-gray-900 mb-2">{achievement.title}</h4>
                  <p className="text-sm text-gray-600 mb-4">{achievement.description}</p>
                  <p className="text-xs text-gray-500">{achievement.date}</p>
                </Card>
              ))}
            </div>

            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">احصائيات الإنجازات</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-600">4</div>
                  <p className="text-sm text-gray-600">إنجازات مكتسبة</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-600">12</div>
                  <p className="text-sm text-gray-600">إنجازات متاحة</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">33%</div>
                  <p className="text-sm text-gray-600">نسبة الإنجاز</p>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-4 justify-center mt-8">
          <Button
            onClick={() => router.push('/lessons')}
            className="bg-gradient-to-r from-primary-600 to-accent-500 hover:from-primary-700 hover:to-accent-600 text-white"
          >
            العودة للدروس
          </Button>
          
          <Button
            variant="outline"
            onClick={() => toast.success('تم حفظ التقرير')}
          >
            حفظ التقرير
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProgressPage;