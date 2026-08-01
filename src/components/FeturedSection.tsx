import {
  FileText,
  CircleDollarSign,
  Cloud,
  Users,
  Shield,
  Smartphone,
} from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";

export default function FeaturesSection() {
  const { t } = useLanguage();

  const icons = [
    <FileText size={60} />,
    <CircleDollarSign size={60} />,
    <Cloud size={60} />,
    <Users size={60} />,
    <Shield size={60} />,
    <Smartphone size={60} />,
  ];

  return (
    <section
      id="features"
      className="py-24 lg:py-32 bg-[#f5f8ff] relative overflow-hidden"
    >
      <div className="absolute top-20 right-10 w-72 h-72 bg-accent/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 tracking-tight text-[#1e2332]">
            {t.features.title}{" "}
            <span className="gradient-text">{t.features.titleAccent}</span>
          </h2>
          <p className="text-lg text-[#6b7280] leading-relaxed">{t.features.desc}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {t.features.items.map((feature, index) => (
            <div
              key={index}
              className="feature-card-premium group p-8 bg-white border border-[#e2e8f0] rounded-2xl transition-all duration-300 hover:border-accent/50 hover:-translate-y-2 hover:shadow-glow block"
            >
              <div className="text-5xl mb-6 transition-transform duration-300 group-hover:scale-110 text-accent">
                {icons[index]}
              </div>
              <h3 className="text-xl lg:text-2xl font-semibold mb-4 text-[#1e2332] group-hover:text-accent transition-colors">
                {feature.title}
              </h3>
              <p className="text-[#6b7280] leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
