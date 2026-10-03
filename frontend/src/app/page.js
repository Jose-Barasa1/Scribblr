"use client";

import { useEffect,useRef,useState } from "react";
import Link from"next/link";
import Bebas_Neue from "next/font/google";
import Navbar from "@/components/Navbar";

const bebas = Bebas_Neue ({weight:"400", subsets:"Latin"});

const stats = [
  {label:"Total Workers On Site", value:"142", change: "+12 today", border:"border-amber-500", link:"/workforce"},
{label:"Active Site Locations", value:"6", change:"All active", border:"border-yellow-500",link:"/sites"},
{label:"Heavy",value:"",change:"",border:"",link:""},
{label:"",value:"",change:"",border:"",link:""},
];

const jobs = [
  {name:"Kilimani Apartments", pct:75},
  {name:"Syokimau Warehouse", pct:31},
  {name:"Ngong Stadium", pct:90},
];