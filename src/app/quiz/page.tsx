'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, RotateCcw, CheckCircle2 } from 'lucide-react'

// ─── Data ─────────────────────────────────────────────────────────────────────

type Option = {
  label: string
  points: number
  key: string
}

type Question = {
  id: number
  text: string
  options: Option[]
}

const questions: Question[] = [
  {
    id: 1,
    text: 'What are you considering selling?',
    options: [
      { key: 'land', label: 'Land or acreage', points: 3 },
      { key: 'farm', label: 'Farm or ranch property', points: 3 },
      { key: 'residential', label: 'Residential property', points: 2 },
      { key: 'commercial', label: 'Commercial property', points: 2 },
      { key: 'equipment', label: 'Equipment or machinery', points: 2 },
      { key: 'property_equipment', label: 'Property with equipment / assets', points: 3 },
      { key: 'notsure', label: 'Not sure', points: 1 },
    ],
  },
  {
    id: 2,
    text: 'How soon are you hoping to sell?',
    options: [
      { key: 'asap', label: 'As soon as possible', points: 3 },
      { key: '3mo', label: 'Within 3 months', points: 3 },
      { key: '6mo', label: 'Within 6 months', points: 2 },
      { key: '6mo_plus', label: 'More than 6 months from now', points: 1 },
      { key: 'exploring', label: 'Just exploring options', points: 0 },
    ],
  },
  {
    id: 3,
    text: 'What matters most to you in this sale?',
    options: [
      { key: 'competition', label: 'Creating competition among buyers', points: 3 },
      { key: 'timeline', label: 'Selling within a defined timeline', points: 3 },
      { key: 'exposure', label: 'Getting strong market exposure', points: 2 },
      { key: 'certainty', label: 'Certainty and efficiency', points: 2 },
      { key: 'slow', label: 'I want to test the market slowly', points: 0 },
      { key: 'unsure', label: 'I am not sure yet', points: 1 },
    ],
  },
  {
    id: 4,
    text: 'Has the property been listed or marketed before?',
    options: [
      { key: 'listed_didnt_sell', label: 'Yes — it was listed and did not sell', points: 3 },
      { key: 'listed_active', label: 'Yes — it is currently listed', points: 1 },
      { key: 'no', label: 'No — not yet', points: 2 },
      { key: 'explored', label: 'No — but I have explored selling', points: 1 },
      { key: 'prefer_not', label: 'Prefer not to say', points: 1 },
    ],
  },
  {
    id: 5,
    text: 'Is the property ready to sell in its current condition?',
    options: [
      { key: 'ready', label: 'Yes — ready now', points: 3 },
      { key: 'mostly_ready', label: 'Mostly ready — just minor cleanup or paperwork', points: 2 },
      { key: 'needs_work', label: 'Needs some work before I would sell', points: 1 },
      { key: 'unsure', label: 'I am not sure', points: 1 },
      { key: 'not_ready', label: 'No — not ready yet', points: 0 },
    ],
  },
  {
    id: 6,
    text: 'Do you already have a clear idea of the property details and ownership paperwork?',
    options: [
      { key: 'in_order', label: 'Yes — everything is in order', points: 3 },
      { key: 'mostly', label: 'Mostly — a few details still need to be gathered', points: 2 },
      { key: 'somewhat', label: 'Somewhat — I need help organizing it', points: 1 },
      { key: 'no', label: 'No — I still need to figure that out', points: 0 },
      { key: 'not_sure', label: 'Not sure', points: 0 },
    ],
  },
]

// ─── Scoring ──────────────────────────────────────────────────────────────────

type Result = {
  tier: 1 | 2 | 3
  title: string
  description: string
  cta: string
  ctaHref: string
}

const results: Record<1 | 2 | 3, Result> = {
  1: {
    tier: 1,
    title: 'Strong Auction Candidate',
    description:
      'Based on your answers, your property appears to be a strong candidate for auction. Auctions can work especially well when timing matters, buyer competition is important, and the property is ready to be marketed with a focused strategy.',
    cta: 'Get My Free Evaluation',
    ctaHref: '/contact',
  },
  2: {
    tier: 2,
    title: 'Auction Worth Considering',
    description:
      'Based on your answers, auction could be a strong option depending on your goals, timing, and property strategy. A short conversation with our team can help determine whether auction or another sales approach would best fit your situation.',
    cta: 'Talk With Our Team',
    ctaHref: '/contact',
  },
  3: {
    tier: 3,
    title: 'Auction May Require Preparation',
    description:
      'Based on your answers, your property or sale timeline may need a bit more preparation before auction would be the best fit. That does not mean auction is off the table — it may simply mean a few details need to be clarified first.',
    cta: 'Request a Property Review',
    ctaHref: '/contact',
  },
}

function computeResult(answers: Record<number, string>): Result {
  // Sum points
  const total = questions.reduce((sum, q) => {
    const selectedKey = answers[q.id]
    const opt = q.options.find((o) => o.key === selectedKey)
    return sum + (opt?.points ?? 0)
  }, 0)

  // Base tier from score
  let tier: 1 | 2 | 3 = total >= 13 ? 1 : total >= 8 ? 2 : 3

  // Override Rule 1: Force to tier 3
  const q5 = answers[5]
  const q6 = answers[6]
  if (q5 === 'not_ready' && (q6 === 'no' || q6 === 'not_sure')) {
    tier = 3
  }

  // Override Rule 2: Bump tier 2 → tier 1
  const q2 = answers[2]
  const q3 = answers[3]
  if (
    tier === 2 &&
    (q2 === 'asap' || q2 === '3mo') &&
    (q3 === 'competition' || q3 === 'timeline') &&
    (q5 === 'ready' || q5 === 'mostly_ready')
  ) {
    tier = 1
  }

  return results[tier]
}

// ─── Component ────────────────────────────────────────────────────────────────

type Phase = 'quiz' | 'result'

export default function QuizPage() {
  const [phase, setPhase] = useState<Phase>('quiz')
  const [currentQ, setCurrentQ] = useState(0) // 0-indexed
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [selected, setSelected] = useState<string | null>(null)
  const [advancing, setAdvancing] = useState(false)
  const [result, setResult] = useState<Result | null>(null)

  const question = questions[currentQ]
  const totalQ = questions.length
  const progressPct = ((currentQ) / totalQ) * 100

  function handleSelect(key: string) {
    if (advancing) return
    setSelected(key)
    setAdvancing(true)

    setTimeout(() => {
      const newAnswers = { ...answers, [question.id]: key }
      setAnswers(newAnswers)

      if (currentQ < totalQ - 1) {
        setCurrentQ((q) => q + 1)
        setSelected(null)
        setAdvancing(false)
      } else {
        // Last question — compute result
        const r = computeResult(newAnswers)
        setResult(r)
        setPhase('result')
      }
    }, 300)
  }

  function handleRestart() {
    setPhase('quiz')
    setCurrentQ(0)
    setAnswers({})
    setSelected(null)
    setAdvancing(false)
    setResult(null)
  }

  const tierColors: Record<1 | 2 | 3, string> = {
    1: 'text-sage',
    2: 'text-sunset',
    3: 'text-clay',
  }
  const tierBg: Record<1 | 2 | 3, string> = {
    1: 'bg-sage/10 border-sage/30',
    2: 'bg-sunset/10 border-sunset/30',
    3: 'bg-clay/10 border-clay/30',
  }

  return (
    <>
      {/* Hero band */}
      <div className="bg-shadow pt-32 pb-16 px-6 text-center">
        <p className="text-sunset text-[11px] tracking-[0.3em] uppercase font-medium mb-4">
          Free Assessment
        </p>
        <h1 className="font-serif text-display-lg text-offwhite mb-4">
          Is Auction Right for Your Property?
        </h1>
        <p className="text-offwhite/60 text-base max-w-xl mx-auto">
          Answer 6 quick questions and find out whether the auction process is a strong fit
          for your property and goals.
        </p>
      </div>

      {/* Quiz body */}
      <div className="min-h-screen bg-offwhite px-6 py-16">
        <div className="max-w-2xl mx-auto">

          {phase === 'quiz' && (
            <div>
              {/* Progress bar */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-shadow/50 text-xs tracking-[0.12em] uppercase">
                    Question {currentQ + 1} of {totalQ}
                  </span>
                  <span className="text-shadow/50 text-xs tracking-[0.12em] uppercase">
                    {Math.round(((currentQ + 1) / totalQ) * 100)}% complete
                  </span>
                </div>
                <div className="h-1 bg-sand/50 w-full">
                  <div
                    className="h-1 bg-sunset transition-all duration-500 ease-out"
                    style={{ width: `${progressPct + (1 / totalQ) * 100}%` }}
                  />
                </div>
              </div>

              {/* Question */}
              <h2 className="font-serif text-2xl sm:text-3xl text-shadow mb-8 leading-snug">
                {question.text}
              </h2>

              {/* Options */}
              <div className="flex flex-col gap-3">
                {question.options.map((opt) => {
                  const isSelected = selected === opt.key
                  return (
                    <button
                      key={opt.key}
                      onClick={() => handleSelect(opt.key)}
                      disabled={advancing}
                      className={`
                        w-full text-left px-6 py-4 border text-sm font-medium tracking-wide
                        transition-all duration-200 flex items-center justify-between gap-3
                        ${isSelected
                          ? 'border-sunset bg-sunset/8 text-shadow'
                          : 'border-sand bg-white text-shadow/75 hover:border-shadow/40 hover:text-shadow hover:bg-white'
                        }
                        disabled:cursor-default
                      `}
                    >
                      <span>{opt.label}</span>
                      {isSelected && (
                        <CheckCircle2 className="w-5 h-5 text-sunset flex-shrink-0" />
                      )}
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {phase === 'result' && result && (
            <div>
              {/* Progress bar — full */}
              <div className="mb-10">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-shadow/50 text-xs tracking-[0.12em] uppercase">
                    Complete
                  </span>
                  <span className="text-shadow/50 text-xs tracking-[0.12em] uppercase">
                    100%
                  </span>
                </div>
                <div className="h-1 bg-sand/50 w-full">
                  <div className="h-1 bg-sunset w-full" />
                </div>
              </div>

              {/* Result card */}
              <div className={`border p-8 sm:p-12 mb-8 ${tierBg[result.tier]}`}>
                <p className="text-shadow/50 text-[11px] tracking-[0.25em] uppercase mb-3">
                  Your Result
                </p>
                <h2 className={`font-serif text-display-md mb-6 ${tierColors[result.tier]}`}>
                  {result.title}
                </h2>
                <p className="text-shadow/75 text-base leading-relaxed mb-10">
                  {result.description}
                </p>
                <Link
                  href={result.ctaHref}
                  className="inline-flex items-center gap-2 bg-sunset text-white font-semibold text-sm tracking-[0.08em] uppercase px-8 py-4 hover:bg-[#e08600] transition-colors duration-200"
                >
                  {result.cta}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Start over */}
              <button
                onClick={handleRestart}
                className="inline-flex items-center gap-2 text-shadow/50 text-sm hover:text-shadow transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                Start Over
              </button>
            </div>
          )}

        </div>
      </div>
    </>
  )
}
