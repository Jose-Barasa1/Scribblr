import { Bebas_Neue, Barlow } from "next/font/google";
import "./globals.css";

const bebas = Bebas_Neue({  weight: "400", subsets:"Latin", variable:"--font-head"});
const barlow = Barlow({ weight: ["400", "600"], subsets:"Latin", variable:"--font-body"});



export const metadata = {
  title: "Scribble",
  description: "Construction company automation portfolio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
