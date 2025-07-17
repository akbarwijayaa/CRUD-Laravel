"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ArrowRight, Clock, GitBranch, Github, Rocket, Ship } from "lucide-react";

export function Cta() {
  return (
    <section className="relative py-24 bg-gradient-to-b from-background to-muted/50">
      <div className="absolute inset-0 overflow-hidden">
        <div
          className={cn(
            "absolute inset-0",
            "[background-size:30px_30px]",
            "[background-image:radial-gradient(#e5e7eb_1px,transparent_1px)]",
            "dark:[background-image:radial-gradient(#374151_1px,transparent_1px)]",
            "opacity-40"
          )}
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-background/80" />

      <div className="relative container mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          <Badge variant="outline" className="mb-6">
            <Rocket className="w-3 h-3 mr-1" />
            Get Started Today
          </Badge>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-balance">
            Ready to Transform Your Team&apos;s Workflow?
          </h2>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto text-balance">
            Join thousands of teams already using Multiboard to streamline their 
            projects and boost productivity. Get started in minutes, no credit card required.
          </p>

          <div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          >
            <Button
              asChild
              size="lg"
              className={cn(
                "bg-gradient-to-r from-primary to-primary/90",
                "hover:from-primary/95 hover:to-primary/85",
                "text-primary-foreground shadow-lg",
                "transition-all duration-300 group",
                "text-base px-8 py-6"
              )}
            >
              <a href="/workspaces">
                Try Now
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
          </div>

        </div>
      </div>
    </section>
  );
} 