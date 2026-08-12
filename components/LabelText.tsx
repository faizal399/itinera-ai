"use client";
import React from "react";
interface LabelTextProps {
  children: React.ReactNode;
}
import { motion } from "motion/react";
const LabelText = ({ children}:LabelTextProps) => {
  return (
    <motion.label
      initial={{
        y: 20,
        opacity: 0,
      }}
      whileInView={{
        y: 0,
        opacity: 1,
      }}
      viewport={{ once: true }}
      transition={{
        delay: 0,
        duration: 0.4,
        ease: "easeOut",
      }}
      className="text-2xl font-bold"
    >
      {children}
    </motion.label>
  );
};

export default LabelText;
