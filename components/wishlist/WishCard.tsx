"use client";

import { type WishCardData } from "@/types/wish";
import { motion } from "framer-motion";
import { useState } from "react";

const CARD_COLORS = ["bg-[#FFF9F3]", "bg-[#F7DFD4]", "bg-[#FFE8D6]"];

type CardStyle = {
  top: string;
  left: string;
  color: string;
  duration: number;
  delay: number;
  motionX: number[];
  motionY: number[];
};

export default function WishCard({ wish }: { wish: WishCardData }) {
  const [style] = useState<CardStyle>(() => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    const randX = () => (Math.random() - 0.5) * vw * 0.9;
    const randY = () => (Math.random() - 0.5) * vh * 0.9;

    return {
      top: `${Math.random() * 80}vh`,
      left: `${Math.random() * 80}vw`,
      color: CARD_COLORS[Math.floor(Math.random() * CARD_COLORS.length)],
      duration: 60 + Math.random() * 35,
      delay: Math.random() * 2,
      motionX: [randX(), randX(), randX()],
      motionY: [randY(), randY(), randY()],
    };
  });

  const firstLetter = wish.name.charAt(0).toUpperCase();

  return (
    <motion.div
      className={`${style.color} fixed rounded-2xl p-5 shadow-lg backdrop-blur-sm border border-white/50 opacity-85 w-60`}
      style={{ top: style.top, left: style.left }}
      animate={{
        x: style.motionX,
        y: style.motionY,
      }}
      transition={{
        duration: style.duration,
        repeat: Infinity,
        ease: "easeOut",
        delay: style.delay,
      }}>
      <div className="flex items-center gap-2 mb-3">
        <div className="w-8 h-8 rounded-full bg-linear-to-br from-[#D4816D] to-[#C87360] flex items-center justify-center">
          <p className="font-semibold">{firstLetter}</p>
        </div>
        <h3 className="text-[#8B6F5C] font-semibold text-base">{wish.name}</h3>
      </div>
      <p className="text-[#8B6F5C] font-medium italic text-sm leading-relaxed opacity-90">
        {wish.text}
      </p>
    </motion.div>
  );
}
