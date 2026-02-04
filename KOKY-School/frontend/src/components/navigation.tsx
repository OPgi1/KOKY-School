'use client';

import * as React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Home, 
  BookOpen, 
  Mic, 
  PenTool, 
  Users, 
  Award, 
  Menu, 
  X,
  Moon,
  Sun
} from 'lucide-react';
import { Button } from './ui/button';
import { useTheme } from 'next-themes';

const Navigation = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { theme, setTheme } = useTheme();

  const navigationItems = [
    { name: 'الرئيسية', href: '/', icon: Home },
    { name: 'الدروس', href: '/lessons', icon: BookOpen },
    { name: 'النطق', href: '/pronunciation', icon: Mic },
    { name: 'الكتابة', href: '/writing', icon: PenTool },
    { name: 'المجتمع', href: '/community', icon: Users },
    { name: 'الإنجازات', href: '/achievements', icon: Award },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3 space-x-reverse">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                className="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center shadow-lg"
              >
                <span className="text-white font-bold text-lg">K</span>
              </motion.div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">KOKY School</h1>
                <p className="text-xs text-gray-500">تعلم الإنجليزية بسهولة</p>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8 space-x-reverse">
            {navigationItems.map((item, index) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-primary-600 transition-colors duration-200 font-medium flex items-center space-x-2 space-x-reverse"
              >
                <item.icon className="w-4 h-4" />
                <span>{item.name}</span>
              </Link>
            ))}
            
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="rounded-full"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </Button>

            {/* Login/Register */}
            <div className="flex space-x-3 space-x-reverse">
              <Button variant="outline" className="border-primary-500 text-primary-600 hover:bg-primary-50">
                تسجيل الدخول
              </Button>
              <Button className="bg-gradient-to-r from-primary-600 to-accent-500 hover:from-primary-700 hover:to-accent-600">
                ابدأ الآن
              </Button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4 space-x-reverse">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="rounded-full"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden"
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: isOpen ? 1 : 0, height: isOpen ? 'auto' : 0 }}
        transition={{ duration: 0.3 }}
        className="md:hidden bg-white border-t border-gray-200 overflow-hidden"
      >
        <div className="px-4 py-4 space-y-4">
          {navigationItems.map((item, index) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center space-x-3 space-x-reverse p-3 rounded-lg hover:bg-gray-50 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <item.icon className="w-5 h-5 text-primary-600" />
              <span className="text-gray-700 font-medium">{item.name}</span>
            </Link>
          ))}
          
          <div className="pt-4 border-t border-gray-200 space-y-3">
            <Button variant="outline" className="w-full border-primary-500 text-primary-600 hover:bg-primary-50">
              تسجيل الدخول
            </Button>
            <Button className="w-full bg-gradient-to-r from-primary-600 to-accent-500 hover:from-primary-700 hover:to-accent-600">
              ابدأ الآن
            </Button>
          </div>
        </div>
      </motion.div>
    </nav>
  );
};

export default Navigation;