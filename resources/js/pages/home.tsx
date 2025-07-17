"use client";

import { Hero } from "../components/home/hero";
import { Features } from "../components/home/features";
import { TechStack } from "../components/home/tech-stack";
import { Cta } from "../components/home/cta";


function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Hero />
      <Features />
      <TechStack />
      <Cta />
    </div>
  );
}



export default Home;