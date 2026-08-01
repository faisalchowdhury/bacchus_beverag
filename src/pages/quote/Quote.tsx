import Header from "../../layouts/Header";
import Footer from "../../layouts/Footer";
import QuoteWizard from "../../features/quote-wizard/QuoteWizard";

export default function QuotePage() {
  return (
    <div className="bg-luxury-black text-luxury-ivory min-h-screen">
      <Header />
      <QuoteWizard />
      <Footer />
    </div>
  );
}
