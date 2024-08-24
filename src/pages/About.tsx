import { Header } from "../components/about";
import { LoadingScreen } from "../components/LoadingScreen";
import { Planet } from "../components/models/Planet";
import { FlippingWords } from "../components/FlippingWords";
import { createSignal, onCleanup, onMount, type Component, Suspense, createMemo, Accessor } from 'solid-js';
import { twMerge } from "tailwind-merge";


const TriangleScroll: Component = () => {
    const scrollToNextSection = () => {
        window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
    };

    return (
        <div class="absolute bottom-0 w-full mb-[50px]">
            <svg onClick={scrollToNextSection} height="27" viewBox="0 0 104 27" fill="none" xmlns="http://www.w3.org/2000/svg"
                class="cursor-pointer mx-auto md:opacity-100 opacity-50 w-[50px]">
                <path d="M52 27L103.962 0.75H0.038475L52 27Z" fill="white" />
            </svg>
        </div>

    );
};

const Hero: Component = () => {
    return (
        <div id="hero">
            <div class="absolute flex items-center justify-center h-screen">
                <div class="font-michroma text-white max-w-[800px] md:ml-[20%] md:text-[48px] md:text-left text-center ml-2 text-[20px]">
                    AT CONSTUCT MEDIA GROUP, WE ARE DEDICATED TO IMPLEMENT YOUR&nbsp;
                    <FlippingWords />
                </div>
            </div>
            <TriangleScroll />
            <Planet />
        </div>
    );
};

const Dev: Component = () => {
    return (
        <div id="dev" class="h-screen text-white font-michroma">
            <div class="mt-[70px]">

            </div>
        </div>
    );
};

const Music: Component = () => {
    return (
        <div id="music" class="h-screen text-white font-michroma">
            asdas
        </div>
    );
};

export const About = () => {
    return (
        <Suspense fallback={<LoadingScreen />}>
            <Header />
            <Hero />
            <Dev />
            <Music />
        </Suspense>
    );
}
