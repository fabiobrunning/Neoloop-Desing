import React, { useState } from 'react';
import { Play, RotateCcw } from 'lucide-react';

const AnimationsView: React.FC = () => {
  const [activeAnimations, setActiveAnimations] = useState<Record<string, boolean>>({});

  const animations = [
    {
      id: 'fade-in',
      name: 'Fade In',
      duration: '0.5s',
      easing: 'ease-in-out',
      className: 'animate-fade-in',
      keyframes: `@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}`,
    },
    {
      id: 'slide-up',
      name: 'Slide Up',
      duration: '0.5s',
      easing: 'ease-out',
      className: 'animate-slide-up',
      keyframes: `@keyframes slide-up {
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}`,
    },
    {
      id: 'slide-down',
      name: 'Slide Down',
      duration: '0.5s',
      easing: 'ease-out',
      className: 'animate-slide-down',
      keyframes: `@keyframes slide-down {
  from { transform: translateY(-20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}`,
    },
    {
      id: 'scale-in',
      name: 'Scale In',
      duration: '0.3s',
      easing: 'ease-out',
      className: 'animate-scale-in',
      keyframes: `@keyframes scale-in {
  from { transform: scale(0.9); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}`,
    },
    {
      id: 'bounce',
      name: 'Bounce',
      duration: '1s',
      easing: 'ease-in-out',
      className: 'animate-bounce',
      keyframes: `@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}`,
    },
    {
      id: 'pulse',
      name: 'Pulse',
      duration: '2s',
      easing: 'ease-in-out',
      className: 'animate-pulse',
      keyframes: `@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}`,
    },
    {
      id: 'rotate',
      name: 'Rotate',
      duration: '1s',
      easing: 'linear',
      className: 'animate-spin',
      keyframes: `@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}`,
    },
    {
      id: 'shake',
      name: 'Shake',
      duration: '0.5s',
      easing: 'ease-in-out',
      className: 'animate-shake',
      keyframes: `@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-10px); }
  75% { transform: translateX(10px); }
}`,
    },
  ];

  const playAnimation = (id: string) => {
    setActiveAnimations((prev) => ({ ...prev, [id]: false }));
    setTimeout(() => {
      setActiveAnimations((prev) => ({ ...prev, [id]: true }));
    }, 10);
  };

  const resetAnimation = (id: string) => {
    setActiveAnimations((prev) => ({ ...prev, [id]: false }));
  };

  return (
    <div className="grid grid-cols-1 gap-6">
      {/* Animations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {animations.map((animation) => (
          <div
            key={animation.id}
            className="bg-white p-6 rounded-3xl border border-slate-200 flex flex-col"
          >
            <div className="flex-1 flex items-center justify-center min-h-[200px] bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl mb-4 overflow-hidden">
              <div
                className={`w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl ${
                  activeAnimations[animation.id] ? animation.className : ''
                }`}
                style={{
                  animation: activeAnimations[animation.id]
                    ? `${animation.id} ${animation.duration} ${animation.easing}`
                    : 'none',
                }}
              ></div>
            </div>
            <div className="space-y-3">
              <div>
                <h4 className="font-bold text-slate-900">{animation.name}</h4>
                <p className="text-xs text-slate-500 font-mono mt-1">
                  {animation.duration} • {animation.easing}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => playAnimation(animation.id)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700 transition-colors"
                >
                  <Play size={14} />
                  Play
                </button>
                <button
                  onClick={() => resetAnimation(animation.id)}
                  className="px-3 py-2 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 transition-colors"
                >
                  <RotateCcw size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Timing Functions */}
      <div className="bg-white p-8 rounded-3xl border border-slate-200">
        <h3 className="text-xl font-bold text-slate-900 mb-6">Timing Functions (Easing)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { name: 'ease', value: 'ease' },
            { name: 'ease-in', value: 'ease-in' },
            { name: 'ease-out', value: 'ease-out' },
            { name: 'ease-in-out', value: 'ease-in-out' },
            { name: 'linear', value: 'linear' },
            { name: 'cubic-bezier', value: 'cubic-bezier(0.4, 0, 0.2, 1)' },
          ].map((timing) => (
            <div
              key={timing.name}
              className="bg-gradient-to-br from-slate-50 to-blue-50 p-4 rounded-xl border border-slate-200"
            >
              <p className="text-sm font-bold text-slate-900 mb-2">{timing.name}</p>
              <p className="text-xs text-slate-500 font-mono">{timing.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Duration Scale */}
      <div className="bg-white p-8 rounded-3xl border border-slate-200">
        <h3 className="text-xl font-bold text-slate-900 mb-6">Duration Scale</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {['75ms', '100ms', '150ms', '200ms', '300ms', '500ms', '700ms', '1000ms'].map((duration) => (
            <div
              key={duration}
              className="bg-slate-50 p-4 rounded-xl text-center border border-slate-200"
            >
              <p className="text-sm font-bold text-slate-900">{duration}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Demo */}
      <div className="bg-gradient-to-br from-slate-50 to-blue-50 p-12 rounded-3xl border border-slate-200">
        <h3 className="text-xl font-bold text-slate-900 mb-8 text-center">Demonstração Interativa</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <button className="px-6 py-4 bg-blue-600 text-white rounded-xl font-bold hover:scale-105 transition-transform duration-200">
            Hover para Scale
          </button>
          <button className="px-6 py-4 bg-green-500 text-white rounded-xl font-bold hover:rotate-3 transition-transform duration-300">
            Hover para Rotate
          </button>
          <button className="px-6 py-4 bg-purple-600 text-white rounded-xl font-bold hover:shadow-2xl transition-shadow duration-300">
            Hover para Shadow
          </button>
        </div>
      </div>

      {/* CSS Keyframes Reference */}
      <div className="bg-slate-900 p-8 rounded-3xl border border-slate-700">
        <h3 className="text-xl font-bold text-white mb-6">CSS Keyframes</h3>
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {animations.map((animation) => (
            <pre key={animation.id} className="text-blue-400 text-sm font-mono leading-relaxed">
              {animation.keyframes}
            </pre>
          ))}
        </div>
      </div>

      {/* Tailwind Classes */}
      <div className="bg-white p-8 rounded-3xl border border-slate-200">
        <h3 className="text-xl font-bold text-slate-900 mb-6">Tailwind CSS Classes</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {animations.map((animation) => (
            <div key={animation.id} className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <p className="text-sm font-bold text-slate-900 mb-1">{animation.name}</p>
              <code className="text-xs text-blue-600 font-mono">{animation.className}</code>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slide-up {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes slide-down {
          from { transform: translateY(-20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes scale-in {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }
        .animate-fade-in { animation: fade-in 0.5s ease-in-out; }
        .animate-slide-up { animation: slide-up 0.5s ease-out; }
        .animate-slide-down { animation: slide-down 0.5s ease-out; }
        .animate-scale-in { animation: scale-in 0.3s ease-out; }
        .animate-shake { animation: shake 0.5s ease-in-out; }
      `}</style>
    </div>
  );
};

export default AnimationsView;
