import Image from 'next/image'
import { Phone, Mail, MapPin } from 'lucide-react'
import { supabase } from '@/lib/supabase/client'
import type { Agent } from '@/types'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Our Team',
  description: 'Meet the Landman team — experienced Texas ranch and land agents.',
}

async function getAgents(): Promise<Agent[]> {
  try {
    const { data } = await supabase.from('agents').select('*').order('name')
    return data || []
  } catch {
    return []
  }
}

export default async function TeamPage() {
  const agents = await getAgents()

  return (
    <div className="min-h-screen pt-24 pb-20">
      {/* Header */}
      <div className="bg-brand-brown border-b border-brand-tan/10 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <p className="text-brand-tan text-xs tracking-[0.3em] uppercase mb-3">The People Behind Landman</p>
          <h1 className="font-serif text-5xl text-brand-off-white">Our Team</h1>
          <p className="text-brand-off-white/50 mt-4 max-w-2xl">
            Every Landman agent is a working land professional — licensed, experienced, and personally invested in Texas property markets.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        {agents.length === 0 ? (
          <div className="text-center py-20 text-brand-off-white/40">
            <p className="text-lg font-serif">Team information coming soon.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {agents.map((agent) => (
              <div key={agent.id} className="bg-brand-brown border border-brand-tan/10 hover:border-brand-tan/30 transition-colors overflow-hidden group">
                {/* Photo */}
                <div className="relative aspect-[4/3] bg-brand-dark overflow-hidden">
                  {agent.photo_url ? (
                    <Image
                      src={agent.photo_url}
                      alt={agent.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="font-serif text-6xl text-brand-tan/30">{agent.name.charAt(0)}</span>
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <h2 className="font-serif text-xl text-brand-off-white">{agent.name}</h2>
                  {agent.title && (
                    <p className="text-brand-tan/70 text-xs tracking-widest uppercase mt-1">{agent.title}</p>
                  )}

                  {agent.bio && (
                    <p className="text-brand-off-white/55 text-sm leading-relaxed mt-4 line-clamp-3">{agent.bio}</p>
                  )}

                  {agent.states_served && agent.states_served.length > 0 && (
                    <div className="flex items-center gap-1.5 mt-4">
                      <MapPin className="w-3.5 h-3.5 text-brand-tan/60" />
                      <span className="text-brand-off-white/40 text-xs">{agent.states_served.join(', ')}</span>
                    </div>
                  )}

                  <div className="mt-5 pt-5 border-t border-brand-tan/10 flex flex-col gap-2">
                    {agent.phone && (
                      <a href={`tel:${agent.phone}`} className="flex items-center gap-2 text-brand-off-white/60 text-sm hover:text-brand-tan transition-colors">
                        <Phone className="w-3.5 h-3.5 text-brand-tan/60" />
                        {agent.phone}
                      </a>
                    )}
                    {agent.email && (
                      <a href={`mailto:${agent.email}`} className="flex items-center gap-2 text-brand-off-white/60 text-sm hover:text-brand-tan transition-colors">
                        <Mail className="w-3.5 h-3.5 text-brand-tan/60" />
                        {agent.email}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
