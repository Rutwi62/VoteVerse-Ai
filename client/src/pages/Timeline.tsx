import { useEffect, useState } from 'react';
import { Calendar, Clock, MapPin, AlertCircle, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Timeline() {
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const saved = localStorage.getItem('voterProfile');
    if (saved) {
      setProfile(JSON.parse(saved));
    }
  }, []);

  return (
    <div className="max-w-4xl mx-auto py-8">
      
      {profile && profile.firstTime === 'yes' && (
        <div className="mb-8 bg-blue-50 border border-blue-200 rounded-xl p-6 flex gap-4">
          <div className="bg-blue-100 p-3 rounded-full h-fit">
            <AlertCircle className="text-blue-600" size={24} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-blue-900 mb-2">Welcome, First-Time Voter!</h2>
            <p className="text-blue-800">We've customized this timeline for you. Make sure you have your Form 6 submitted before the registration deadline.</p>
          </div>
        </div>
      )}

      {profile && profile.movedCity === 'yes' && (
        <div className="mb-8 bg-orange-50 border border-orange-200 rounded-xl p-6 flex gap-4">
          <div className="bg-orange-100 p-3 rounded-full h-fit">
            <MapPin className="text-orange-600" size={24} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-orange-900 mb-2">Address Change Detected</h2>
            <p className="text-orange-800">Since you moved, you need to submit Form 8 for shifting your constituency. Deadline is approaching!</p>
          </div>
        </div>
      )}

      <h1 className="text-3xl font-bold text-dark-900 mb-8">Your Election Dashboard</h1>

      <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-dark-200 before:to-transparent">
        
        <TimelineCard 
          date="Oct 15, 2026"
          title="Voter Registration Deadline"
          desc="Last day to submit new voter applications (Form 6) or address changes (Form 8)."
          status="upcoming"
        />

        <TimelineCard 
          date="Oct 20, 2026"
          title="Correction Deadline"
          desc="Last day to fix errors in your name, photo, or DOB."
          status="upcoming"
        />

        <TimelineCard 
          date="Nov 05, 2026"
          title="Polling Day!"
          desc="Cast your vote between 7:00 AM and 6:00 PM."
          status="highlight"
          isPollingDay
        />

        <TimelineCard 
          date="Nov 10, 2026"
          title="Results Declared"
          desc="Official counting and result announcements."
          status="pending"
        />

      </div>
    </div>
  );
}

function TimelineCard({ date, title, desc, status, isPollingDay = false }: any) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
    >
      <div className={`flex items-center justify-center w-10 h-10 rounded-full border-4 border-white shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm ${status === 'highlight' ? 'bg-primary-600' : 'bg-dark-300'}`}>
        {status === 'highlight' ? <Clock size={16} className="text-white" /> : <Calendar size={16} className="text-white" />}
      </div>
      
      <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-2xl bg-white border border-dark-100 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-2">
          <span className={`font-bold text-sm ${status === 'highlight' ? 'text-primary-600' : 'text-dark-500'}`}>{date}</span>
        </div>
        <h3 className="text-xl font-bold text-dark-900 mb-2">{title}</h3>
        <p className="text-dark-600">{desc}</p>
        
        {isPollingDay && (
          <div className="mt-4 pt-4 border-t border-dark-100">
            <button className="bg-dark-900 hover:bg-black text-white px-4 py-2 rounded-lg text-sm font-semibold w-full">
              Set Reminder
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}
