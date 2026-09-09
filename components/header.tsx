import React from 'react';

export function Header() {
  return (
    <header className="border-b border-emerald-900/40 bg-[#061513]/80 backdrop-blur-md sticky top-0 z-30">
      <div className="max-w-6xl xl:max-w-7xl 2xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo and Brand */}
        <a href="#" className="flex items-center gap-3 group">
          {/* Glowing Sphere Logo from screenshot */}
          <div className="relative w-8 h-8 rounded-full flex items-center justify-center p-0.5 bg-gradient-to-br from-emerald-400 via-teal-500 to-emerald-800 shadow-[0_0_12px_rgba(16,185,129,0.35)] group-hover:shadow-[0_0_16px_rgba(16,185,129,0.5)] transition-all">
            <div className="w-full h-full rounded-full bg-[#08221e] relative overflow-hidden flex items-center justify-center">
              {/* Internal Sphere Glow and Arc */}
              <div className="absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-emerald-300/40 blur-[2px]" />
              <div className="w-4 h-4 rounded-full bg-gradient-to-tr from-teal-700 via-emerald-500 to-cyan-200 shadow-inner" />
            </div>
          </div>

          <div>
            <div className="font-bold text-white text-base leading-tight tracking-tight">
              MoneyValue
            </div>
            <div className="text-[11px] text-emerald-200/50 font-normal tracking-normal">
              Inflation &amp; Purchasing Power
            </div>
          </div>
        </a>

        {/* Right Navigation */}
        <div className="flex items-center gap-2">
          <a
            href="#methodology"
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium text-emerald-100/70 hover:text-white hover:bg-emerald-950/40 transition-colors"
          >
            <svg
              className="w-4 h-4 text-emerald-400/80"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.75"
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
            <span>Methodology &amp; Sources</span>
          </a>
        </div>
      </div>
    </header>
  );
}
