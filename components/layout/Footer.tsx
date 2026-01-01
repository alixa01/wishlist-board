export default function Footer() {
  return (
    <footer className="fixed inset-0 z-10 flex items-end justify-center pb-6 text-sm text-[#8B4513] shadow-md">
      <p className="text-center">
        © Grifixn {new Date().getFullYear()} · A place for quiet wishes
      </p>
    </footer>
  );
}
