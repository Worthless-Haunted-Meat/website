"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface TextGenerateEffectProps {
  words: string;
  className?: string;
}

export function TextGenerateEffect({ words, className }: TextGenerateEffectProps) {
  const [revealed, setRevealed] = useState(0);
  const wordList = words.split(" ");

  useEffect(() => {
    if (revealed >= wordList.length) return;
    const timeout = setTimeout(() => setRevealed((v) => v + 1), 80);
    return () => clearTimeout(timeout);
  }, [revealed, wordList.length]);

  return (
    <span className={cn(className)}>
      {wordList.map((word, i) => (
        <span
          key={i}
          style={{
            opacity: i < revealed ? 1 : 0,
            transition: "opacity 0.4s ease",
            display: "inline-block",
            marginRight: "0.3em",
          }}
        >
          {word}
        </span>
      ))}
    </span>
  );
}
