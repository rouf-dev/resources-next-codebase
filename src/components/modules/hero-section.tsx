"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { fadeInUp, staggerContainer } from "@/lib/animation-variants";

interface HeroSectionProps {
  title: string;
  subtitle: string;
  description: string;
  primaryCTA: string;
  secondaryCTA: string;
}

export function HeroSection({
  title,
  subtitle,
  description,
  primaryCTA,
  secondaryCTA,
}: HeroSectionProps) {
  return (
    <motion.section
      className="py-20 md:py-32"
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      <div className="text-center space-y-6">
        <motion.h1
          className="text-4xl md:text-6xl font-bold tracking-tight"
          variants={fadeInUp}
        >
          {title}
        </motion.h1>
        <motion.p
          className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto"
          variants={fadeInUp}
        >
          {subtitle}
        </motion.p>
        <motion.p
          className="text-lg text-muted-foreground max-w-2xl mx-auto"
          variants={fadeInUp}
        >
          {description}
        </motion.p>
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center pt-6"
          variants={fadeInUp}
        >
          <Button size="lg">{primaryCTA}</Button>
          <Button size="lg" variant="outline">
            {secondaryCTA}
          </Button>
        </motion.div>
      </div>
    </motion.section>
  );
}
