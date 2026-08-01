import React, { useEffect, useRef, useState } from "react";
import { useLanguage } from "../i18n/LanguageContext";

const StatsCounterSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.3 },
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  const useCounterAnimation = (target: number, duration: number = 2000) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      if (!isVisible) return;
      let startTime: number;
      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        setCount(Math.floor(progress * target));
        if (progress < 1) requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
    }, [isVisible, target, duration]);

    return count;
  };

  const iosCount = useCounterAnimation(15420);
  const androidCount = useCounterAnimation(23850);
  const totalCount = useCounterAnimation(39270);

  return (
    <section
      ref={sectionRef}
      className="stats-counter-section py-24 lg:py-32 relative overflow-hidden bg-[#f5f8ff]"
    >
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl -translate-y-1/2"></div>
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl -translate-y-1/2"></div>

      <div className="container mx-auto px-4 lg:px-8 max-w-7xl relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block px-6 py-2 bg-accent/10 border border-accent/30 rounded-full text-sm font-semibold text-accent mb-6">
            {t.stats.badge}
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-[#1e2332]">
            {t.stats.title} <span className="gradient-text">{t.stats.titleAccent}</span>
          </h2>
          <p className="text-lg text-[#6b7280] max-w-2xl mx-auto">{t.stats.desc}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mx-auto">
          {/* iOS Users */}
          <div className="stat-card group relative p-8 bg-white border border-[#e2e8f0] rounded-3xl transition-all duration-500 hover:border-accent/50 hover:-translate-y-2 hover:shadow-glow">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="flex gap-5 items-center">
              <div className="relative mb-6 flex justify-center">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-glow-sm transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                  </svg>
                </div>
              </div>
              <div className="relative text-center">
                <div className="text-5xl lg:text-6xl font-bold mb-3 gradient-text counter-number">
                  {iosCount.toLocaleString()}
                </div>
                <div className="text-xl font-semibold text-[#1e2332] mb-2">{t.stats.iosUsers}</div>
                <div className="text-sm text-[#9ca3af]">{t.stats.activeOnAppStore}</div>
              </div>
            </div>
            <div className="relative mt-6 h-1 bg-border/30 rounded-full overflow-hidden">
              <div
                className="progress-bar-ios absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full transition-all duration-2000 ease-out"
                style={{ width: isVisible ? "65%" : "0%" }}
              ></div>
            </div>
            <div className="shimmer-effect"></div>
          </div>

          {/* Android Users */}
          <div className="stat-card group relative p-8 bg-card/40 border border-border/50 rounded-3xl backdrop-blur-xl transition-all duration-500 hover:border-accent/50 hover:-translate-y-2 hover:shadow-glow">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="flex gap-5 items-center">
              <div className="relative mb-6 flex justify-center">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-glow-sm transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.6 9.48l1.84-3.18c.16-.31.04-.69-.26-.85-.29-.15-.65-.06-.83.22l-1.88 3.24c-2.86-1.21-6.08-1.21-8.94 0L5.65 5.67c-.19-.28-.54-.38-.83-.22-.3.16-.42.54-.26.85l1.84 3.18C4.1 11.24 2.5 13.8 2.5 16.5h19c0-2.7-1.6-5.26-3.9-7.02zM7 14.5c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm10 0c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z" />
                  </svg>
                </div>
              </div>
              <div className="relative text-center">
                <div className="text-5xl lg:text-6xl font-bold mb-3 gradient-text counter-number">
                  {androidCount.toLocaleString()}
                </div>
                <div className="text-xl font-semibold text-[#1e2332] mb-2">{t.stats.androidUsers}</div>
                <div className="text-sm text-[#9ca3af]">{t.stats.activeOnPlayStore}</div>
              </div>
            </div>
            <div className="relative mt-6 h-1 bg-border/30 rounded-full overflow-hidden">
              <div
                className="progress-bar-android absolute inset-y-0 left-0 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full transition-all duration-2000 ease-out"
                style={{ width: isVisible ? "85%" : "0%" }}
              ></div>
            </div>
            <div className="shimmer-effect"></div>
          </div>

          {/* Total Users */}
          <div className="stat-card group relative p-8 bg-card/40 border border-border/50 rounded-3xl backdrop-blur-xl transition-all duration-500 hover:border-accent/50 hover:-translate-y-2 hover:shadow-glow">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="flex gap-5 items-center">
              <div className="relative mb-6 flex justify-center">
                <div className="w-20 h-20 bg-gradient-to-br from-accent to-blue-600 rounded-2xl flex items-center justify-center shadow-glow-sm transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                  </svg>
                </div>
              </div>
              <div className="relative text-center">
                <div className="text-5xl lg:text-6xl font-bold mb-3 gradient-text counter-number">
                  {totalCount.toLocaleString()}
                </div>
                <div className="text-xl font-semibold text-[#1e2332] mb-2">{t.stats.totalUsers}</div>
                <div className="text-sm text-[#9ca3af]">{t.stats.legacyProtected}</div>
              </div>
            </div>
            <div className="relative mt-6 h-1 bg-border/30 rounded-full overflow-hidden">
              <div
                className="progress-bar-total absolute inset-y-0 left-0 bg-gradient-to-r from-accent to-blue-600 rounded-full transition-all duration-2000 ease-out"
                style={{ width: isVisible ? "95%" : "0%" }}
              ></div>
            </div>
            <div className="shimmer-effect"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsCounterSection;
