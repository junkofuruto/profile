import { createSignal, onCleanup, onMount, type Component } from 'solid-js';

export const FlippingWords: Component = () => {
    const words: string[] = [
        'WEBSITE',
        'MUSIC',
        'VIDEO',
        'BACKEND',
        'APP',
    ];

    const [currentWordIndex, setCurrentWordIndex] = createSignal<number>(0);
    const wordArray: HTMLElement[][] = [];

    let currentWordRef: HTMLSpanElement | undefined;

    const changeWord = () => {
        if (!currentWordRef) return;

        const cw = wordArray[currentWordIndex()];
        const nw = currentWordIndex() === words.length - 1 ? wordArray[0] : wordArray[currentWordIndex() + 1];

        cw.forEach((letter, i) => animateLetterOut(letter, i));

        nw.forEach((letter, i) => {
            letter.className = 'letter behind';
            nw[0].parentElement!.style.opacity = "1";
            animateLetterIn(letter, i);
        });

        setCurrentWordIndex((prev) => (prev === words.length - 1 ? 0 : prev + 1));
    };

    const animateLetterOut = (letter: HTMLElement, index: number) => {
        setTimeout(() => {
            letter.className = 'letter out';
        }, index * 80);
    };

    const animateLetterIn = (letter: HTMLElement, index: number) => {
        setTimeout(() => {
            letter.className = 'letter in';
        }, 340 + index * 80);
    };

    const splitLetters = (word: HTMLElement) => {
        const content = word.innerHTML;
        word.innerHTML = '';
        const letters: HTMLElement[] = [];
        for (let letter of content) {
            const span = document.createElement('span');
            span.className = 'letter';
            span.innerHTML = letter;
            word.appendChild(span);
            letters.push(span);
        }
        wordArray.push(letters);
    };

    onMount(() => {
        const wordElements = document.querySelectorAll<HTMLElement>('.word');
        wordElements.forEach(splitLetters);

        if (currentWordRef && currentWordRef.children.length > 0) {
            (currentWordRef.children[0] as HTMLElement).style.opacity = "1";
        }
        changeWord();
        const intervalId = setInterval(changeWord, 4000);

        onCleanup(() => clearInterval(intervalId));
    });

    return (
        <span ref={currentWordRef}>
            {words.map((word, index) => (
                <span class={`word ${index % 5 === 0 ? 'website' : (index % 5 === 1 ? 'music' : (index % 5 === 2 ? 'video' : (index % 5 === 3 ? 'backend' : 'app')))} `}>
                    {word}
                </span>
            ))}
        </span>
    );
};
