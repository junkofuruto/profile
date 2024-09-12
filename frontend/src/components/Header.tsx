import { type Component } from "solid-js";
import { createSignal, createMemo, onMount, onCleanup } from "solid-js";
import { twMerge } from "tailwind-merge";
import { BackgroundNoise } from "./BackgroundNoise";

type HeaderNavigationButtonProps = {
    text: string,
    href: string
};

const HeaderNavigationButton: Component<HeaderNavigationButtonProps> = (props: HeaderNavigationButtonProps) => {
    return (
        <a href={props.href} class="font-michroma text-white md:text-[1rem] text-[0.6rem] transition">
            {props.text}
        </a>
    );
};

export type HeaderParams = {
    style?: string;
};

export const Header: Component<HeaderParams> = (props: HeaderParams) => {
    const [isHeaderVisible, setIsHeaderVisible] = createSignal<boolean>(true);
    const [headerHeigth, setHeaderHeigth] = createSignal<number>(window.innerWidth > 768 ? 50 : 40);
    const isVisible = createMemo(() => isHeaderVisible() ? 'opacity-100' : 'opacity-0');

    const handleScroll = (event: Event) => setIsHeaderVisible(true);;
    const handleResize = (event: Event) => setHeaderHeigth(window.innerWidth > 768 ? 50 : 40);

    onMount(() => {
        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleResize);
        onCleanup(() => window.removeEventListener('scroll', handleScroll));
        onCleanup(() => window.removeEventListener('resize', handleResize));
    });

    return (
        <header class={twMerge("fixed top-0 left-0 md:h-[50px] h-[40px] w-screen duration-200 transition-opacity z-50 backdrop-blur-lg", isVisible())}>
            <BackgroundNoise
                blur={0}
                speed={0.0005}
                scale={1000}
                dotSize={8}
                gap={0}
                hueRange={40}
                hueBase={570}
                height={headerHeigth()}
                style={twMerge("absolute inset-0 opacity-100", props.style ?? "")}
            />
            <div class="absolute inset-0 noise md:h-[50px] h-[40px] opacity-30" />
            <div class="absolute w-screen md:h-[70px] h-[50px]">
                <div class="flex items-center md:h-[50px] h-[40px] md:mx-16 mx-8">
                    <a href="/" class="font-michroma text-white md:text-[1.5rem] text-[1rem]">CMG</a>
                    <div class="flex justify-around flex-1 md:ml-[40px] ml-[2rem]">
                        <HeaderNavigationButton href="/projects" text="DEV" />
                        <HeaderNavigationButton href="/label" text="MUSIC" />
                        <HeaderNavigationButton href="/contact" text="CONTACT" />
                    </div>
                </div>
            </div>
        </header>


    );
};