/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/purity */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Bars3Icon,
  XMarkIcon,
  FireIcon,
  HandRaisedIcon,
  ChatBubbleLeftRightIcon,
  UserGroupIcon,
  BeakerIcon,
  SparklesIcon,
  BookOpenIcon,
  EyeIcon,
  ClockIcon, // Icono para el timer
} from "@heroicons/react/24/outline";

const JUEGOS = [
  { id: 1, name: "Yo Nunca", icon: ChatBubbleLeftRightIcon, color: "bg-purple-600", emoji: "🔞", file: "yo-nunca.json" },
  { id: 2, name: "Hot Potato", icon: FireIcon, color: "bg-red-600", emoji: "💣", file: "hot-potato.json" },
  { id: 3, name: "La Pinza", icon: HandRaisedIcon, color: "bg-green-600", emoji: "🦠", file: "la-pinza.json" },
  { id: 4, name: "Duelo", icon: BeakerIcon, color: "bg-blue-600", emoji: "⚔️", file: "duelo.json" },
  { id: 5, name: "Votación", icon: UserGroupIcon, color: "bg-yellow-600", emoji: "🗳️", file: "votacion.json" },
  { id: 6, name: "Ruleta", icon: SparklesIcon, color: "bg-pink-600", emoji: "🔥", file: "ruleta.json" },
];

export default function PartyApp() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [girando, setGirando] = useState(false);
  const [resultado, setResultado] = useState<any>(null);
  const [retoTexto, setRetoTexto] = useState("");
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [retoOculto, setRetoOculto] = useState(false);
  
  // ESTADOS PARA EL TIMER (Hot Potato)
  const [timeLeft, setTimeLeft] = useState(15);
  const [timerActive, setTimerActive] = useState(false);
  const [exploto, setExploto] = useState(false);

  // Lógica del Temporizador
  useEffect(() => {
    let interval: any;
    if (timerActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && timerActive) {
      setTimerActive(false);
      setExploto(true);
      if (window.navigator.vibrate) window.navigator.vibrate([500, 100, 500]);
    }
    return () => clearInterval(interval);
  }, [timerActive, timeLeft]);

  const cargarRetoAleatorio = async (archivo: string) => {
    try {
      const res = await fetch(`/desafios/${archivo}`);
      if (!res.ok) throw new Error("No se pudo cargar el archivo");
      const retos = await res.json();
      return retos[Math.floor(Math.random() * retos.length)];
    } catch (error) {
      console.error("Error cargando el JSON:", error);
      return "Error al cargar el desafío. ¡Bebe por el error!";
    }
  };

  const tirarDado = async () => {
    if (girando) return;
    setGirando(true);
    setResultado(null);
    setRetoOculto(false);
    setExploto(false);
    setTimeLeft(15);

    const azarIndex = Math.floor(Math.random() * JUEGOS.length);
    const categoria = JUEGOS[azarIndex];
    const texto = await cargarRetoAleatorio(categoria.file);

    const extraX = Math.floor(Math.random() * 4) * 90;
    const extraY = Math.floor(Math.random() * 4) * 90;
    
    setRotation({
      x: rotation.x + 1440 + extraX,
      y: rotation.y + 1440 + extraY,
    });

    setTimeout(() => {
      setResultado(categoria);
      setRetoTexto(texto);
      
      if (categoria.id === 3) setRetoOculto(true);
      if (categoria.id === 2) setTimerActive(true); // Activa timer si es Hot Potato
      
      setGirando(false);
      if (window.navigator.vibrate) window.navigator.vibrate([100, 50, 100]);
    }, 1500);
  };

  const seleccionarDirecto = async (item: any) => {
    setExploto(false);
    setTimeLeft(15);
    const texto = await cargarRetoAleatorio(item.file);
    setResultado(item);
    setRetoTexto(texto);
    
    if (item.id === 3) setRetoOculto(true);
    else setRetoOculto(false);

    if (item.id === 2) setTimerActive(true);
    else setTimerActive(false);
    
    setSidebarOpen(false);
  };

  return (
    <div className="fixed inset-0 flex bg-black text-white overflow-hidden font-sans">
      
      {/* SIDEBAR MOBILE */}
      <Dialog open={sidebarOpen} onClose={setSidebarOpen} className="relative z-50 lg:hidden">
        <DialogBackdrop className="fixed inset-0 bg-black/90 transition-opacity" />
        <div className="fixed inset-0 flex">
          <DialogPanel className="relative mr-16 flex w-full max-w-xs flex-1 flex-col bg-zinc-950 border-r border-white/10 p-6">
            <div className="flex items-center justify-between mb-8">
              <span className="text-xl font-black text-pink-500 italic uppercase">Party Chaos</span>
              <button onClick={() => setSidebarOpen(false)}><XMarkIcon className="size-6" /></button>
            </div>
            <nav className="flex flex-1 flex-col">
              <ul className="space-y-1">
                {JUEGOS.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => seleccionarDirecto(item)}
                      className="flex w-full gap-x-3 rounded-xl p-3 text-sm font-bold text-zinc-400 active:bg-white/10"
                    >
                      <item.icon className="size-6 text-pink-500" />
                      {item.name}
                    </button>
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-10">
                <Link href="/reglas" className="flex w-full gap-x-3 rounded-xl p-3 text-sm font-black text-white bg-zinc-900 border border-white/5 uppercase tracking-widest italic">
                  <BookOpenIcon className="size-6 text-pink-500" /> Reglas
                </Link>
              </div>
            </nav>
          </DialogPanel>
        </div>
      </Dialog>

      {/* SIDEBAR DESKTOP */}
      <div className="hidden lg:flex lg:w-72 lg:flex-col border-r border-white/10 bg-zinc-950 px-6 pb-6">
        <div className="flex h-20 items-center">
          <span className="text-2xl font-black text-pink-500 italic uppercase">Party Chaos</span>
        </div>
        <nav className="mt-4 flex flex-1 flex-col">
          <ul className="space-y-1">
            {JUEGOS.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => seleccionarDirecto(item)}
                  className="flex w-full gap-x-3 rounded-xl p-3 text-sm font-bold text-zinc-400 hover:bg-pink-500/10 hover:text-white transition-all"
                >
                  <item.icon className="size-5 text-pink-500" />
                  {item.name}
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-auto">
            <Link href="/reglas" className="group flex w-full gap-x-3 rounded-xl p-3 text-sm font-black text-zinc-400 hover:bg-white/5 hover:text-white transition-all border border-transparent hover:border-white/10 uppercase tracking-widest italic">
              <BookOpenIcon className="size-5 text-pink-500" /> Reglas de Juego
            </Link>
          </div>
        </nav>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col h-full relative">
        <header className="flex h-16 shrink-0 items-center justify-between border-b border-white/10 bg-black/60 backdrop-blur-xl px-4 lg:hidden">
          <button onClick={() => setSidebarOpen(true)} className="p-2">
            <Bars3Icon className="size-6" />
          </button>
          <div className="text-lg font-black text-white italic tracking-tighter">PARTY CHAOS</div>
          <div className="w-10" />
        </header>

        <main className="flex-1 relative flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(236,72,153,0.15),transparent_70%)] pointer-events-none" />

          <div className="w-full max-w-sm flex flex-col items-center">
            <AnimatePresence mode="wait">
              {!resultado ? (
                <motion.div 
                  key="dado"
                  initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.1 }}
                  className="flex flex-col items-center"
                >
                  <div className="perspective-1000 py-12 touch-none cursor-pointer" onClick={tirarDado}>
                    <motion.div
                      animate={{ rotateX: rotation.x, rotateY: rotation.y }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      className="relative w-24 h-24 md:w-32 md:h-32 cube-container"
                      style={{ transformStyle: "preserve-3d" }}
                    >
                      <Face num="1" faceClass="face-front" />
                      <Face num="2" faceClass="face-back" />
                      <Face num="3" faceClass="face-right" />
                      <Face num="4" faceClass="face-left" />
                      <Face num="5" faceClass="face-top" />
                      <Face num="6" faceClass="face-bottom" />
                    </motion.div>
                  </div>
                  <button 
                    onClick={tirarDado}
                    className="mt-8 px-8 py-3 bg-pink-600 rounded-full font-black uppercase text-xs tracking-widest shadow-lg shadow-pink-500/20 active:scale-95 transition-transform"
                  >
                    {girando ? "Mezclando..." : "Lanzar Dado"}
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="resultado"
                  initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                  className={`w-full bg-zinc-900/80 backdrop-blur-md border ${exploto ? 'border-red-500 shadow-red-500/50' : 'border-white/10'} p-8 rounded-[2.5rem] text-center shadow-2xl z-10 transition-colors duration-500`}
                >
                  <div className={`w-16 h-16 ${exploto ? 'bg-red-600 animate-ping' : resultado.color} rounded-full mx-auto flex items-center justify-center text-3xl mb-4 shadow-lg`}>
                    {exploto ? "💥" : resultado.emoji}
                  </div>
                  
                  <h3 className={`font-black uppercase tracking-widest text-[10px] mb-2 ${exploto ? 'text-red-500' : 'text-zinc-500'}`}>
                    {exploto ? "¡BOOM! CASTIGO" : resultado.name}
                  </h3>
                  
                  {/* TIMER VISUAL (Solo Hot Potato) */}
                  {resultado.id === 2 && !exploto && timerActive && (
                    <div className="mb-6">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <ClockIcon className="size-5 text-red-500" />
                        <span className="font-mono text-2xl font-black text-red-500">{timeLeft}s</span>
                      </div>
                      <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: "100%" }}
                          animate={{ width: `${(timeLeft / 15) * 100}%` }}
                          className="h-full bg-red-500"
                        />
                      </div>
                    </div>
                  )}

                  {exploto ? (
                    <p className="text-xl font-black text-red-500 mb-8 uppercase italic animate-bounce">
                      ¡Demasiado lento! Bebes 3 tragos o chupito directo.
                    </p>
                  ) : retoOculto ? (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 mb-4">
                      <p className="text-zinc-400 text-sm mb-8 px-4 leading-relaxed">¡Shhh! Asegúrate de que nadie mire antes de destapar la misión.</p>
                      <button onClick={() => setRetoOculto(false)} className={`w-full py-4 flex items-center justify-center gap-2 ${resultado.color} text-white rounded-2xl font-black uppercase text-sm active:scale-95 transition-transform shadow-lg`}>
                        <EyeIcon className="size-5" /> Revelar Misión
                      </button>
                    </motion.div>
                  ) : (
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                      <p className="text-xl md:text-2xl font-bold text-white mb-8 italic leading-tight">"{retoTexto}"</p>
                      <button
                        onClick={() => {
                          setResultado(null);
                          setTimerActive(false);
                        }}
                        className="w-full py-4 bg-white text-black rounded-2xl font-black uppercase text-sm active:scale-95 transition-transform shadow-lg"
                      >
                        {resultado.id === 2 ? "¡HECHO! PASAR" : "Volver a lanzar"}
                      </button>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </main>
      </div>

      <style jsx>{`
        .perspective-1000 { perspective: 1000px; }
        .face-front  { transform: rotateY(0deg) translateZ(48px); }
        .face-back   { transform: rotateY(180deg) translateZ(48px); }
        .face-right  { transform: rotateY(90deg) translateZ(48px); }
        .face-left   { transform: rotateY(-90deg) translateZ(48px); }
        .face-top    { transform: rotateX(90deg) translateZ(48px); }
        .face-bottom { transform: rotateX(-90deg) translateZ(48px); }
        @media (min-width: 768px) {
          .face-front  { transform: rotateY(0deg) translateZ(64px); }
          .face-back   { transform: rotateY(180deg) translateZ(64px); }
          .face-right  { transform: rotateY(90deg) translateZ(64px); }
          .face-left   { transform: rotateY(-90deg) translateZ(64px); }
          .face-top    { transform: rotateX(90deg) translateZ(64px); }
          .face-bottom { transform: rotateX(-90deg) translateZ(64px); }
        }
      `}</style>
    </div>
  );
}

function Face({ num, faceClass }: { num: string; faceClass: string }) {
  return (
    <div className={`absolute inset-0 bg-zinc-900 border-2 border-pink-500/50 flex items-center justify-center text-white text-3xl font-black rounded-xl shadow-[inset_0_0_15px_rgba(236,72,153,0.3)] ${faceClass}`} style={{ backfaceVisibility: "hidden" }}>
      {num}
    </div>
  );
}