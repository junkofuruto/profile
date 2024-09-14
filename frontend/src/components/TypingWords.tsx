import { createSignal, createEffect, onCleanup, Component } from 'solid-js';
import { twMerge } from 'tailwind-merge';

export const TypingWords: Component = (props) => {
    const words: string[] = [
        'WEBSITE',
        'MUSIC',
        'VIDEO',
        'BACKEND',
        'APP',
    ];

    const [word, setWord] = createSignal('');
    const [currentIndex, setCurrentIndex] = createSignal(0);
    const [letterIndex, setLetterIndex] = createSignal(0);
    const [isDeleting, setIsDeleting] = createSignal(false);
    const [color, setColor] = createSignal(words[0]);

    const typingDelay = 150;
    const deletingDelay = 50;
    const wordPause = 1000;

    createEffect(() => {
        const typeWord = () => {
            if (!isDeleting()) {
                if (letterIndex() < words[currentIndex()].length) {
                    setWord(words[currentIndex()].slice(0, letterIndex() + 1));
                    setLetterIndex(letterIndex() + 1);
                } else {
                    setIsDeleting(true);
                    setTimeout(typeWord, wordPause);
                    return;
                }
            } else {
                if (letterIndex() > 0) {
                    setWord(words[currentIndex()].slice(0, letterIndex() - 1));
                    setLetterIndex(letterIndex() - 1);
                } else {
                    setIsDeleting(false);
                    setCurrentIndex((currentIndex() + 1) % words.length);
                    setColor(words[(currentIndex() + 1) % words.length].toLowerCase());
                    setTimeout(typeWord, wordPause);
                    return;
                }
            }

            setTimeout(typeWord, isDeleting() ? deletingDelay : typingDelay);
        };

        const timeoutId = setTimeout(typeWord, wordPause);

        onCleanup(() => clearTimeout(timeoutId));
    });

    return (
        <div class={twMerge("md:hidden block h-0 mt-[10vh] text-[2rem]", color())}>
            <p>{word()}</p>
        </div>
    );
};