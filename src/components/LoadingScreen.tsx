import { createSignal, createEffect, Component } from "solid-js";

export const LoadingScreen: Component = () => {
    const imageSplashes = [
        "/images/loading/splash1.webp",
        "/images/loading/splash2.webp",
        "/images/loading/splash3.webp",
        "/images/loading/splash4.webp",
    ];
    const textPrompts = [
        "code mitosis in progress...",
        "distribute music & working hours...",
        "this will definitely work...",
        "our team excels at delegating....",
        "kitty bifurcation happens...",
    ];
    const [text, setText] = createSignal(textPrompts[0]);

    createEffect(() => {
        let currentPrompt = 1;

        const interval = setInterval(() => {
            setText(textPrompts[currentPrompt]);
            currentPrompt += 1;
            if (currentPrompt >= textPrompts.length)
                currentPrompt = 0;
        }, 2000);

        return () => clearInterval(interval);
    });

    return (
        <div>
            <div class="h-screen w-screen flex justify-center">
                <div class="flex items-center">
                    <div class="flex-col text-center">
                        <div class="flex justify-center">
                            <img src={imageSplashes[Math.floor(Math.random() * imageSplashes.length)]} alt="aaaah cool kitten mitosis" class="object-contain max-w-[240px]" />
                        </div>
                        <p class="text-white font-michroma">{text()}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};