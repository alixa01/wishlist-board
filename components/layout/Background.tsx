"use client";

export default function Background() {
  return (
    <div className="fixed inset-0 -z-10">
      {/* base gradient */}
      <div className="absolute inset-0 bg-linear-to-b from-[#FFF5F0] via-[#FFE8DC] to-[#FFD5C8]" />

      {/* blur overlay */}
      {/* <div className="absolute inset-0 backdrop-blur-[120px]" /> */}

      {/* subtle noise */}
      {/* <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20" /> */}
    </div>
  );
}
