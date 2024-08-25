import { Header, Hero, LoadingScreen } from "../components/about";
import { createSignal, onCleanup, onMount, type Component, Suspense, createMemo, Accessor } from 'solid-js';
import { twMerge } from "tailwind-merge";

type CardParams = {
    src: string;
    title: string;
    url: string;
};

const CardMessage: Component = () => {
    return (
        <div class="flex flex-col items-center justify-center text-center mt-[200px]">
            <div class="font-michroma text-white md:text-[2.5rem] text-[2rem]">
                OUR PROJECTS
            </div>
            <div class="font-michroma text-white md:text-[1rem] text-[1rem] mt-2 max-w-[450px]">
                DISCOVER EXAMPLES OF OUR MODERN SOFTWARE BUSINESS SOLUTIONS
            </div>
        </div>

    );
};

const Card: Component<CardParams> = (props: CardParams) => {
    const title = props.title.toUpperCase();

    return (
        <div class="min-h-[280px] max-w-[380px] w-full bg-[#242424] rounded-[20px] relative z-[-10] mx-auto">
            <img class="noise w-full h-full opacity-10 rounded-[20px]" src={props.src} alt={title} />
            <div class="absolute bottom-0 w-full p-[5px] h-[50px] flex justify-end">
                <div class="bg-black h-full font-michroma text-[1rem] flex justify-center items-center px-[15px] rounded-[20px]">
                    {title}
                </div>
                <div class="bg-black h-full w-[40px] font-michroma text-[1rem] flex justify-center items-center px-[15px] rounded-[20px] ml-[5px] cursor-pointer">
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.292893 11.2929C-0.0976311 11.6834 -0.0976311 12.3166 0.292893 12.7071C0.683418 13.0976 1.31658 13.0976 1.70711 12.7071L0.292893 11.2929ZM13 0.999999C13 0.447714 12.5523 -8.70777e-07 12 -8.70777e-07L3 -8.70777e-07C2.44772 -8.70777e-07 2 0.447714 2 0.999999C2 1.55228 2.44772 2 3 2H11V10C11 10.5523 11.4477 11 12 11C12.5523 11 13 10.5523 13 10L13 0.999999ZM1.70711 12.7071L12.7071 1.70711L11.2929 0.292892L0.292893 11.2929L1.70711 12.7071Z" fill="white" />
                    </svg>
                </div>
            </div>
        </div>
    )
};

const Dev: Component = () => {
    return (
        <div id="dev" class="min-h-screen text-white font-michroma">
            <div class="md:mt-[70px] mt-[50px] mx-auto max-w-[1400px] flex flex-col items-center">
                <div class="mx-[10px]">
                    <CardMessage />
                    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 w-full mt-[50px] place-content-evenly gap-4">
                        <Card src="/images/projects/placeholder.jpg" title="safit" url="safit" />
                        <Card src="/images/projects/placeholder.jpg" title="safit" url="safit" />
                        <Card src="/images/projects/placeholder.jpg" title="safit" url="safit" />
                        <Card src="/images/projects/placeholder.jpg" title="safit" url="safit" />
                        <Card src="/images/projects/placeholder.jpg" title="safit" url="safit" />
                        <Card src="/images/projects/placeholder.jpg" title="safit" url="safit" />
                    </div>
                </div>
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
