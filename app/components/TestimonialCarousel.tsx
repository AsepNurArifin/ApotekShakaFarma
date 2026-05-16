"use client";

import { useState } from "react";
import { Testimonial } from "@/lib/types";

export default function TestimonialCarousel({ testimonials }: { testimonials: Testimonial[] }) {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((c) => (c + 1) % testimonials.length);
  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);

  return (
    <div className="relative max-w-2xl mx-auto">
      {/* Card */}
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-primary-100 border-l-4 border-l-primary-500 text-center relative overflow-hidden">
        <div className="absolute -top-4 -left-4 text-9xl text-accent-100 opacity-50 font-serif leading-none select-none pointer-events-none">
          &ldquo;
        </div>
        {/* Stars */}
        <div className="flex justify-center gap-1 mb-4 relative z-10">
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} className={`text-xl ${i < testimonials[current].rating ? "text-accent-500" : "text-gray-200"}`}>★</span>
          ))}
        </div>

        {/* Content */}
        <p className="text-text-secondary text-sm sm:text-base italic leading-relaxed mb-5 relative z-10">
          &ldquo;{testimonials[current].content}&rdquo;
        </p>

        {/* Author */}
        <div className="flex items-center justify-center gap-3 relative z-10">
          <div className="w-10 h-10 rounded-full bg-primary-800 flex items-center justify-center text-white font-bold text-sm">
            {testimonials[current].customerName.charAt(0)}
          </div>
          <div>
            <div className="font-bold text-sm text-text-primary">{testimonials[current].customerName}</div>
            <div className="text-xs text-text-muted">Pelanggan Setia</div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-center gap-3 mt-6">
        <button onClick={prev} className="w-10 h-10 rounded-full bg-primary-100 text-primary-700 hover:bg-primary-200 transition-colors flex items-center justify-center" aria-label="Previous">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        </button>

        <div className="flex gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${i === current ? "bg-primary-500 w-6" : "bg-primary-200"}`}
              aria-label={`Testimonial ${i + 1}`}
            />
          ))}
        </div>

        <button onClick={next} className="w-10 h-10 rounded-full bg-primary-100 text-primary-700 hover:bg-primary-200 transition-colors flex items-center justify-center" aria-label="Next">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>
    </div>
  );
}
