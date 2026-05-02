import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Onboarding from './pages/Onboarding';
import ChatAssistant from './pages/ChatAssistant';
import MapsLayout from './pages/MapsLayout';
import Timeline from './pages/Timeline';
import PanicButton from './pages/PanicButton';
import RumorChecker from './pages/RumorChecker';
import Navbar from './components/Navbar';
import AccessibilityWrapper from './components/AccessibilityWrapper';
import { TranslationProvider } from './context/TranslationContext';

function App() {
  return (
    <TranslationProvider>
        <Router>
        <AccessibilityWrapper>
          <div className="min-h-screen bg-dark-50 text-dark-900 font-sans flex flex-col">
            <Navbar />
            <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/onboarding" element={<Onboarding />} />
                <Route path="/chat" element={<ChatAssistant />} />
                <Route path="/maps" element={<MapsLayout />} />
                <Route path="/timeline" element={<Timeline />} />
                <Route path="/panic" element={<PanicButton />} />
                <Route path="/rumor" element={<RumorChecker />} />
              </Routes>
            </main>
          </div>
        </AccessibilityWrapper>
      </Router>
    </TranslationProvider>
  );
}

export default App;
