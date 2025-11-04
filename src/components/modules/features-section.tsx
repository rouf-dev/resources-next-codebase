"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animation-variants";

interface Feature {
  title: string;
  description: string;
}

interface FeaturesSectionProps {
  title: string;
  features: Record<string, Feature>;
}

export function FeaturesSection({ title, features }: FeaturesSectionProps) {
  return (
    <motion.section
      className="py-20"
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <motion.h2
        className="text-3xl md:text-4xl font-bold text-center mb-12"
        variants={fadeInUp}
      >
        {title}
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {Object.entries(features).map(([key, feature]) => (
          <motion.div
            key={key}
            className="p-6 rounded-lg border bg-card text-card-foreground shadow-sm"
            variants={fadeInUp}
          >
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-muted-foreground">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
