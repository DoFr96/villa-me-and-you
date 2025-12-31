import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    question: "Jesu li kućni ljubimci dozvoljeni?",
    answer:
      "Da, psi su dobrodošli uz naknadu od 10€ po danu. Molimo vlasnike da u slučaju bilo kakve veće štete financijski pokriju nastale troškove. Ljubimci moraju biti navedeni prilikom rezervacije.",
    icon: "pet",
  },
  {
    question: "Koliki je minimalni broj noćenja?",
    answer:
      "Minimalni boravak ovisi o sezoni: izvan sezone (listopad - svibanj) minimum je 2 noćenja, dok je u sezoni (lipanj - rujan) potrebno minimalno 5 noćenja. Za blagdanske termine mogu vrijediti posebni uvjeti.",
    icon: "calendar",
  },
  {
    question: "Je li bazen grijan i kakva je situacija s wellnessom?",
    answer:
      "Bazen se grije od 1. ožujka do 1. prosinca, održavajući ugodnu temperaturu za kupanje. Wellness zona (sauna, jacuzzi) nalazi se u sklopu kuće i potpuno je funkcionalna tijekom cijele godine - savršeno za opuštanje u bilo koje doba.",
    icon: "pool",
  },
  {
    question: "Kako funkcionira rezervacija, depozit i otkazivanje?",
    answer:
      "Prilikom rezervacije (karticom ili uplatom na bankovni račun) plaća se depozit od 30% ukupne cijene. Preostali iznos dospijeva 2 tjedna prije dolaska. Besplatno otkazivanje moguće je do mjesec dana prije dolaska - u suprotnom zadržavamo depozit kao naknadu.",
    icon: "card",
  },
];

const icons = {
  pet: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 5.172C10 3.782 8.423 2.679 6.5 3c-2.823.47-4.113 6.006-4 7 .08.703 1.725 1.722 3.656 1 1.261-.472 1.96-1.45 2.344-2.5M14.267 5.172c0-1.39 1.577-2.493 3.5-2.172 2.823.47 4.113 6.006 4 7-.08.703-1.725 1.722-3.656 1-1.261-.472-1.855-1.45-2.239-2.5M8 14v.5M16 14v.5M11.25 16.25h1.5L12 17l-.75-.75Z" />
      <path d="M4.42 11.247A13.152 13.152 0 0 0 4 14.556C4 18.728 7.582 21 12 21s8-2.272 8-6.444c0-1.061-.162-2.2-.493-3.309m-9.243-6.082A8.801 8.801 0 0 1 12 5c.78 0 1.5.108 2.161.306" />
    </svg>
  ),
  calendar: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <line x1="16" x2="16" y1="2" y2="6" />
      <line x1="8" x2="8" y1="2" y2="6" />
      <line x1="3" x2="21" y1="10" y2="10" />
      <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01" />
    </svg>
  ),
  pool: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 12h20M2 12c0 4.418 4.477 8 10 8s10-3.582 10-8M2 12c0-1.657 1.343-3 3-3 2.21 0 4 1.79 4 4M22 12c0-1.657-1.343-3-3-3-2.21 0-4 1.79-4 4" />
      <path d="M7 7c0-1.105.895-2 2-2s2 .895 2 2v1M13 7c0-1.105.895-2 2-2s2 .895 2 2v1" />
      <path d="M12 3v2" />
    </svg>
  ),
  card: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="14" x="2" y="5" rx="2" />
      <line x1="2" x2="22" y1="10" y2="10" />
      <path d="M6 15h2M12 15h4" />
    </svg>
  ),
};

export default function App() {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const toggleFaq = (index) => {
    setSelectedIndex(selectedIndex === index ? null : index);
  };

  return (
    <section className="min-h-screen py-16 bg-gradient-to-b from-stone-50 to-stone-100">
      <div className="max-w-3xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 border border-[#A89A68]/30 text-[#A89A68] px-4 py-2 rounded-full mb-6"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
              <path d="M12 17h.01" />
            </svg>
            <span className="text-sm font-medium tracking-wider uppercase">
              Česta pitanja
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-medium leading-tight text-neutral-800"
          >
            Imate pitanja?
            <br />
            <span className="text-[#A89A68]">Mi imamo odgovore</span>
          </motion.h2>
        </div>

        {/* FAQ Items */}
        <div className="flex flex-col gap-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={faq.question}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
              className="bg-white rounded-2xl border border-[#A89A68]/15 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer overflow-hidden"
              onClick={() => toggleFaq(index)}
            >
              <div className="p-5 md:p-6">
                <div className="flex items-center gap-4">
                  {/* Icon */}
                  <div
                    className={`shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-colors duration-300 ${
                      selectedIndex === index 
                        ? "bg-[#A89A68] text-white" 
                        : "bg-[#A89A68]/10 text-[#A89A68]"
                    }`}
                  >
                    {icons[faq.icon]}
                  </div>

                  {/* Question */}
                  <h3 className="flex-1 font-medium text-lg text-neutral-800">
                    {faq.question}
                  </h3>

                  {/* Plus icon */}
                  <motion.div
                    animate={{ rotate: selectedIndex === index ? 45 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="shrink-0"
                  >
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-[#A89A68]"
                    >
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                  </motion.div>
                </div>

                {/* Answer */}
                <AnimatePresence>
                  {selectedIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="mt-4 pl-16 leading-relaxed text-base text-neutral-500">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
