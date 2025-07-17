"use client";

import * as React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";

interface TechStackItem {
  name: string;
  purpose: string;
  link: string;
  domain: string;
}

const techStack: TechStackItem[] = [
  {
    name: "Laravel",
    purpose: "PHP Framework for building web applications",
    link: "https://laravel.com/",
    domain: "laravel.com"
  },
  {
    name: "Inertia",
    purpose: "Laravel + React framework for building modern SPAs",
    link: "https://inertiajs.com/",
    domain: "inertiajs.com"
  },
  {
    name: "shadcn/ui",
    purpose: "Beautifully-designed, accessible components",
    link: "https://ui.shadcn.com/",
    domain: "ui.shadcn.com"
  },
  {
    name: "TanStack Query",
    purpose: "Powerful data-fetching and state management",
    link: "https://tanstack.com/query/latest/docs/framework/react/overview",
    domain: "tanstack.com"
  }
];

export function TechStack() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            Technology Stack
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Built with Modern Technologies
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Multiboard leverages the best tools and frameworks to deliver a fast, 
            secure, and scalable kanban solution.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {techStack.map((tech, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer"
              onClick={() => window.open(tech.link, '_blank')}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-lg overflow-hidden bg-background border flex items-center justify-center">
                    <img
                      src={`https://www.google.com/s2/favicons?domain=${tech.domain}&sz=32`}
                      alt={`${tech.name} favicon`}
                      className="w-5 h-5"
                      onError={(e) => {
                        // Fallback to a generic icon if favicon fails to load
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>
                  <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors ml-auto" />
                </div>
                <CardTitle className="text-lg leading-tight">
                  {tech.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm leading-relaxed">
                  {tech.purpose}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-sm text-muted-foreground">
            All technologies are carefully selected for reliability, performance, and developer experience
          </p>
        </div>
      </div>
    </section>
  );
} 