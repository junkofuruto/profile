import { GreetingsHeaderDesktop, GreetingsHeaderMobile } from "../components/greetings/GreetingsHeader";
import { GreetingsButtonDesktop, GreetingsButtonMobile } from "../components/greetings/GreetingsButton";
import { GreetingsMessageDesktop, GreetingsMessageMobile } from "../components/greetings/GreetingsMessage.";
import { BackgroundNoise } from "../components/BackgroundNoise";
import { LoadingScreen } from "../components/LoadingScreen";
import { createSignal, onCleanup, Show, Suspense } from "solid-js";

const GreetingsDesktop = () => {
    return (
        <>
            <GreetingsHeaderDesktop />
            <GreetingsMessageDesktop />
            <GreetingsButtonDesktop />
        </>
    );
};

const GreetingsMobile = () => {
    return (
        <>
            <GreetingsHeaderMobile />
            <GreetingsMessageMobile />
            <GreetingsButtonMobile />
        </>
    );
};

export const Greetings = () => {
    const messageTerminalSize = 1400;
    const [isMobile, setIsMobile] = createSignal(window.innerWidth < messageTerminalSize);
    const resizeHandler = () => setIsMobile(window.innerWidth < messageTerminalSize);

    window.addEventListener('resize', resizeHandler);
    onCleanup(() => window.removeEventListener('resize', resizeHandler));

    return (
        <Suspense fallback={<LoadingScreen />}>
            <BackgroundNoise blur={20} speed={0.0005} scale={1000} dotSize={15} gap={0} hueRange={30} hueBase={570} style="absolute" />
            <div class="absolute">
                <div class="h-screen w-screen flex justify-center">
                    <div class="flex items-center">
                        <div class="flex-col text-center">
                            <Show when={isMobile()} fallback={<GreetingsDesktop />}>
                                <GreetingsMobile />
                            </Show>
                        </div>
                    </div>
                </div>
            </div>
        </Suspense>
    );
};