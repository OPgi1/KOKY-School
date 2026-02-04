'use client';

import * as React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube, 
  Mail, 
  Phone,
  MapPin
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: 'عن KOKY School',
      links: [
        { name: 'من نحن', href: '/about' },
        { name: 'فريق العمل', href: '/team' },
        { name: 'قصص النجاح', href: '/success-stories' },
        { name: 'الوظائف', href: '/careers' },
      ],
    },
    {
      title: 'الدعم',
      links: [
        { name: 'الأسئلة الشائعة', href: '/faq' },
        { name: 'الاتصال بنا', href: '/contact' },
        { name: 'الدعم الفني', href: '/support' },
        { name: 'الإبلاغ عن مشكلة', href: '/report' },
      ],
    },
    {
      title: 'الحقوق',
      links: [
        { name: 'الشروط والأحكام', href: '/terms' },
        { name: 'سياسة الخصوصية', href: '/privacy' },
        { name: 'سياسة الاستخدام', href: '/usage-policy' },
        { name: 'حقوق الملكية', href: '/copyright' },
      ],
    },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              <div className="flex items-center space-x-3 space-x-reverse">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-xl">K</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold">KOKY School</h3>
                  <p className="text-gray-400 text-sm">تعلم الإنجليزية بسهولة</p>
                </div>
              </div>
              
              <p className="text-gray-400 text-sm leading-relaxed">
                منصة تعليمية متكاملة لتعلم اللغة الإنجليزية للمستخدمين الناطقين بالعربية.
                نقدم تجربة تعليمية ممتعة، تفاعلية، وشاملة.
              </p>
              
              <div className="flex space-x-4 space-x-reverse">
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Facebook className="w-5 h-5" />
                </Link>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Twitter className="w-5 h-5" />
                </Link>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Instagram className="w-5 h-5" />
                </Link>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Youtube className="w-5 h-5" />
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Links Sections */}
          {footerLinks.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="space-y-4"
            >
              <h4 className="text-lg font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Contact Information */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex items-center space-x-3 space-x-reverse text-gray-400"
            >
              <Mail className="w-5 h-5 text-primary-500" />
              <div>
                <p className="text-sm">البريد الإلكتروني</p>
                <p className="font-medium">support@kokyschool.com</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex items-center space-x-3 space-x-reverse text-gray-400"
            >
              <Phone className="w-5 h-5 text-primary-500" />
              <div>
                <p className="text-sm">الهاتف</p>
                <p className="font-medium">+964 770 000 0000</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex items-center space-x-3 space-x-reverse text-gray-400"
            >
              <MapPin className="w-5 h-5 text-primary-500" />
              <div>
                <p className="text-sm">الموقع</p>
                <p className="font-medium">بغداد، العراق</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © {currentYear} KOKY School. جميع الحقوق محفوظة.
            </p>
            <div className="flex items-center space-x-4 space-x-reverse text-xs text-gray-500">
              <span>🔐 Developed By Sherlock</span>
              <div className="flex space-x-2 space-x-reverse">
                <Link href="https://t.me/tx_5w" className="hover:text-white transition-colors">
                  📎 Telegram: @tx_5w
                </Link>
                <Link href="https://instagram.com/j.86vb" className="hover:text-white transition-colors">
                  📷 Instagram: @j.86vb
                </Link>
                <Link href="https://tiktok.com/@default_room105" className="hover:text-white transition-colors">
                  🎥 TikTok: @default_room105
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;