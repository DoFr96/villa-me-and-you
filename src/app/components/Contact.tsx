'use client'
import { Mail, Phone, MapPin, Instagram, Facebook } from 'lucide-react'

const Contact = () => {
  return (
    <div className="w-full px-2 sm:px-3  overflow-hidden ">
      <div className="h-full w-full rounded-[2rem] bg-white overflow-hidden">
        <section className="px-6 md:px-12 lg:px-20 py-20 md:py-32 bg-stone-900 text-white">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20">
              {/* Lijevo - CTA */}
              <div>
                <p className="text-stone-500 text-xs tracking-[0.3em] uppercase mb-4">Kontakt</p>
                <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-tight mb-6">
                  Rezervirajte svoj
                  <br />
                  <span className="text-[#a39e6e]">bijeg od svega</span>
                </h2>
                <p className="text-stone-400 font-light max-w-md mb-10">
                  Javite nam se s pitanjima ili rezervirajte direktno. Odgovaramo u roku od 24 sata.
                </p>

                {/* Contact links */}
                <div className="space-y-4">
                  <a
                    href="mailto:info@villameandyou.com"
                    className="flex items-center gap-4 text-white hover:text-[#a39e6e] transition group"
                  >
                    <div className="w-12 h-12 rounded-full border border-stone-700 flex items-center justify-center group-hover:border-[#a39e6e] transition">
                      <Mail className="w-5 h-5" strokeWidth={1.5} />
                    </div>
                    <span className="text-lg">info@villameandyou.com</span>
                  </a>

                  <a
                    href="tel:+385911234567"
                    className="flex items-center gap-4 text-white hover:text-[#a39e6e] transition group"
                  >
                    <div className="w-12 h-12 rounded-full border border-stone-700 flex items-center justify-center group-hover:border-[#a39e6e] transition">
                      <Phone className="w-5 h-5" strokeWidth={1.5} />
                    </div>
                    <span className="text-lg">+385 91 123 4567</span>
                  </a>

                  <a
                    href="https://wa.me/385911234567"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 text-white hover:text-[#a39e6e] transition group"
                  >
                    <div className="w-12 h-12 rounded-full border border-stone-700 flex items-center justify-center group-hover:border-[#a39e6e] transition">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                    </div>
                    <span className="text-lg">Send me a message</span>
                  </a>
                </div>

                {/* Social */}
                <div className="flex gap-3 mt-10">
                  <a
                    href="#"
                    className="w-10 h-10 rounded-full border border-stone-700 flex items-center justify-center hover:border-[#a39e6e] hover:text-[#a39e6e] transition"
                  >
                    <Instagram className="w-4 h-4" strokeWidth={1.5} />
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 rounded-full border border-stone-700 flex items-center justify-center hover:border-[#a39e6e] hover:text-[#a39e6e] transition"
                  >
                    <Facebook className="w-4 h-4" strokeWidth={1.5} />
                  </a>
                </div>
              </div>

              {/* Desno - Quick message */}
              <div className="flex flex-col justify-center">
                <div className="bg-stone-800/50 rounded-3xl p-8 md:p-10">
                  <h3 className="font-serif text-2xl mb-6">Brzi upit</h3>

                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="Vaše ime"
                      className="w-full bg-transparent border-b border-stone-700 py-3 text-white placeholder:text-stone-500 focus:border-[#a39e6e] focus:outline-none transition"
                    />
                    <input
                      type="email"
                      placeholder="Email adresa"
                      className="w-full bg-transparent border-b border-stone-700 py-3 text-white placeholder:text-stone-500 focus:border-[#a39e6e] focus:outline-none transition"
                    />
                    <textarea
                      placeholder="Vaša poruka"
                      rows={3}
                      className="w-full bg-transparent border-b border-stone-700 py-3 text-white placeholder:text-stone-500 focus:border-[#a39e6e] focus:outline-none transition resize-none"
                    />
                  </div>

                  <button className="mt-8 w-full py-4 bg-[#a39e6e] hover:bg-[#8a8659] text-white text-sm uppercase tracking-wider rounded-full transition">
                    Pošalji upit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Contact
