import { Show, createSignal, createEffect, children } from "solid-js";

const LoadingScreenEndingSplash = () => {
    return (
        <div>
            <div class="h-screen w-screen flex justify-center">
                <div class="flex items-center">
                    <div class="flex-col text-center">
                        <div class="flex justify-center">
                            <img src="/images/loading/explosion.webp" class="w-[240px]" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const LoadingScreenSplash = (props) => {
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
        <Show when={props.visibility()}>
            <Show when={props.loadingScreen()} fallback={<LoadingScreenEndingSplash />}>
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
            </Show>
        </Show>
    );
};

export const LoadingScreen = (props) => {
    const resolved = children(() => props.children)
    const [visibility, setVisibility] = createSignal(true);

    createEffect(() => {
        const currentVisibility = props.visibility();
        const timer = setTimeout(() => setVisibility(currentVisibility), 750);
        return () => clearTimeout(timer);
    });

    return (
        <>
            <LoadingScreenSplash visibility={visibility} loadingScreen={props.visibility} />
            <Show when={visibility()} fallback={resolved()} />
        </>
    );
};