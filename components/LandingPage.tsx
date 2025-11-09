import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

const LandingPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setSubmitError('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);
    setSubmitSuccess(false);
    setSubmitError(null);

    const { error } = await supabase
      .from('waitlist')
      .insert({ email: email });

    setIsSubmitting(false);

    if (error) {
      console.error('Supabase error:', error.message);
      setSubmitError(`Error: ${error.message}. Please try again.`);
    } else {
      setSubmitSuccess(true);
      setEmail('');
      setTimeout(() => setSubmitSuccess(false), 5000); // Reset after 5 seconds
    }
  };

  const mandalaStyle = {
    background: `
      radial-gradient(circle, rgba(219, 234, 254, 0.15) 0%, transparent 25%),
      radial-gradient(circle, rgba(226, 223, 255, 0.12) 25%, transparent 50%),
      radial-gradient(circle, rgba(233, 213, 255, 0.1) 50%, transparent 70%)
    `,
    filter: 'blur(8px)',
  };

  return (
    <div className="relative min-h-screen w-full bg-white flex items-center justify-center overflow-hidden p-4">
      {/* Subtle Corner Mandala Designs */}
      <div 
        className="absolute top-0 right-0 w-[400px] h-[400px] transform -translate-y-1/3 translate-x-1/3 pointer-events-none"
        style={mandalaStyle}
      ></div>
      <div 
        className="absolute bottom-0 left-0 w-[400px] h-[400px] transform translate-y-1/3 -translate-x-1/3 pointer-events-none"
        style={mandalaStyle}
      ></div>

      {/* Shimmer Animation Background */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage: `repeating-linear-gradient(to right, transparent, transparent 150px, rgba(229, 231, 235, 0.4) 150px, rgba(229, 231, 235, 0.4) 151px)`,
          backgroundSize: '100% 200%',
        }}
      >
        <div className="absolute inset-0 animate-shimmer" style={{ background: `linear-gradient(to bottom, white 0%, transparent 50%, white 100%)`}}></div>
      </div>


      <main className="z-10 flex flex-col items-center text-center">
        <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-black tracking-[0.2em] sm:tracking-[0.3em] uppercase">
          METI
        </h1>
        <h2 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-black tracking-[0.2em] sm:tracking-[0.3em] uppercase -mt-2 md:-mt-4">
          SIUM
        </h2>
        
        <div className="mt-6 text-sm font-light tracking-widest border border-gray-300 rounded-full px-4 py-1 inline-block">
            <span className="text-gray-500">Powered by </span>
            <span className="text-gray-800 font-semibold">MORC</span>
        </div>

        <div className="mt-12 w-full max-w-sm">
          <form onSubmit={handleSubmit} className="flex flex-row items-center gap-2">
            <label htmlFor="email-input" className="sr-only">
              Email address
            </label>
            <input
              id="email-input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              disabled={isSubmitting}
              className="flex-1 min-w-0 w-full px-5 py-3 bg-white border border-gray-300 rounded-full shadow-inner text-left text-gray-900
                        placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 
                        transition-all duration-300 ease-in-out disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-shrink-0 px-6 py-3 bg-black text-white font-semibold rounded-full shadow-md border border-gray-300
                        hover:bg-white hover:text-black
                        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black
                        transition-colors duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Joining...' : 'Join Waitlist'}
            </button>
          </form>
          {submitSuccess && (
            <p className="mt-4 text-green-600">
              Thank you! You've been added to the waitlist.
            </p>
          )}
          {submitError && (
            <p className="mt-4 text-red-600">
              {submitError}
            </p>
          )}
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
