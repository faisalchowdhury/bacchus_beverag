import React, { useEffect, useState } from "react";
import Header from "../../layouts/Header";
import Footer from "../../layouts/Footer";
import { useLanguage } from "../../i18n/LanguageContext";

const PrivacyPolicy: React.FC = () => {
  const { t } = useLanguage();
  const p = t.privacy;
  const [activeSection, setActiveSection] = useState<string>("introduction");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 },
    );

    p.sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [p.sections]);

  const handleClick = (id: string) => {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-white text-[#1e2332] pt-30">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <div className="inline-block px-6 py-2 bg-accent/10 border border-accent/30 rounded-full text-sm font-semibold text-accent mb-6">
              {p.badge}
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              {p.title} <span className="gradient-text">{p.titleAccent}</span>
            </h1>
            <p className="text-lg text-[#6b7280] max-w-3xl mx-auto mb-4">
              {p.desc}
            </p>
            <p className="text-sm text-[#9ca3af]">{p.lastUpdated}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="section-card text-center">
              <div className="text-4xl mb-4">🔒</div>
              <h3 className="text-xl font-semibold mb-2">
                {p.localStorageTitle}
              </h3>
              <p className="text-sm text-[#6b7280]">{p.localStorageDesc}</p>
            </div>
            <div className="section-card text-center">
              <div className="text-4xl mb-4">🚫</div>
              <h3 className="text-xl font-semibold mb-2">{p.noDataTitle}</h3>
              <p className="text-sm text-[#6b7280]">{p.noDataDesc}</p>
            </div>
            <div className="section-card text-center">
              <div className="text-4xl mb-4">🛡️</div>
              <h3 className="text-xl font-semibold mb-2">
                {p.fullControlTitle}
              </h3>
              <p className="text-sm text-[#6b7280]">{p.fullControlDesc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="pb-24 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar TOC */}
            <div className="lg:col-span-1">
              <div className="table-of-contents">
                <h3 className="text-xl font-bold mb-4 text-[#1e2332]">
                  {p.contentsTitle}
                </h3>
                <nav>
                  {p.sections.map(({ id, label }) => (
                    <a
                      key={id}
                      href={`#${id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        handleClick(id);
                      }}
                      className={`toc-link ${activeSection === id ? "toc-link-active" : ""}`}
                    >
                      {label}
                    </a>
                  ))}
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="section-card">
                <div id="introduction" className="policy-section">
                  <h2>{p.s1Title}</h2>
                  <p>{p.s1p1}</p>
                  <div className="highlight-box">
                    <p>
                      <strong>{p.s1highlight}</strong> {p.s1highlightText}
                    </p>
                  </div>
                  <p>{p.s1p2}</p>
                </div>

                <div id="data-storage" className="policy-section">
                  <h2>{p.s2Title}</h2>
                  <p>{p.s2p1}</p>
                  <ul>
                    <li>
                      <strong>{p.s2li1.split(":")[0]}:</strong>{" "}
                      {p.s2li1.split(":").slice(1).join(":")}
                    </li>
                    <li>
                      <strong>{p.s2li2.split(":")[0]}:</strong>{" "}
                      {p.s2li2.split(":").slice(1).join(":")}
                    </li>
                    <li>
                      <strong>{p.s2li3.split(":")[0]}:</strong>{" "}
                      {p.s2li3.split(":").slice(1).join(":")}
                    </li>
                    <li>
                      <strong>{p.s2li4.split(":")[0]}:</strong>{" "}
                      {p.s2li4.split(":").slice(1).join(":")}
                    </li>
                  </ul>
                  <div className="highlight-box">
                    <p>
                      <strong>{p.s2highlight}</strong> {p.s2highlightText}
                    </p>
                  </div>
                </div>

                <div id="information-collect" className="policy-section">
                  <h2>{p.s3Title}</h2>
                  <h3>{p.s3sub1}</h3>
                  <p>{p.s3sub1p1}</p>
                  <ul>
                    {p.s3sub1items.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                  <h3>{p.s3sub2}</h3>
                  <p>{p.s3sub2p1}</p>
                  <ul>
                    {p.s3sub2items.map((item, i) => (
                      <li key={i}>
                        <strong>{item.split(":")[0]}:</strong>{" "}
                        {item.split(":").slice(1).join(":")}
                      </li>
                    ))}
                  </ul>
                  <h3>{p.s3sub3}</h3>
                  <ul>
                    {p.s3sub3items.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div id="how-we-use" className="policy-section">
                  <h2>{p.s4Title}</h2>
                  <h3>{p.s4sub1}</h3>
                  <p>{p.s4sub1p1}</p>
                  <h3>{p.s4sub2}</h3>
                  <p>{p.s4sub2p1}</p>
                  <ul>
                    {p.s4sub2items.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div id="data-sharing" className="policy-section">
                  <h2>{p.s5Title}</h2>
                  <h3>{p.s5sub1}</h3>
                  <div className="highlight-box">
                    <p>
                      <strong>{p.s5highlight}</strong> {p.s5highlightText}
                    </p>
                  </div>
                  <h3>{p.s5sub2}</h3>
                  <p>{p.s5sub2p1}</p>
                  <ul>
                    {p.s5sub2items.map((item, i) => (
                      <li key={i}>
                        <strong>{item.split(":")[0]}:</strong>{" "}
                        {item.split(":").slice(1).join(":")}
                      </li>
                    ))}
                  </ul>
                  <h3>{p.s5sub3}</h3>
                  <p>{p.s5sub3p1}</p>
                </div>

                <div id="data-security" className="policy-section">
                  <h2>{p.s6Title}</h2>
                  <h3>{p.s6sub1}</h3>
                  <p>{p.s6sub1p1}</p>
                  <h3>{p.s6sub2}</h3>
                  <p>{p.s6sub2p1}</p>
                  <ul>
                    {p.s6sub2items.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                  <h3>{p.s6sub3}</h3>
                  <p>{p.s6sub3p1}</p>
                </div>

                <div id="your-rights" className="policy-section">
                  <h2>{p.s7Title}</h2>
                  <h3>{p.s7sub1}</h3>
                  <p>{p.s7sub1p1}</p>
                  <h3>{p.s7sub2}</h3>
                  <p>{p.s7sub2p1}</p>
                  <ul>
                    {p.s7sub2items.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                  <h3>{p.s7sub3}</h3>
                  <p>{p.s7sub3p1}</p>
                  <h3>{p.s7sub4}</h3>
                  <p>{p.s7sub4p1}</p>
                  <ul>
                    {p.s7sub4items.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div id="children" className="policy-section">
                  <h2>{p.s8Title}</h2>
                  <p>{p.s8p1}</p>
                </div>

                <div id="changes" className="policy-section">
                  <h2>{p.s9Title}</h2>
                  <p>{p.s9p1}</p>
                  <ul>
                    {p.s9items.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                  <p>{p.s9p2}</p>
                </div>

                <div id="contact" className="policy-section">
                  <h2>{p.s10Title}</h2>
                  <p>{p.s10p1}</p>
                  <div className="section-card mt-6 mb-6">
                    <h3 className="text-lg font-semibold mb-4 text-[#00d4ff]">
                      {p.contactInfoTitle}
                    </h3>
                    <p>
                      <strong>Email:</strong> info@legacy-keeper.app
                    </p>
                    <p>
                      <strong>Support:</strong> info@legacy-keeper.app
                    </p>
                    {/* <p>
                      <strong>Address:</strong> 123 Legacy Street, San
                      Francisco, CA 94102
                    </p> */}
                  </div>
                  <p>{p.s10p2}</p>
                </div>

                <div className="policy-section">
                  <h2>{p.additionalTitle}</h2>
                  <h3>{p.intlTitle}</h3>
                  <p>{p.intlP}</p>
                  <h3>{p.caTitle}</h3>
                  <p>{p.caP}</p>
                  <h3>{p.euTitle}</h3>
                  <p>{p.euP}</p>
                </div>

                <div className="highlight-box">
                  <p className="text-lg">
                    <strong>{p.commitment}</strong> {p.commitmentText}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
