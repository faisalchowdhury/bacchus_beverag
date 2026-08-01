import React, { useEffect, useState } from "react";
import Header from "../../layouts/Header";
import Footer from "../../layouts/Footer";
import { useLanguage } from "../../i18n/LanguageContext";

const Terms: React.FC = () => {
  const { t } = useLanguage();
  const tr = t.terms;
  const [activeSection, setActiveSection] = useState<string>("acceptance");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 },
    );

    tr.sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [tr.sections]);

  const handleClick = (id: string) => {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-white text-[#1e2332]">
      <Header />

      <div className="pt-30">
        <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-12">
              <div className="inline-block px-6 py-2 bg-accent/10 border border-accent/30 rounded-full text-sm font-semibold text-accent mb-6">
                {tr.badge}
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
                {tr.title}{" "}
                <span className="gradient-text">{tr.titleAccent}</span>
              </h1>
              <p className="text-lg text-[#6b7280] max-w-3xl mx-auto mb-4">
                {tr.desc}
              </p>
              <p className="text-sm text-[#9ca3af]">{tr.lastUpdated}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
              <div className="section-card text-center">
                <div className="text-4xl mb-4">📱</div>
                <h3 className="text-xl font-semibold mb-2">
                  {tr.deviceOnlyTitle}
                </h3>
                <p className="text-sm text-[#6b7280]">{tr.deviceOnlyDesc}</p>
              </div>
              <div className="section-card text-center">
                <div className="text-4xl mb-4">⚖️</div>
                <h3 className="text-xl font-semibold mb-2">
                  {tr.noLegalTitle}
                </h3>
                <p className="text-sm text-[#6b7280]">{tr.noLegalDesc}</p>
              </div>
              <div className="section-card text-center">
                <div className="text-4xl mb-4">18+</div>
                <h3 className="text-xl font-semibold mb-2">{tr.ageTitle}</h3>
                <p className="text-sm text-[#6b7280]">{tr.ageDesc}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="pb-24 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="table-of-contents">
                  <h3 className="text-xl font-bold mb-4 text-[#1e2332]">
                    {tr.contentsTitle}
                  </h3>
                  <nav>
                    {tr.sections.map(({ id, label }) => (
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
                  <div id="acceptance" className="terms-section">
                    <h2>{tr.s1Title}</h2>
                    <p>{tr.s1p1}</p>
                    <p>{tr.s1p2}</p>
                    <div className="highlight-box">
                      <p>
                        <strong>{tr.s1highlight}</strong> {tr.s1highlightText}
                      </p>
                    </div>
                  </div>

                  <div id="description" className="terms-section">
                    <h2>{tr.s2Title}</h2>
                    <p>{tr.s2p1}</p>
                    <ul>
                      {tr.s2items.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                    <h3>{tr.s2sub1}</h3>
                    <div className="warning-box">
                      <p>
                        <strong>{tr.s2warning}</strong> {tr.s2warningText}
                      </p>
                    </div>
                    <h3>{tr.s2sub2}</h3>
                    <p>{tr.s2sub2p1}</p>
                    <ul>
                      {tr.s2sub2items.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                    <div className="highlight-box">
                      <p>
                        <strong>{tr.s2highlight}</strong> {tr.s2highlightText}
                      </p>
                    </div>
                  </div>

                  <div id="eligibility" className="terms-section">
                    <h2>{tr.s3Title}</h2>
                    <h3>{tr.s3sub1}</h3>
                    <p>{tr.s3sub1p1}</p>
                    <h3>{tr.s3sub2}</h3>
                    <p>{tr.s3sub2p1}</p>
                  </div>

                  <div id="user-responsibilities" className="terms-section">
                    <h2>{tr.s4Title}</h2>
                    <h3>{tr.s4sub1}</h3>
                    <p>{tr.s4sub1p1}</p>
                    <ul>
                      {tr.s4sub1items.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                    <h3>{tr.s4sub2}</h3>
                    <p>{tr.s4sub2p1}</p>
                    <ul>
                      {tr.s4sub2items.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                    <h3>{tr.s4sub3}</h3>
                    <div className="warning-box">
                      <p>
                        <strong>{tr.s4warning}</strong> {tr.s4warningText}
                      </p>
                    </div>
                    <h3>{tr.s4sub4}</h3>
                    <p>{tr.s4sub4p1}</p>
                    <ul>
                      {tr.s4sub4items.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div id="prohibited" className="terms-section">
                    <h2>{tr.s5Title}</h2>
                    <p>{tr.s5p1}</p>
                    <ul>
                      {tr.s5items.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div id="intellectual-property" className="terms-section">
                    <h2>{tr.s6Title}</h2>
                    <h3>{tr.s6sub1}</h3>
                    <p>{tr.s6sub1p1}</p>
                    <h3>{tr.s6sub2}</h3>
                    <p>{tr.s6sub2p1}</p>
                    <h3>{tr.s6sub3}</h3>
                    <p>{tr.s6sub3p1}</p>
                  </div>

                  <div id="disclaimers" className="terms-section">
                    <h2>{tr.s7Title}</h2>
                    <h3>{tr.s7sub1}</h3>
                    <div className="warning-box">
                      <p>
                        <strong>{tr.s7warning}</strong> {tr.s7warningText}
                      </p>
                    </div>
                    <h3>{tr.s7sub2}</h3>
                    <p>{tr.s7sub2p1}</p>
                    <ul>
                      {tr.s7sub2items.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                    <h3>{tr.s7sub3}</h3>
                    <p>{tr.s7sub3p1}</p>
                    <ul>
                      {tr.s7sub3items.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                    <h3>{tr.s7sub4}</h3>
                    <p>{tr.s7sub4p1}</p>
                  </div>

                  <div id="limitation" className="terms-section">
                    <h2>{tr.s8Title}</h2>
                    <div className="warning-box">
                      <p>
                        <strong>{tr.s8warning}</strong> {tr.s8warningText}
                      </p>
                    </div>
                    <h3>{tr.s8sub1}</h3>
                    <p>{tr.s8sub1p1}</p>
                    <ul>
                      {tr.s8sub1items.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                    <h3>{tr.s8sub2}</h3>
                    <p>{tr.s8sub2p1}</p>
                  </div>

                  <div id="indemnification" className="terms-section">
                    <h2>{tr.s9Title}</h2>
                    <p>{tr.s9p1}</p>
                    <ul>
                      {tr.s9items.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div id="termination" className="terms-section">
                    <h2>{tr.s10Title}</h2>
                    <h3>{tr.s10sub1}</h3>
                    <p>{tr.s10sub1p1}</p>
                    <h3>{tr.s10sub2}</h3>
                    <p>{tr.s10sub2p1}</p>
                    <h3>{tr.s10sub3}</h3>
                    <p>{tr.s10sub3p1}</p>
                    <ul>
                      {tr.s10sub3items.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div id="changes" className="terms-section">
                    <h2>{tr.s11Title}</h2>
                    <h3>{tr.s11sub1}</h3>
                    <p>{tr.s11sub1p1}</p>
                    <ul>
                      {tr.s11sub1items.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                    <h3>{tr.s11sub2}</h3>
                    <p>{tr.s11sub2p1}</p>
                  </div>

                  <div id="governing-law" className="terms-section">
                    <h2>{tr.s12Title}</h2>
                    <h3>{tr.s12sub1}</h3>
                    <p>{tr.s12sub1p1}</p>
                    <h3>{tr.s12sub2}</h3>
                    <p>{tr.s12sub2p1}</p>
                    <ul>
                      {tr.s12sub2items.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                    <h3>{tr.s12sub3}</h3>
                    <p>{tr.s12sub3p1}</p>
                  </div>

                  <div id="contact" className="terms-section">
                    <h2>{tr.s13Title}</h2>
                    <p>{tr.s13p1}</p>
                    <div className="section-card mt-6 mb-6">
                      <h3 className="text-lg font-semibold mb-4 text-[#00d4ff]">
                        {tr.contactInfoTitle}
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
                  </div>

                  <div className="terms-section">
                    <h2>{tr.addTitle}</h2>
                    <h3>{tr.severabilityTitle}</h3>
                    <p>{tr.severabilityP}</p>
                    <h3>{tr.entireAgreementTitle}</h3>
                    <p>{tr.entireAgreementP}</p>
                    <h3>{tr.noWaiverTitle}</h3>
                    <p>{tr.noWaiverP}</p>
                    <h3>{tr.assignmentTitle}</h3>
                    <p>{tr.assignmentP}</p>
                  </div>

                  <div className="highlight-box">
                    <p className="text-lg">
                      <strong>{tr.finalNotice}</strong>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default Terms;
