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
        {[["Otis", True], ["Monica", False], ["Musa", True]].map (([name, ok]) =>(
      <div key={name} className="flex justify-between rounded-x1 bg-white px-4 py-3">
        {name}
        <span className={ok ? "text-green-600" : "text-red-600"} >{ok? "Present": "Absent"}</span>
      </div>
        
        ))}
      </div>
    ),
  },
];