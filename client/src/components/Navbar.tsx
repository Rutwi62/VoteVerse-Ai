import { Link } from 'react-router-dom';
import { useAccessibility } from './AccessibilityWrapper';
import { Eye, Type, Menu, X, AlertTriangle, Globe } from 'lucide-react';
import { useState } from 'react';
import { useTranslation, T } from '../context/TranslationContext';

export default function Navbar() {
  const { highContrast, toggleHighContrast, largeText, toggleLargeText } = useAccessibility();
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage } = useTranslation();

  return (
    <nav className="bg-white border-b border-dark-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center gap-2">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center text-white font-bold">
                V
              </div>
              <span className="font-bold text-xl text-primary-900">VoteVerse AI</span>
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <Link to="/onboarding" className="text-dark-600 hover:text-primary-600 px-3 py-2 rounded-md font-medium"><T>Guide</T></Link>
            <Link to="/timeline" className="text-dark-600 hover:text-primary-600 px-3 py-2 rounded-md font-medium"><T>Timeline</T></Link>
            <Link to="/chat" className="text-dark-600 hover:text-primary-600 px-3 py-2 rounded-md font-medium"><T>Assistant</T></Link>
            <Link to="/maps" className="text-dark-600 hover:text-primary-600 px-3 py-2 rounded-md font-medium"><T>Find Booth</T></Link>
            
            <div className="border-l border-dark-200 h-6 mx-2"></div>
            
            {/* Language Toggle */}
            <div className="relative group">
              <button className="text-dark-500 hover:text-dark-900 px-2 py-2 rounded-md font-medium flex items-center gap-1">
                <Globe size={18} />
                <span className="uppercase text-xs">{language}</span>
              </button>
              <div className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg py-1 hidden group-hover:block border border-dark-100 z-50">
                <button onClick={() => setLanguage('en')} className={`block w-full text-left px-4 py-2 text-sm ${language === 'en' ? 'bg-primary-50 text-primary-700' : 'text-dark-700 hover:bg-dark-50'}`}>English</button>
                <button onClick={() => setLanguage('hi')} className={`block w-full text-left px-4 py-2 text-sm ${language === 'hi' ? 'bg-primary-50 text-primary-700' : 'text-dark-700 hover:bg-dark-50'}`}>Hindi</button>
                <button onClick={() => setLanguage('te')} className={`block w-full text-left px-4 py-2 text-sm ${language === 'te' ? 'bg-primary-50 text-primary-700' : 'text-dark-700 hover:bg-dark-50'}`}>Telugu</button>
                <button onClick={() => setLanguage('mr')} className={`block w-full text-left px-4 py-2 text-sm ${language === 'mr' ? 'bg-primary-50 text-primary-700' : 'text-dark-700 hover:bg-dark-50'}`}>Marathi</button>
                <button onClick={() => setLanguage('genz')} className={`block w-full text-left px-4 py-2 text-sm ${language === 'genz' ? 'bg-primary-50 text-primary-700' : 'text-dark-700 hover:bg-dark-50'}`}>GenZ Mode</button>
              </div>
            </div>

            <button onClick={toggleHighContrast} className={`p-2 rounded-full ${highContrast ? 'bg-primary-100 text-primary-700' : 'text-dark-500 hover:bg-dark-100'}`} aria-label="Toggle High Contrast">
              <Eye size={20} />
            </button>
            <button onClick={toggleLargeText} className={`p-2 rounded-full ${largeText ? 'bg-primary-100 text-primary-700' : 'text-dark-500 hover:bg-dark-100'}`} aria-label="Toggle Large Text">
              <Type size={20} />
            </button>
            
            <Link to="/panic" className="ml-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md font-medium flex items-center gap-2 transition-colors">
              <AlertTriangle size={18} />
              <T>Panic Button</T>
            </Link>
            
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-dark-500 hover:text-dark-900 p-2">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-dark-200 bg-white">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/onboarding" className="block px-3 py-2 rounded-md text-base font-medium text-dark-900 hover:bg-dark-50" onClick={() => setIsOpen(false)}><T>Guide</T></Link>
            <Link to="/timeline" className="block px-3 py-2 rounded-md text-base font-medium text-dark-900 hover:bg-dark-50" onClick={() => setIsOpen(false)}><T>Timeline</T></Link>
            <Link to="/chat" className="block px-3 py-2 rounded-md text-base font-medium text-dark-900 hover:bg-dark-50" onClick={() => setIsOpen(false)}><T>Assistant</T></Link>
            <Link to="/maps" className="block px-3 py-2 rounded-md text-base font-medium text-dark-900 hover:bg-dark-50" onClick={() => setIsOpen(false)}><T>Find Booth</T></Link>
            <Link to="/panic" className="block px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50" onClick={() => setIsOpen(false)}><T>Panic Button</T></Link>
            


            <div className="px-3 py-2">
              <p className="text-xs font-bold text-dark-400 mb-2 uppercase">Language</p>
              <div className="flex flex-wrap gap-2">
                <button onClick={() => setLanguage('en')} className={`px-3 py-1 rounded text-sm ${language === 'en' ? 'bg-primary-100 text-primary-700' : 'bg-dark-100'}`}>EN</button>
                <button onClick={() => setLanguage('hi')} className={`px-3 py-1 rounded text-sm ${language === 'hi' ? 'bg-primary-100 text-primary-700' : 'bg-dark-100'}`}>HI</button>
                <button onClick={() => setLanguage('te')} className={`px-3 py-1 rounded text-sm ${language === 'te' ? 'bg-primary-100 text-primary-700' : 'bg-dark-100'}`}>TE</button>
                <button onClick={() => setLanguage('mr')} className={`px-3 py-1 rounded text-sm ${language === 'mr' ? 'bg-primary-100 text-primary-700' : 'bg-dark-100'}`}>MR</button>
                <button onClick={() => setLanguage('genz')} className={`px-3 py-1 rounded text-sm ${language === 'genz' ? 'bg-primary-100 text-primary-700' : 'bg-dark-100'}`}>GenZ</button>
              </div>
            </div>

            <div className="flex gap-4 px-3 py-4 border-t border-dark-200 mt-2">
              <button onClick={toggleHighContrast} className="flex items-center gap-2 text-dark-600">
                <Eye size={20} /> <T>Contrast</T>
              </button>
              <button onClick={toggleLargeText} className="flex items-center gap-2 text-dark-600">
                <Type size={20} /> <T>Text Size</T>
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
