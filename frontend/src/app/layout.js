import { Bebas_Neue, Barlow } from "next/font/google";
import "./global.css";

const bebas =  Bebas_Neue({weight:"400", subsets: ["latin"], variable: "--font-head"});
const barlow = Barlow({weight:["400","600"], subsets: ["latin"], variable:"--font-body"});

export const metadata ={
  title:"Scribblr",
  description:"Created by the guys five guys"
}
