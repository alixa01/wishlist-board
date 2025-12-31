"use client";

import Background from "@/components/layout/Background";
import WishForm from "@/components/wishlist";
import WishCard from "@/components/wishlist/WishCard";
import { type WishCardData } from "@/types/wish";
import { useEffect, useState } from "react";

export default function Home() {
  const [wishes, setWishes] = useState<WishCardData[]>([]);

  useEffect(() => {
    const fetchWishes = async () => {
      const res = await fetch("/api/wish");
      const data = await res.json();
      setWishes(data);
    };

    fetchWishes();
  }, []);

  return (
    <main className="relative h-screen overflow-hidden">
      <Background />

      <WishForm />
      <section
        id="wish-card"
        className="absolute inset-0 z-10 pointer-events-none">
        <div className="relative mx-auto max-w-7xl h-full">
          {wishes.map((wish) => (
            <WishCard key={wish.id} wish={wish} />
          ))}
        </div>
      </section>
    </main>
  );
}
