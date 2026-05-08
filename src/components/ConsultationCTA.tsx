import Link from 'next/link'

interface ConsultationCTAProps {
  headline?: string
  subtext?: string
  className?: string
}

export default function ConsultationCTA({
  headline = 'Ready to talk about your land?',
  subtext = 'A 30-minute consultation with Craig costs you nothing — and could change everything about how you sell.',
  className = '',
}: ConsultationCTAProps) {
  return (
    <section className={`bg-earth py-20 px-6 ${className}`}>
      <div className="max-w-3xl mx-auto text-center">
        {/* Divider line */}
        <div className="w-10 h-px bg-sunset mx-auto mb-8" />

        <h2 className="font-serif text-display-md text-offwhite mb-5 leading-tight">
          {headline}
        </h2>
        <p className="text-sand text-base leading-relaxed mb-10 max-w-xl mx-auto">
          {subtext}
        </p>
        <Link
          href="/contact"
          className="inline-block bg-sunset text-shadow font-semibold text-sm tracking-[0.08em] uppercase px-8 py-4 hover:bg-offwhite transition-colors duration-200"
        >
          Schedule Your Consultation
        </Link>
      </div>
    </section>
  )
}
