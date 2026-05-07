import type { Metadata } from "next";
import { Schibsted_Grotesk, Martian_Mono } from "next/font/google";
import LightRays from "@/components/LightRays";
import Navbar from "@/components/Navbar";
import { getLoggedInUser } from "@/lib/action/user.actions";
import { redirect } from "next/navigation";

const schibstedGrotesk = Schibsted_Grotesk({
  variable: "--font-schibsted-grotesk",
  subsets: ["latin"],
});

const martianMono = Martian_Mono({
  variable: "--font-martian-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CoddeConf - Your Ultimate Dev Event Companion",
  description: "The Hub for Every Dev Event You Shouldn't Miss",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getLoggedInUser();

  // if (!user) {
  //   redirect('/sign-in');
  // }

  return (
    <html lang="en">
      <body
        className={`${schibstedGrotesk.variable} ${martianMono.variable} min-h-screen antialiased`}
      >

        <Navbar user={user} />
<div className="fixed inset-0 top-0 z-[-1]">
  <LightRays
    raysOrigin="top-center"
    raysColor="#03cbfd"
    raysSpeed={1}
    lightSpread={0.9}
    rayLength={3}
    followMouse={true}
    mouseInfluence={0.1}
    noiseAmount={0}
    distortion={0}
    className="custom-rays"
    pulsating={false}
    fadeDistance={1}
    saturation={1}
/>
        </div>

        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
