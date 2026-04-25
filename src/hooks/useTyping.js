import { useEffect, useState } from "react";

export function useTyping(words, speed = 95, hold = 1200) {
  const [wordIndex, setWordIndex] = useState(0);
  const [display, setDisplay] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          const next = currentWord.slice(0, display.length + 1);
          setDisplay(next);
          if (next === currentWord) {
            setTimeout(() => setIsDeleting(true), hold);
          }
        } else {
          const next = currentWord.slice(0, display.length - 1);
          setDisplay(next);
          if (!next) {
            setIsDeleting(false);
            setWordIndex((prev) => (prev + 1) % words.length);
          }
        }
      },
      isDeleting ? speed / 1.6 : speed,
    );

    return () => clearTimeout(timeout);
  }, [display, hold, isDeleting, speed, wordIndex, words]);

  return display;
}
