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