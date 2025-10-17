'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, Menu, X } from 'lucide-react';
import { navigationItems } from '@/lib/data';
import logo from '../public/logo.svg';
import radio from '../public/radio.svg';
import '../styles/Header.css';
import Image from 'next/image';

interface HeaderProps {
  onSearchToggle: () => void;
  isSearchOpen: boolean;
}

export default function Header({ onSearchToggle, isSearchOpen }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="gradient-bg">
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm  border-gray-200 ">
        <div className="mx-auto header-inner-container">
          <div className="flex  justify-between">
            <div className="flex gap-10">
              <Link href="/" className="flex items-center space-x-3">
                <div className="w-30   flex items-center justify-center relative">
                  <div className="absolute inset-2 flex items-center justify-center">
                    <Image src={logo} alt="Ajab Shahar" width={150} height={150} />
                  </div>
                </div>
              </Link>

              <nav className="hidden md:flex items-left space-x-12">
                {navigationItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-sm  hover:text-gray-600 transition-colors tracking-wide uppercase"
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="flex items-center space-x-6 footer-right">
              <Link
                href="/about"
                className="about-text   hover:text-gray-600 transition-colors tracking-wide uppercase"
              >
                ABOUT
              </Link>

              <button
                onClick={onSearchToggle}
                className={`transition-colors cursor-pointer ${
                  isSearchOpen ? 'text-pink-500' : 'text-gray-700 hover:text-gray-900'
                }`}
                aria-label="Toggle search"
              >
                <Search className="w-8 h-8" />
              </button>

              <div className="w-auto h-12 radio-logo  rounded-full flex items-center justify-center cursor-pointer mr-0 ">
                <Image src={radio} alt="Ajab Shahar" />
              </div>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 pl-0 text-gray-600 hover:text-gray-900 transition-colors"
              >
                {isMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="fixed inset-0 top-[80px] bg-white z-40 md:hidden">
              <nav className="flex flex-col space-y-6 p-6">
                {navigationItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-lg font-medium text-gray-800 hover:text-gray-600 transition-colors tracking-wide uppercase"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
          )}
        </div>
      </header>
    </div>
  );
}
