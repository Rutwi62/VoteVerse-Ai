import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const steps = [
  { id: 'basics', title: 'The Basics' },
  { id: 'status', title: 'Voter Status' },
  { id: 'location', title: 'Location' },
];

export default function Onboarding() {
  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState({ age: '', firstTime: '', movedCity: '', needs: '' });
  const navigate = useNavigate();

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(curr => curr + 1);
    } else {
      // Save data to context/storage and redirect
      localStorage.setItem('voterProfile', JSON.stringify(data));
      navigate('/timeline');
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-dark-900 mb-2">Personalize Your Guide</h1>
        <p className="text-dark-600">Tell us a bit about yourself so we can give you the right checklist.</p>
      </div>

      {/* Progress Bar */}
      <div className="flex gap-2 mb-12">
        {steps.map((step, idx) => (
          <div key={step.id} className="flex-1">
            <div className={`h-2 rounded-full transition-colors ${idx <= currentStep ? 'bg-primary-600' : 'bg-dark-200'}`} />
            <p className={`text-xs mt-2 font-medium ${idx <= currentStep ? 'text-primary-700' : 'text-dark-400'}`}>{step.title}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-dark-200 p-8 min-h-[400px] flex flex-col">
        <AnimatePresence mode="wait">
          
          {currentStep === 0 && (
            <motion.div key="step0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex-1">
              <h2 className="text-2xl font-bold mb-6">How old are you?</h2>
              <div className="grid grid-cols-2 gap-4">
                {['Under 18', '18-25', '26-45', '45+'].map(age => (
                  <button 
                    key={age}
                    onClick={() => setData({ ...data, age })}
                    className={`p-4 rounded-xl border-2 text-left font-semibold transition-all ${data.age === age ? 'border-primary-600 bg-primary-50 text-primary-700' : 'border-dark-200 hover:border-dark-300'}`}
                  >
                    {age}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {currentStep === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex-1 space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-4">Is this your first time voting?</h2>
                <div className="flex gap-4">
                  <button onClick={() => setData({ ...data, firstTime: 'yes' })} className={`flex-1 p-4 rounded-xl border-2 font-semibold transition-all ${data.firstTime === 'yes' ? 'border-primary-600 bg-primary-50 text-primary-700' : 'border-dark-200 hover:border-dark-300'}`}>Yes</button>
                  <button onClick={() => setData({ ...data, firstTime: 'no' })} className={`flex-1 p-4 rounded-xl border-2 font-semibold transition-all ${data.firstTime === 'no' ? 'border-primary-600 bg-primary-50 text-primary-700' : 'border-dark-200 hover:border-dark-300'}`}>No</button>
                </div>
              </div>
            </motion.div>
          )}

          {currentStep === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex-1 space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-4">Have you recently changed your city or address?</h2>
                <div className="flex gap-4">
                  <button onClick={() => setData({ ...data, movedCity: 'yes' })} className={`flex-1 p-4 rounded-xl border-2 font-semibold transition-all ${data.movedCity === 'yes' ? 'border-primary-600 bg-primary-50 text-primary-700' : 'border-dark-200 hover:border-dark-300'}`}>Yes</button>
                  <button onClick={() => setData({ ...data, movedCity: 'no' })} className={`flex-1 p-4 rounded-xl border-2 font-semibold transition-all ${data.movedCity === 'no' ? 'border-primary-600 bg-primary-50 text-primary-700' : 'border-dark-200 hover:border-dark-300'}`}>No</button>
                </div>
              </div>
              <div>
                <h2 className="text-lg font-bold mb-3 mt-8">Any accessibility needs? (Optional)</h2>
                <div className="grid grid-cols-2 gap-3">
                  {['Wheelchair Access', 'Visual Impairment', 'Hearing', 'None'].map(need => (
                    <button 
                      key={need}
                      onClick={() => setData({ ...data, needs: need })}
                      className={`p-3 rounded-lg border-2 text-sm font-semibold transition-all ${data.needs === need ? 'border-primary-600 bg-primary-50 text-primary-700' : 'border-dark-200 hover:border-dark-300'}`}
                    >
                      {need}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>

        {/* Footer actions */}
        <div className="flex justify-between mt-8 pt-6 border-t border-dark-100">
          <button 
            onClick={() => setCurrentStep(curr => curr - 1)}
            disabled={currentStep === 0}
            className="px-6 py-3 font-semibold text-dark-500 hover:text-dark-900 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <ArrowLeft size={20} /> Back
          </button>
          <button 
            onClick={handleNext}
            className="px-8 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-semibold flex items-center gap-2 transition-all"
          >
            {currentStep === steps.length - 1 ? 'Finish & View Guide' : 'Continue'} <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
