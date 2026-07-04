"use client";

import { Gift } from "lucide-react";
import { Textarea } from "@/components/common/Textarea";

interface GiftMessageFormProps {
  value: string;
  onChange: (value: string) => void;
}

const CHAR_LIMIT = 200;

const suggestions = [
  "With all my love ❤️",
  "Happy Birthday! 🎂",
  "Thinking of you 💭",
  "Congratulations! 🎉",
  "Thank you so much 🙏",
  "Get well soon 🌟",
];

export default function GiftMessageForm({ value, onChange }: GiftMessageFormProps) {
  return (
    <div className="bg-blush-50 rounded-2xl p-4 border border-blush-100">
      <div className="flex items-center gap-2 mb-3">
        <Gift className="w-4 h-4 text-blush-500" />
        <span className="font-body text-sm font-semibold text-sage-800">
          Gift Message
        </span>
      </div>

      {/* Quick suggestions */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        {suggestions.map((suggestion) => (
          <button
            key={suggestion}
            type="button"
            onClick={() => onChange(suggestion)}
            className="px-2.5 py-1 bg-white border border-blush-200 rounded-lg text-xs font-body text-blush-700 hover:bg-blush-100 transition-colors"
          >
            {suggestion}
          </button>
        ))}
      </div>

      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Write your personal message here…"
        rows={3}
        charLimit={CHAR_LIMIT}
        currentLength={value.length}
        maxLength={CHAR_LIMIT}
        className="text-sm bg-white"
        hint="Your message will be printed on a beautiful card included with the arrangement."
      />
    </div>
  );
}