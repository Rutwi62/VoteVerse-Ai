import { useState, useEffect, useRef } from 'react';
import { Wrapper, Status } from '@googlemaps/react-wrapper';
import { MapPin, Navigation, Clock, Users } from 'lucide-react';
import QueuePredictor from '../components/QueuePredictor';

function MapComponent({ center, zoom }: { center: google.maps.LatLngLiteral; zoom: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      const map = new window.google.maps.Map(ref.current, {
        center,
        zoom,
        styles: [
          // Optional: Add custom map styles here for a premium look
        ]
      });

      new window.google.maps.Marker({
        position: center,
        map,
        title: "Your Polling Booth",
      });
    }
  }, [center, zoom]);

  return <div ref={ref} className="w-full h-full rounded-2xl" />;
}

export default function MapsLayout() {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '';
  
  // Default coordinates (e.g., a central location like New Delhi or user's city)
  const defaultCenter = { lat: 28.6139, lng: 77.2090 };
  
  const [center, setCenter] = useState(defaultCenter);
  const [boothName, setBoothName] = useState('Kendriya Vidyalaya');
  const [boothAddress, setBoothAddress] = useState('Sector 4, RK Puram, New Delhi');

  useEffect(() => {
    // We need to wait for the google maps script to load before attaching Autocomplete
    const checkGoogle = setInterval(() => {
      if (window.google && window.google.maps && window.google.maps.places) {
        clearInterval(checkGoogle);
        const input = document.getElementById('booth-search') as HTMLInputElement;
        if (input) {
          const autocomplete = new window.google.maps.places.Autocomplete(input);
          autocomplete.addListener('place_changed', () => {
            const place = autocomplete.getPlace();
            if (place.geometry && place.geometry.location) {
              setCenter({
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng()
              });
              setBoothName(place.name || 'Selected Booth');
              setBoothAddress(place.formatted_address || '');
            }
          });
        }
      }
    }, 500);
    return () => clearInterval(checkGoogle);
  }, []);

  const render = (status: Status) => {
    if (status === Status.LOADING) return <div className="animate-pulse bg-dark-200 w-full h-full rounded-2xl flex items-center justify-center">Loading Map...</div>;
    if (status === Status.FAILURE) return <div className="bg-red-50 text-red-500 w-full h-full rounded-2xl flex items-center justify-center">Error loading map</div>;
    return <MapComponent center={center} zoom={15} />;
  };

  return (
    <div className="grid lg:grid-cols-3 gap-6 h-[calc(100vh-8rem)]">
      
      {/* Sidebar Info */}
      <div className="lg:col-span-1 flex flex-col gap-6 overflow-y-auto pr-2 pb-8">
        
        <div className="bg-white rounded-2xl p-6 border border-dark-200 shadow-sm">
          <div className="mb-4">
            <label className="block text-sm font-bold text-dark-700 mb-2">Search your polling booth:</label>
            <input 
              id="booth-search"
              type="text" 
              placeholder="e.g. Kendriya Vidyalaya..." 
              className="w-full bg-dark-50 border border-dark-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
            />
          </div>

          <div className="flex items-start gap-4 mb-4 pt-4 border-t border-dark-100">
            <div className="bg-primary-50 p-3 rounded-xl text-primary-600">
              <MapPin size={24} />
            </div>
            <div>
              <p className="text-sm font-bold text-primary-600 mb-1">YOUR BOOTH</p>
              <h2 className="text-xl font-bold text-dark-900">{boothName}</h2>
              <p className="text-dark-500 text-sm mt-1">{boothAddress}</p>
            </div>
          </div>
          
          <button className="w-full bg-dark-900 hover:bg-black text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors">
            <Navigation size={18} /> Get Directions
          </button>
        </div>

        {/* Queue Predictor Component */}
        <QueuePredictor />

        <div className="bg-emerald-50 rounded-2xl p-6 border border-emerald-200">
          <div className="flex items-center gap-3 mb-2">
            <Clock className="text-emerald-600" size={20} />
            <h3 className="font-bold text-emerald-900">Best Time to Visit</h3>
          </div>
          <p className="text-emerald-800 text-sm">
            Based on historical data from in-rolls.github.io, we recommend visiting between <strong>1:00 PM and 3:00 PM</strong> to avoid long queues.
          </p>
        </div>

      </div>

      {/* Map Area */}
      <div className="lg:col-span-2 bg-white rounded-2xl border border-dark-200 p-2 h-[50vh] lg:h-full shadow-sm">
        {apiKey ? (
          <Wrapper apiKey={apiKey} libraries={["places"]} render={render} />
        ) : (
          <div className="w-full h-full bg-dark-100 rounded-xl flex items-center justify-center flex-col text-dark-500">
            <MapPin size={48} className="mb-4 opacity-50" />
            <p>Google Maps API Key not configured</p>
          </div>
        )}
      </div>

    </div>
  );
}
