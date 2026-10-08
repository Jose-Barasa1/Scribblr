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
    
  }
]