"use client";

import Background from "@/components/layout/Background";
import WishForm from "@/components/wishlist";
import WishCard from "@/components/wishlist/WishCard";
import { type WishCardData } from "@/types/wish";
import { useEffect, useState } from "react";
import Footer from "../components/layout/Footer";

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
        className="fixed inset-0 z-10 pointer-events-none">
        {wishes.map((wish) => (
          <WishCard key={wish.id} wish={wish} />
        ))}
      </section>

      <Footer />
    </main>
  );
}
