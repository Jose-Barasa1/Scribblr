"use client";

import { useEffect,useRef,useState } from "react";
import Link from"next/link";
import Bebas_Neue from "next/font/google";
import Navbar from "@/components/Navbar";

const bebas = Bebas_Neue ({weight:"400", subsets:"Latin"});

const stats = [
  {label:"Total Workers On Site", value:"142", change: "+12 today", border:"border-amber-500", link:"/workforce"},
{label:"Active Site Locations", value:"6", change:"All active", border:"border-yellow-500",link:"/sites"},
{label:"Heavy Equipment In Use",value:"18",change:"2 in maintenance",border:"border-orange-500",link:"/equipment"},
{label:"Pending Saftey Checks",value:"2",change:"Action Required",border:"border-amber-600",link:"/reports"},
];

const jobs = [
  {name:"Kilimani Apartments", pct:75},
  {name:"Syokimau Warehouse", pct:31},
  {name:"Ngong Stadium", pct:90},
];

const features =[
  {
    n:"01",
    title:"Daily Site Diary",
    text:"foremen post photos and progress every day",
    caption:"Posted 4:12pm ' Foreman Otis ' Kilimani",
    href:"/reports",
    panel:"bg-gray-900 text-white",
    visual: (
      <div className="flex gap-2.5">
        <i className="h-24 flex-1 rounded-x1 bg-linear-to-br from-slate-500 to-slate-800"/>
        <i className="h-24 flex-1 rounded-x1 bg-linear-to-br from-amber-600 to-amber-900"/>
        <i className="h-24 flex-1 rounded-x1 bg-linear-to-br from-sky-600 to-slate-800" />
      </div>
    )

  },

  {
    n:"02",
    title:"Material & Cost",
    text:"Track cement,steel and sand against your budget and get warned before your stock runs out",
    caption:"Budget used KES 2.1M of 3.8M",
    href:"/finance",
    panel:"bg-amber-400 text-gray-900",
    visual:(
      <div className="grid gap-3 text-sm font-semibold">
        {[["Cement(bags)", 20], ["Steel", 47], ["Sand(bags)", 85]].map(([name,p])=> (  
          <div key={name} className="grid grid-cols-[70px_1fr_40px] items-center gap-2.5">
            {name}
            <b className="h-2.5 overflow-hidden rounded-full bg-black/15 ">
            <i className="block h-full rounded-full bg-gray-900" style={{width:`${p}%`}}/>
            </b>
            {p}%
          </div>
        )) }
      </div>
    ),
  },

  {
    n:"03",
    title:"Fundi & Tasks",
    text:"Assign work,mark attendance and keep every member on board with the plan",
    caption:"Today's crew ' Syokimau",
    href:"/workforce",
    panel:"bg-stone-200 text-gray-900",
    visual:(
      <div className="grid gap-2.5 text-sm font-semibold">
        {[["Otis", true], ["Monica", false], ["Musa", true]].map (([name, ok]) =>(
      <div key={name} className="flex justify-between rounded-x1 bg-white px-4 py-3">
        {name}
        <span className={ok ? "text-green-600" : "text-red-600"} >{ok? "Present": "Absent"}</span>
      </div>
        
        ))}
      </div>
    ),
  },
];

function useInView(threshold = 0.25){
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(()=>{
    const el= ref.current;
    if(!el) return;
    const io = new IntersectionObserver(([e])=>{
      if (e.isIntersecting) {setSeen(true); io.disconnect();}
  },{threshold});
  io.observe(el);
  return()=>io.disconnect();
  }, {threshold} );
  return [ref,seen];
}

function Reveal({ children, delay = 0, className = "" }) {
  const [ref, seen] = useInView();
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out motion-reduce:transition-none ${
        seen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0 motion-reduce:translate-y-0 motion-reduce:opacity-100"
      } ${className}`}
    >
      {children}
    </div>
  );
}

function CountUp({ to, suffix = "" }) {
  const [ref, seen] = useInView();
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!seen) return;
    let raf, t0;
    const step = (t) => {
      t0 = t0 ?? t;
      const p = Math.min((t - t0) / 1400, 1);
      setN(Math.round(to * p));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [seen, to]);
  return <span ref={ref}>{n}{suffix}</span>;
}
 

function Bar({ pct }) {
  const [ref, seen] = useInView();
  return (
    <div ref={ref} className="mt-2 h-2 overflow-hidden rounded-full bg-gray-200">
      <div
        className="h-full rounded-full bg-amber-400 transition-[width] duration-[1600ms] ease-out"
        style={{ width: seen ? `${pct}%` : "0%" }}
      />
    </div>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-white pb-10 font-sans text-gray-900">
     
      <style>{`@keyframes float{50%{transform:translateY(-8px)}}`}</style>
 
      <Navbar />
 
     
      <section className="relative border-b border-gray-100 bg-gradient-to-br from-white via-white to-amber-50">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 pb-20 pt-16 md:grid-cols-[1.1fr_.9fr] md:pt-24">
          <Reveal>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wide text-amber-700">
              Scribble Platform
            </div>
 
            <h1 className={`${bebas.className} text-7xl uppercase leading-[0.95] md:text-8xl lg:text-9xl`}>
              From blueprint to build,{" "}
              <span className="inline-block bg-amber-400 px-2 text-gray-900">automated.</span>
            </h1>
 
            <p className="mb-8 mt-6 max-w-md text-lg text-gray-600">
              Civil engineering site management. Control daily logs, track heavy equipment and manage your workforce, all in KES, all from one workspace.
            </p>
 
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                href="/workforce"
                className="rounded-full bg-amber-500 px-8 py-3.5 text-center font-bold text-black shadow-md transition hover:-translate-y-0.5 hover:bg-amber-400 hover:shadow-lg hover:shadow-amber-400/40"
              >
                Open Site Dashboard
              </Link>
              <Link
                href="/sites"
                className="rounded-full border border-gray-300 bg-white px-8 py-3.5 text-center font-semibold text-gray-800 shadow-sm transition hover:-translate-y-0.5 hover:bg-gray-100"
              >
                View Active Projects
              </Link>
            </div>
          </Reveal>
 
         
          <Reveal delay={200}>
            <div className="animate-[float_5s_ease-in-out_infinite] rounded-3xl border border-gray-200 bg-white p-5 shadow-2xl shadow-black/10 motion-reduce:animate-none">
              <div className="mb-2 flex items-center justify-between text-xs font-semibold text-gray-500">
                <span>TODAY · 3 SITES</span>
                <span className="flex items-center gap-1.5 text-green-600">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-green-600" /> LIVE
                </span>
              </div>
              {jobs.map((j) => (
                <div key={j.name} className="border-t border-gray-100 py-3 text-[15px] font-semibold">
                  <div className="flex justify-between">
                    {j.name}
                    <small className="font-normal text-gray-500">{j.pct}%</small>
                  </div>
                  <Bar pct={j.pct} />
                </div>
              ))}
              <div className="mt-3 rounded-xl bg-gray-900 px-4 py-2.5 text-[13px] text-white">
                ⚠ Cement running low at Syokimau
              </div>
            </div>
          </Reveal>
        </div>
      </section>
 
      
      <div className="mx-auto max-w-7xl px-4 py-16">
        <Reveal>
          <h2 className={`${bebas.className} mb-8 text-4xl uppercase md:text-5xl`}>Operations summary</h2>
        </Reveal>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 100}>
              <Link
                href={s.link}
                className={`group block rounded-xl border-y border-r border-l-4 border-y-gray-200 border-r-gray-200 ${s.border} bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg`}
              >
                <p className="text-xs font-bold uppercase tracking-wider text-gray-500">{s.label}</p>
                <p className={`${bebas.className} mt-2 text-6xl`}>
                  <CountUp to={s.value} />
                </p>
                <p className="mt-1 text-xs font-semibold text-amber-600">
                  {s.change} <span className="inline-block transition group-hover:translate-x-1">&rarr;</span>
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
 
      
      <section className="mx-auto max-w-5xl px-4 py-10">
        <Reveal>
          <h2 className={`${bebas.className} mb-12 text-4xl uppercase md:text-5xl`}>What it does</h2>
        </Reveal>
 
        {features.map((f, i) => (
          <Reveal key={f.n} className="mb-20">
            <div className={`flex flex-col md:flex-row md:items-center ${i % 2 ? "md:flex-row-reverse" : ""}`}>
             
              <div className={`${f.panel} flex h-[300px] flex-col justify-between overflow-hidden rounded-3xl p-7 md:h-[360px] md:w-[62%]`}>
                <span className={`${bebas.className} text-8xl leading-[0.8]`}>{f.n}</span>
                {f.visual}
                <span className="text-sm">{f.caption}</span>
              </div>
 
         
              <div
                className={`relative z-10 mx-auto -mt-12 w-[90%] rounded-2xl border border-gray-200 bg-white p-8 shadow-2xl shadow-black/10 transition hover:-translate-y-1.5 md:mx-0 md:mt-0 md:w-[46%] ${
                  i % 2 ? "md:-mr-[8%]" : "md:-ml-[8%]"
                }`}
              >
                <h3 className={`${bebas.className} text-4xl uppercase md:text-5xl`}>{f.title}</h3>
                <p className="mb-5 mt-3 text-gray-600">{f.text}</p>
                <Link href={f.href} className="font-semibold text-amber-600 hover:text-amber-500">
                  Open &rarr;
                </Link>
              </div>
            </div>
          </Reveal>
        ))}
      </section>
 
      
      <section className="mx-auto max-w-5xl px-4">
        <Reveal>
          <div className="rounded-[2rem] bg-gray-900 px-6 py-20 text-center text-white">
            <h2 className={`${bebas.className} mb-8 text-6xl uppercase md:text-8xl`}>
              Ready to <span className="text-amber-400">build?</span>
            </h2>
            <Link
              href="/login"
              className="inline-block rounded-full bg-amber-400 px-9 py-4 font-bold text-gray-900 transition hover:-translate-y-0.5 hover:bg-amber-300 hover:shadow-lg hover:shadow-amber-400/40"
            >
              Get started
            </Link>
          </div>
        </Reveal>
 
        <footer className="flex flex-wrap justify-between gap-2 py-8 text-sm text-gray-500">
          <span>© 2026 Scribblr</span>
          <span>hello@scribblr.app</span>
        </footer>
      </section>
    </main>
  );
}
 