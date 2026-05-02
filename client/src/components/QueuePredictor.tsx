import { Users, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function QueuePredictor() {
  const [status, setStatus] = useState<'low' | 'medium' | 'high'>('low');

  useEffect(() => {
    // Simulate real-time queue data updates based on time of day
    const hour = new Date().getHours();
    if (hour >= 8 && hour <= 11) setStatus('high');
    else if (hour > 11 && hour <= 15) setStatus('low');
    else if (hour > 15 && hour <= 18) setStatus('medium');
    else setStatus('low');
  }, []);

  return (
    <div className="bg-white rounded-2xl p-6 border border-dark-200 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-dark-900 flex items-center gap-2">
          <Users size={20} className="text-dark-500" />
          Live Queue Status
        </h3>
        <span className="text-xs font-bold bg-dark-100 text-dark-600 px-2 py-1 rounded">ESTIMATED</span>
      </div>

      <div className="flex items-end gap-4 mb-6">
        <div className={`text-4xl font-black ${
          status === 'high' ? 'text-red-500' :
          status === 'medium' ? 'text-yellow-500' : 'text-green-500'
        }`}>
          {status === 'high' ? '45+' : status === 'medium' ? '20-40' : '< 15'}
        </div>
        <div className="text-dark-500 mb-1 font-medium">mins wait time</div>
      </div>

      {/* Progress Bar Visualization */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs font-bold text-dark-400">
          <span>Low</span>
          <span>Med</span>
          <span>High</span>
        </div>
        <div className="h-3 w-full bg-dark-100 rounded-full overflow-hidden flex">
          <div className={`h-full transition-all duration-1000 ${
            status === 'high' ? 'w-full bg-red-500' :
            status === 'medium' ? 'w-2/3 bg-yellow-500' : 'w-1/3 bg-green-500'
          }`} />
        </div>
      </div>

      <div className="mt-6 flex items-start gap-3 text-sm">
        {status === 'high' ? (
          <>
            <TrendingUp className="text-red-500 shrink-0 mt-0.5" size={16} />
            <p className="text-dark-600">Queue is building up. Peak morning hours. Consider visiting after 1 PM.</p>
          </>
        ) : status === 'medium' ? (
          <>
            <Minus className="text-yellow-500 shrink-0 mt-0.5" size={16} />
            <p className="text-dark-600">Moderate crowd. Moving at a steady pace.</p>
          </>
        ) : (
          <>
            <TrendingDown className="text-green-500 shrink-0 mt-0.5" size={16} />
            <p className="text-dark-600">Best time to vote! Minimal waiting expected right now.</p>
          </>
        )}
      </div>

    </div>
  );
}
