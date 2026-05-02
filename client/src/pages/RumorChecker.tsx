import { useState } from 'react';
import { Search, ShieldCheck, AlertOctagon, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function RumorChecker() {
  const [claim, setClaim] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!claim.trim()) return;

    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/ai/rumor-checker', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ claim })
      });
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to verify claim');
      }
      
      setResult(data.analysis);
    } catch (error: any) {
      setResult(error.message || 'Error connecting to verification server. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-12">
      <div className="text-center mb-10">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <ShieldCheck size={32} className="text-blue-600" />
        </div>
        <h1 className="text-3xl font-bold text-dark-900 mb-4">Viral Message Checker</h1>
        <p className="text-dark-600 text-lg">
          Received a suspicious forward about the election? Paste it below to verify if it's true, false, or misleading.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-dark-200 p-8">
        <form onSubmit={handleCheck}>
          <label className="block text-sm font-bold text-dark-700 mb-2">
            Paste the claim or message:
          </label>
          <textarea
            value={claim}
            onChange={(e) => setClaim(e.target.value)}
            rows={4}
            className="w-full bg-dark-50 border border-dark-200 rounded-xl p-4 focus:ring-2 focus:ring-primary-500 focus:outline-none transition-all mb-4"
            placeholder="e.g., 'You can vote online this year by clicking this link...'"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={!claim.trim() || loading}
            className="w-full bg-dark-900 hover:bg-black disabled:opacity-50 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all"
          >
            {loading ? <Loader2 className="animate-spin" /> : <Search size={20} />}
            {loading ? 'Analyzing...' : 'Verify Claim'}
          </button>
        </form>

        {result && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 pt-8 border-t border-dark-100"
          >
            <div className="flex items-start gap-4">
              <div className="bg-dark-50 p-3 rounded-full mt-1">
                <AlertOctagon className="text-dark-600" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-dark-900 mb-2">AI Analysis</h3>
                <div className="prose prose-sm text-dark-700 max-w-none whitespace-pre-wrap">
                  {result}
                </div>
                <div className="mt-6 p-4 bg-yellow-50 rounded-xl border border-yellow-200 text-yellow-800 text-sm flex gap-2">
                  <ShieldCheck className="shrink-0" size={18} />
                  <p><strong>Remember:</strong> Always verify information through official Election Commission portals before sharing.</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
