"use client";

import { useCallback, useState } from "react";
import { type WishData } from "../../types/wish";
import { wishSchema } from "@/schemas/wish";
import { Dices } from "lucide-react";
import { WISH_RANDOM } from "@/data/wish";

type FieldErrors = Partial<Record<keyof WishData, string>>;

export default function WishForm() {
  const [isSubmit, setIsSubmit] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [formData, setFormData] = useState<WishData>({
    name: "",
    text: "",
  });

  const handleWishRandom = useCallback(() => {
    const randI = Math.floor(Math.random() * WISH_RANDOM.length);
    const randW = WISH_RANDOM[randI];
    setFormData((prev) => ({ ...prev, text: randW }));
  }, []);

  const handleInputChange = useCallback(
    (field: keyof WishData, value: string) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  const resetForm = useCallback(() => {
    setFormData({
      name: "",
      text: "",
    });
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      const parsed = wishSchema.safeParse(formData);

      if (!parsed.success) {
        const errors = parsed.error.flatten().fieldErrors;

        setFieldErrors({
          name: errors.name?.[0],
          text: errors.text?.[0],
        });

        return;
      }

      setIsSubmit(true);
      setError("");

      try {
        const res = await fetch("/api/wish", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        const data = await res.json();

        if (!res.ok) {
          setError(data.message || "Something went wrong");
          return;
        }

        resetForm();
      } catch (error) {
        console.error(error);
        setError("Network error, please try again");
      } finally {
        setIsSubmit(false);
      }
    },
    [formData, resetForm]
  );

  return (
    <section id="wish-form" className="w-full relative z-50">
      <div className="mx-auto max-w-7xl min-h-screen flex items-center justify-center px-4">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md rounded-2xl bg-[#FFFBF8] p-4 md:p-8 shadow-lg">
          <h2 className="text-[#8B4513] font-bold text-xl md:text-2xl text-center mb-4 md:mb-8">
            Make a Wish
          </h2>

          {/* input */}
          <div className="flex flex-col gap-3 md:gap-6">
            {/* input name */}
            <div className="flex flex-col gap-2">
              <label className="text-[#A0522D] font-bold text-sm md:text-base">
                Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="text-[#5C4033] w-full h-10 md:h-14 px-4  rounded-xl text-sm md:text-base font-medium placeholder-[#8B6F5C] placeholder-opacity-50 bg-[#FFF5EE] border border-[#E8D5C4] focus:outline-none focus:border-[#D4816D]"
                placeholder="Your Name..."
                required
              />
              {fieldErrors.name && (
                <p className="text-xs text-red-400">{fieldErrors.name}</p>
              )}
            </div>

            {/* input wish */}
            <div className="flex flex-col gap-2">
              <label className="text-[#A0522D] font-bold text-sm md:text-base">
                Wish
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={formData.text}
                  onChange={(e) => handleInputChange("text", e.target.value)}
                  className="text-[#5C4033] w-full h-10 md:h-14 px-4 rounded-xl text-sm md:text-base font-medium placeholder-[#8B6F5C] placeholder-opacity-50 bg-[#FFF5EE] border border-[#E8D5C4] focus:outline-none focus:border-[#D4816D]"
                  placeholder="Your Wish..."
                  required
                />
                <button
                  className="hover:cursor-pointer absolute top-3 right-2 md:top-7 md:right-3"
                  onClick={handleWishRandom}>
                  <Dices className="text-[#8B6F5C]" size={20} />
                </button>
              </div>

              {fieldErrors.text && (
                <p className="text-xs text-red-400">{fieldErrors.text}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmit}
              className="h-10 md:h-14 w-full bg-[#FF8C69] hover:bg-[#FF7A52] text-white transition duration-300 ease-out rounded-xl text-base md:text-lg font-bold mb-4 shadow-lg hover:cursor-pointer">
              {isSubmit ? "Sending Your Wish ✨✨..." : "Send My Wish ✨"}
            </button>

            {error && (
              <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-md text-sm">
                {error}
              </div>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
