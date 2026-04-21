"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { 
  ArrowLeftIcon, 
  ShieldCheckIcon, 
  NoSymbolIcon,
  HandThumbUpIcon
} from "@heroicons/react/24/outline";

export default function RulesPage() {
  return (
    <div className="min-h-screen bg-black text-white p-6 lg:pl-80">
      {/* Botón Volver */}
      <Link href="/" className="inline-flex items-center gap-2 text-pink-500 font-black uppercase text-xs tracking-widest mb-10 hover:text-pink-400 transition-colors">
        <ArrowLeftIcon className="size-4" />
        Volver al Desmadre
      </Link>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl"
      >
        <h1 className="text-5xl font-black italic uppercase tracking-tighter mb-4">
          Manual de <span className="text-pink-500 border-b-4 border-pink-500">Supervivencia</span>
        </h1>
        <p className="text-zinc-500 font-bold mb-12 uppercase tracking-widest text-sm">
          Lee o muere (o bebe, que es casi lo mismo)
        </p>

        {/* SECCIÓN: REGLAS DE ORO */}
        <section className="space-y-6 mb-16">
          <div className="flex gap-4 p-6 bg-zinc-900/50 rounded-3xl border border-white/5">
            <ShieldCheckIcon className="size-8 text-green-500 shrink-0" />
            <div>
              <h3 className="font-black uppercase text-lg mb-1">El consentimiento es Dios</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Nadie está obligado a hacer nada que no quiera. Si un reto te incomoda, di <b>"PASO"</b>. 
                El castigo por pasar es beber el doble o un trago largo. Sin dramas ni presiones.
              </p>
            </div>
          </div>

          <div className="flex gap-4 p-6 bg-zinc-900/50 rounded-3xl border border-white/5">
            <NoSymbolIcon className="size-8 text-red-500 shrink-0" />
            <div>
              <h3 className="font-black uppercase text-lg mb-1">Lo que pasa en Party Chaos...</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                ...se queda en Party Chaos. Prohibido grabar sin permiso de los implicados en retos picantes. Respeta la privacidad de tus colegas y disfruta del momento.
              </p>
            </div>
          </div>
        </section>

        {/* SECCIÓN: CÓMO SE JUEGA */}
        <h2 className="text-2xl font-black uppercase italic mb-8 flex items-center gap-2">
          <span className="text-pink-500">01.</span> La Dinámica
        </h2>
        
        <div className="grid gap-4 mb-16">
          {[
            { t: "Lanza el Dado", d: "Toca el dado en la pantalla principal para que el azar elija tu veneno. Nadie se escapa." },
            { t: "Cumple o Bebe", d: "Haz el desafío que aparezca en pantalla. Si fallas o te niegas, bebes lo que el grupo decida." },
            { t: "La Pinza (Modo Infiltrado)", d: "Si te toca una misión secreta, guárdatela. Tienes que cumplirla durante la noche sin que te pillen. Si alguien sospecha y grita '¡PINZA!', has perdido y bebes." }
          ].map((step, i) => (
            <div key={i} className="relative pl-12 border-l-2 border-zinc-800 py-2">
              <div className="absolute left-[-9px] top-4 size-4 bg-pink-500 rounded-full shadow-[0_0_10px_#ec4899]" />
              <h4 className="font-black uppercase text-sm mb-1">{step.t}</h4>
              <p className="text-zinc-500 text-sm">{step.d}</p>
            </div>
          ))}
        </div>

        {/* SECCIÓN: MODOS DE JUEGO */}
        <h2 className="text-2xl font-black uppercase italic mb-8 flex items-center gap-2">
          <span className="text-pink-500">02.</span> Los 6 Modos de 
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-20">
          <div className="p-6 rounded-3xl bg-purple-600/10 border border-purple-500/20">
            <h4 className="text-purple-500 font-black mb-2 uppercase italic">🔞 Yo Nunca</h4>
            <p className="text-xs text-zinc-400">Si has hecho la barbaridad que dice la frase, bebes. Si nadie bebe, el que ha tirado el dado se toma un trago.</p>
          </div>

          <div className="p-6 rounded-3xl bg-red-600/10 border border-red-500/20">
            <h4 className="text-red-500 font-black mb-2 uppercase italic">💣 Hot Potato</h4>
            <p className="text-xs text-zinc-400">Pura tensión. Haz el reto volando y pasa el turno. Si tardas demasiado, te llevas el castigo máximo.</p>
          </div>

          <div className="p-6 rounded-3xl bg-green-600/10 border border-green-500/20">
            <h4 className="text-green-500 font-black mb-2 uppercase italic">🦠 La Pinza</h4>
            <p className="text-xs text-zinc-400">Misión secreta activada. Tienes que hacérsela a alguien del grupo sin que se dé cuenta. El sigilo lo es todo.</p>
          </div>

          <div className="p-6 rounded-3xl bg-blue-600/10 border border-blue-500/20">
            <h4 className="text-blue-500 font-black mb-2 uppercase italic">⚔️ Duelo</h4>
            <p className="text-xs text-zinc-400">1 contra 1. Eliges a un rival para un enfrentamiento directo. El que pierda el versus, bebe o se quita ropa.</p>
          </div>

          <div className="p-6 rounded-3xl bg-yellow-600/10 border border-yellow-500/20">
            <h4 className="text-yellow-500 font-black mb-2 uppercase italic">🗳️ Votación</h4>
            <p className="text-xs text-zinc-400">A la de tres, todos señalan al que mejor encaje con la pregunta. El que tenga más dedos apuntando, traga.</p>
          </div>

          <div className="p-6 rounded-3xl bg-pink-600/10 border border-pink-500/20">
            <h4 className="text-pink-500 font-black mb-2 uppercase italic">🔥 Ruleta</h4>
            <p className="text-xs text-zinc-400">Azar puro y contacto físico. Consecuencias directas, besos, intercambios de ropa y locuras sin anestesia.</p>
          </div>
        </div>

        <footer className="border-t border-white/10 pt-10 pb-20 text-center">
          <HandThumbUpIcon className="size-10 mx-auto text-pink-500 mb-4 opacity-50" />
          <p className="text-zinc-600 text-[10px] font-black uppercase tracking-[0.5em]">
            Party Chaos v1.0 • No nos hacemos responsables de las resacas.
          </p>
        </footer>
      </motion.div>
    </div>
  );
}