import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, MessageSquare, Calendar, ShieldAlert } from 'lucide-react';
import { motion } from 'framer-motion';
import { T } from '../context/TranslationContext';

export default function Home() {
  return (
    <div className="space-y-16 py-8">
      {/* Hero Section */}
      <section className="text-center space-y-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-5xl md:text-6xl font-extrabold text-dark-900 tracking-tight">
            <T>Your Personal</T> <span className="text-primary-600"><T>Election Companion</T></span>
          </h1>
          <p className="mt-6 text-xl text-dark-600 max-w-3xl mx-auto">
            <T>Navigate the election process with confidence. Get personalized guidance, real-time booth updates, and instant answers to your voting queries.</T>
          </p>
        </motion.div>

        <motion.div 
          className="flex flex-col sm:flex-row justify-center gap-4 pt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <Link to="/onboarding" className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-xl text-lg font-semibold flex items-center justify-center gap-2 shadow-lg shadow-primary-500/30 transition-all hover:scale-105">
            <T>Start My Guide</T> <ArrowRight size={20} />
          </Link>
          <Link to="/chat" className="bg-white hover:bg-dark-50 text-dark-800 border-2 border-dark-200 px-8 py-4 rounded-xl text-lg font-semibold flex items-center justify-center gap-2 transition-all hover:scale-105">
            <T>Ask AI Assistant</T> <MessageSquare size={20} />
          </Link>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 pt-12 border-t border-dark-200">
        
        <FeatureCard 
          to="/onboarding"
          icon={<ArrowRight className="text-primary-500" size={28} />}
          title="First-Time Voter?"
          desc="Step-by-step guidance tailored for you. Know what to carry, where to go, and what to do."
          bg="bg-blue-50"
        />

        <FeatureCard 
          to="/maps"
          icon={<MapPin className="text-emerald-500" size={28} />}
          title="Booth Locator & Queue"
          desc="Find your polling center, get directions, and see the predicted queue time."
          bg="bg-emerald-50"
        />

        <FeatureCard 
          to="/timeline"
          icon={<Calendar className="text-purple-500" size={28} />}
          title="Important Dates"
          desc="Never miss a deadline. Interactive timeline for registration and polling days."
          bg="bg-purple-50"
        />

        <FeatureCard 
          to="/chat"
          icon={<MessageSquare className="text-orange-500" size={28} />}
          title="Smart Assistant"
          desc="24/7 AI help. Ask anything in simple language, get verified answers instantly."
          bg="bg-orange-50"
        />

        <FeatureCard 
          to="/rumor"
          icon={<ShieldAlert className="text-blue-500" size={28} />}
          title="Rumor Checker"
          desc="Paste a viral forward and let AI verify if it's true or false."
          bg="bg-blue-50"
        />

        <FeatureCard 
          to="/panic"
          icon={<ShieldAlert className="text-red-500" size={28} />}
          title="Emergency Help"
          desc="Missing name? Wrong booth? Use our panic button for instant resolution steps."
          bg="bg-red-50"
        />

        <div className="bg-gradient-to-br from-primary-900 to-primary-700 rounded-2xl p-8 text-white flex flex-col justify-center relative overflow-hidden group">
          <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-all"></div>
          <h3 className="text-2xl font-bold mb-2 z-10">Make Your Voice Heard</h3>
          <p className="text-primary-100 z-10 mb-6">Every vote counts. Let's make sure you're ready.</p>
          <Link to="/onboarding" className="text-white font-semibold flex items-center gap-2 z-10 group-hover:gap-3 transition-all">
            Get Prepared <ArrowRight size={18} />
          </Link>
        </div>

      </section>
    </div>
  );
}

function FeatureCard({ to, icon, title, desc, bg }: { to: string, icon: React.ReactNode, title: string, desc: string, bg: string }) {
  return (
    <Link to={to} className="bg-white rounded-2xl p-8 border border-dark-100 shadow-sm hover:shadow-xl hover:border-primary-200 transition-all duration-300 group">
      <div className={`w-14 h-14 rounded-xl ${bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
        {icon}
      </div>
      <h3 className="text-xl font-bold text-dark-900 mb-3"><T>{title}</T></h3>
      <p className="text-dark-600 leading-relaxed"><T>{desc}</T></p>
    </Link>
  );
}
