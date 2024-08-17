import { LoadingScreen } from "../components/LoadingScreen";
import { BackgroundNoise } from "../components/BackgroundNoise";
import { createSignal, onCleanup, createEffect } from "solid-js";
import { twMerge } from "tailwind-merge";

const GreetingsMassageButton = () => {
    const messageTerminalSize = 1400;
    const styles = [
        "border-[5px] border-white border-solid rounded-[50px] hover:bg-white hover:text-black",
        ""];
    const [messageStyle, setMessageStyle] = createSignal(window.innerWidth > messageTerminalSize ? styles[0] : styles[1])

    const resizeHandler = () => {
        setMessageStyle(window.innerWidth > messageTerminalSize ? styles[0] : styles[1]);
    };

    window.addEventListener('resize', resizeHandler);

    onCleanup(() => window.removeEventListener('resize', resizeHandler));

    return (
        <div class="w-screen">
            <div class="flex justify-center">
                <a href="/about">
                    <div class={twMerge("text-white font-michroma text-[24px] m-[10px] p-[10px] w-[400px]", messageStyle())}>
                        PROCEED
                    </div>
                </a>
            </div>
        </div>
    )
}

const GreetingsMassageBody = () => {
    const messageTerminalSize = 1400;
    const messages = [
        "Construct Media Group is IT consulting company that specializes on web development, music promotion and other unique digital services",
        "CMG is an IT consulting firm focused on web development, music promotion, and digital services."];
    const styles = ["text-[36px]", "text-[20px]"]
    const [messageStyle, setMessageStyle] = createSignal(window.innerWidth > messageTerminalSize ? styles[0] : styles[1])
    const [message, setMessage] = createSignal(window.innerWidth > messageTerminalSize ? messages[0] : messages[1]);
    const resizeHandler = () => {
        setMessage(window.innerWidth > messageTerminalSize ? messages[0] : messages[1]);
        setMessageStyle(window.innerWidth > messageTerminalSize ? styles[0] : styles[1]);
    };

    window.addEventListener('resize', resizeHandler);

    onCleanup(() => window.removeEventListener('resize', resizeHandler));

    return (
        <div class="w-screen flex justify-center">
            <div class={twMerge(messageStyle(), "text-white font-michroma max-w-[1330px] text-center mx-[10px] mb-[75px]")}>{message()}</div>
        </div>
    );
}

const GreetingsMessageHeader = () => {
    const messageTerminalSize = 1400;
    const messages = ["WELCOME TO OUR UNIVERSE", "WELCOME"];
    const styles = ["text-[64px]", "text-[50px]"]
    const [messageStyle, setMessageStyle] = createSignal(window.innerWidth > messageTerminalSize ? styles[0] : styles[1])
    const [message, setMessage] = createSignal(window.innerWidth > messageTerminalSize ? messages[0] : messages[1]);

    const resizeHandler = () => {
        setMessage(window.innerWidth > messageTerminalSize ? messages[0] : messages[1]);
        setMessageStyle(window.innerWidth > messageTerminalSize ? styles[0] : styles[1]);
    };

    window.addEventListener('resize', resizeHandler);
    onCleanup(() => window.removeEventListener('resize', resizeHandler));

    return (
        <div class={twMerge(messageStyle(), "text-white font-michroma w-screen text-center mb-[10px]")}>{message()}</div>
    );
}

export const Home = () => {
    const [loadingScreenVisibile, setLoadingScreenVisibility] = createSignal(true);

    createEffect(() => {
        const timeout = setTimeout(() => {
            setLoadingScreenVisibility(false);
        }, 1000);

        return () => clearTimeout(timeout);
    });

    return (
        <Show when={loadingScreenVisibile() == false} fallback={< LoadingScreen visibility={loadingScreenVisibile} />}>
            <BackgroundNoise blur={20} speed={0.0005} scale={1000} dotSize={15} gap={0} hueRange={30} hueBase={570} />
            <div class="absolute">
                <div class="h-screen w-screen flex justify-center">
                    <div class="flex items-center">
                        <div class="flex-col text-center">
                            <GreetingsMessageHeader />
                            <GreetingsMassageBody />
                            <GreetingsMassageButton />
                        </div>
                    </div>
                </div>
            </div>
        </Show >
    );
}