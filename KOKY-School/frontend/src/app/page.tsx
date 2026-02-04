'use client';

import * as React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Mic, 
  PenTool, 
  Users, 
  Award, 
  Play, 
  Star,
  CheckCircle,
  Target,
  Brain
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Confetti } from '@/components/ui/confetti';

const HomePage = () => {
  const [showConfetti, setShowConfetti] = React.useState(false);

  const features = [
    {
      icon: Mic,
      title: 'تحسين النطق',
      description: 'تعلم النطق الصحيح للكلمات والجمل مع التدريب الصوتي التفاعلي',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: BookOpen,
      title: 'القراءة والفهم',
      description: 'تمارين قراءة ممتعة وقصص تعليمية لتحسين مهارات الفهم',
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: PenTool,
      title: 'تحسين الكتابة',
      description: 'تدريبات كتابة تفاعلية مع تصحيح فوري ونصائح مفيدة',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: Users,
      title: 'المجتمع التعليمي',
      description: 'انضم إلى مجتمع التعلم وشارك مع الآخرين وتنافس في التحديات',
      color: 'from-orange-500 to-red-500',
    },
  ];

  const levels = [
    { name: 'مبتدئ', description: 'للمبتدئين完全没有 خبرة', color: 'bg-green-500', progress: 40 },
    { name: 'متوسط', description: 'للمتعلمين ذوي الخبرة الأساسية', color: 'bg-yellow-500', progress: 60 },
    { name: 'متقدم', description: 'للمتعلمين ذوي الخبرة المتوسطة', color: 'bg-blue-500', progress: 80 },
  ];

  const handleStartLearning = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {showConfetti && <Confetti />}
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                  className="inline-flex items-center space-x-3 space-x-reverse bg-white/80 backdrop-blur-md px-4 py-2 rounded-full shadow-lg border border-white/50"
                >
                  <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                  <span className="text-sm font-medium text-gray-700">منصة تعليمية رقم 1</span>
                </motion.div>
                
                <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  تعلم الإنجليزية
                  <span className="bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent"> بسهولة</span>
                </h1>
                
                <p className="text-lg text-gray-600 leading-relaxed">
                  منصة KOKY School تقدم لك تجربة تعليمية ممتعة وتفاعلية لتعلم اللغة الإنجليزية 
                  من الصفر إلى الاحتراف، مع تمارين مخصصة وتحديات يومية.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-600">10K+</div>
                  <div className="text-sm text-gray-600">طلاب ناجحون</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent-500">500+</div>
                  <div className="text-sm text-gray-600">دورة تعليمية</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">95%</div>
                  <div className="text-sm text-gray-600">معدل النجاح</div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-primary-600 to-accent-500 hover:from-primary-700 hover:to-accent-600 text-white font-semibold px-8 py-3 rounded-lg shadow-lg transform hover:-translate-y-1 transition-all duration-200"
                  onClick={handleStartLearning}
                >
                  <Play className="w-5 h-5 ml-2" />
                  ابدأ التعلم الآن
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold px-8 py-3 rounded-lg transition-all duration-200"
                >
                  <Link href="/lessons">تصفح الدروس</Link>
                </Button>
              </div>
            </motion.div>

            {/* Right Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative bg-white rounded-2xl shadow-2xl p-8">
                <div className="grid grid-cols-2 gap-4">
                  {features.map((feature, index) => (
                    <Card key={feature.title} className="p-4 hover:shadow-lg transition-shadow">
                      <div className={`w-12 h-12 bg-gradient-to-br ${feature.color} rounded-lg flex items-center justify-center mb-4 shadow-lg`}>
                        <feature.icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                      <p className="text-sm text-gray-600">{feature.description}</p>
                    </Card>
                  ))}
                </div>
                
                {/* Floating elements */}
                <motion.div
                  animate={{ y: [-10, 10, -10] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-green-400 to-blue-500 rounded-full opacity-20"
                />
                <motion.div
                  animate={{ y: [10, -10, 10] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute -bottom-4 -left-4 w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full opacity-20"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">لماذا تختار KOKY School؟</h2>
            <p className="text-xl text-gray-600">نظام تعليمي متكامل يناسب جميع المستويات</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Brain,
                title: 'تعلم تفاعلي',
                description: 'تمارين تفاعلية ممتعة تناسب جميع المستويات',
                color: 'text-blue-600'
              },
              {
                icon: Target,
                title: 'أهداف محددة',
                description: 'أهداف يومية وأسبوعية لتحقيق التقدم',
                color: 'text-green-600'
              },
              {
                icon: CheckCircle,
                title: 'تصحيح فوري',
                description: 'تصحيح فوري للإجابات مع شرح مفصل',
                color: 'text-purple-600'
              },
              {
                icon: Award,
                title: 'مكافآت وتحديات',
                description: 'نظام مكافآت وتحديات لتحفيز التعلم',
                color: 'text-yellow-600'
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center space-y-4"
              >
                <div className={`w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto ${feature.color}`}>
                  <feature.icon className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Levels Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">المستويات التعليمية</h2>
            <p className="text-xl text-gray-600">اختر مستواك وابدأ رحلتك التعليمية</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {levels.map((level, index) => (
              <motion.div
                key={level.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 border-0">
                  <div className="p-6 space-y-6">
                    <div className="flex items-center justify-between">
                      <div className={`w-12 h-12 ${level.color} rounded-full flex items-center justify-center shadow-lg`}>
                        <Award className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-right">
                        <h3 className="text-2xl font-bold text-gray-900">{level.name}</h3>
                        <p className="text-sm text-gray-600">{level.description}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">التقدم</span>
                        <span className="font-semibold">{level.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${level.color} transition-all duration-1000`}
                          style={{ width: `${level.progress}%` }}
                        />
                      </div>
                    </div>

                    <Button className="w-full bg-gradient-to-r from-primary-600 to-accent-500 hover:from-primary-700 hover:to-accent-600">
                      البدء في المستوى
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-accent-500">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              مستعد لبدء رحلتك في تعلم الإنجليزية؟
            </h2>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              انضم إلى آلاف الطلاب الناجحين وابدأ رحلتك نحو إتقان اللغة الإنجليزية 
              مع منصة KOKY School التعليمية المتكاملة
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-primary-600 hover:bg-gray-100 font-semibold px-8 py-3 rounded-lg shadow-lg transform hover:-translate-y-1 transition-all duration-200"
              >
                <Link href="/register">سجل الآن مجاناً</Link>
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold px-8 py-3 rounded-lg transition-all duration-200"
              >
                <Link href="/contact">تواصل معنا</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;