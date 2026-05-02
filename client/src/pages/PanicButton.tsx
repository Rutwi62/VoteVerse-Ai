import { AlertTriangle, ChevronRight, PhoneCall, ShieldAlert, ArrowLeft } from 'lucide-react';
import { useState } from 'react';

const emergencies = [
  {
    id: 'name-missing',
    title: 'My name is missing from the voter list',
    icon: <ShieldAlert className="text-red-500" />,
    solution: [
      '1. Check with the Booth Level Officer (BLO) immediately outside the booth.',
      '2. Present your original ID (Aadhar/PAN/Passport) and verify if your name is on the ASD (Absent, Shifted, Dead) list.',
      '3. If you have an EPIC card but name is missing, ask for the "Challenged Vote" procedure.'
    ]
  },
  {
    id: 'wrong-booth',
    title: 'I am at the wrong polling booth',
    icon: <MapPinAlert className="text-orange-500" />,
    solution: [
      '1. Do not panic. Check your Voter Slip for the exact Part Number and Serial Number.',
      '2. Use the "Find Booth" map feature in this app to route to the correct location.',
      '3. Ask the help desk outside the current booth; they have the master list for the entire constituency.'
    ]
  },
  {
    id: 'no-id',
    title: 'I forgot my Voter ID card',
    icon: <IdCardAlert className="text-yellow-500" />,
    solution: [
      'You can still vote! Present any of these 11 alternative IDs:',
      '- Aadhaar Card',
      '- PAN Card',
      '- Passport',
      '- Driving License',
      '- MGNREGA Job Card',
      '- Passbooks with photograph issued by Bank/Post Office'
    ]
  },
  {
    id: 'machine-issue',
    title: 'EVM/VVPAT machine is not working',
    icon: <AlertTriangle className="text-purple-500" />,
    solution: [
      '1. Immediately notify the Presiding Officer inside the booth.',
      '2. Do not leave the voting compartment until the officer registers the complaint.',
      '3. If the VVPAT prints the wrong symbol, you have the right to a "Test Vote" under Rule 49MA.'
    ]
  }
];

// Helper icons
function MapPinAlert(props: any) { return <AlertTriangle {...props} />; }
function IdCardAlert(props: any) { return <AlertTriangle {...props} />; }

export default function PanicButton() {
  const [selected, setSelected] = useState<string | null>(null);

  const activeEmergency = emergencies.find(e => e.id === selected);

  return (
    <div className="max-w-3xl mx-auto py-8">
      
      <div className="bg-red-600 rounded-3xl p-8 text-white text-center mb-8 shadow-xl shadow-red-600/20">
        <div className="bg-white/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
          <AlertTriangle size={40} className="text-white" />
        </div>
        <h1 className="text-3xl font-bold mb-2">Emergency Help</h1>
        <p className="text-red-100">Don't panic. Select your issue below for instant resolution steps on Election Day.</p>
      </div>

      {!selected ? (
        <div className="grid gap-4">
          {emergencies.map((em) => (
            <button 
              key={em.id}
              onClick={() => setSelected(em.id)}
              className="bg-white p-6 rounded-2xl border border-dark-200 hover:border-red-300 hover:shadow-md transition-all flex items-center justify-between group text-left"
            >
              <div className="flex items-center gap-4">
                <div className="bg-dark-50 p-3 rounded-xl group-hover:bg-red-50 transition-colors">
                  {em.icon}
                </div>
                <h3 className="text-lg font-bold text-dark-900">{em.title}</h3>
              </div>
              <ChevronRight className="text-dark-400 group-hover:text-red-500 transition-colors" />
            </button>
          ))}

          <div className="mt-8 bg-dark-900 rounded-2xl p-6 text-white flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold mb-1">Still need help?</h3>
              <p className="text-dark-400">Call the National Voter Helpline</p>
            </div>
            <a href="tel:1950" className="bg-green-500 hover:bg-green-600 px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-colors">
              <PhoneCall size={20} /> 1950
            </a>
          </div>
        </div>
      ) : (
        <div className="bg-white border border-dark-200 rounded-2xl p-8">
          <button 
            onClick={() => setSelected(null)}
            className="text-dark-500 hover:text-dark-900 font-medium flex items-center gap-2 mb-6"
          >
            <ArrowLeft size={18} /> Back to issues
          </button>
          
          <div className="flex items-center gap-4 mb-6 pb-6 border-b border-dark-100">
            <div className="bg-red-50 p-4 rounded-2xl">
              {activeEmergency?.icon}
            </div>
            <h2 className="text-2xl font-bold text-dark-900">{activeEmergency?.title}</h2>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-lg text-dark-900">What to do next:</h3>
            <ul className="space-y-3">
              {activeEmergency?.solution.map((step, idx) => (
                <li key={idx} className="flex gap-3 text-dark-700 leading-relaxed">
                  <span className="shrink-0 w-6 h-6 rounded-full bg-dark-100 flex items-center justify-center text-sm font-bold text-dark-900 mt-0.5">
                    {idx + 1}
                  </span>
                  {step.replace(/^\d+\.\s*/, '')}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

    </div>
  );
}
