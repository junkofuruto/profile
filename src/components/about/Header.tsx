import { type Component } from "solid-js";
import { createSignal, createMemo, onMount, onCleanup } from "solid-js";
import { twMerge } from "tailwind-merge";
import { BackgroundNoise } from "../BackgroundNoise";

type HeaderNavigationButtonProps = {
    text: string,
    href: string
};

const HeaderNavigationButton: Component<HeaderNavigationButtonProps> = (props: HeaderNavigationButtonProps) => {
    return (
        <a href={props.href} class="font-michroma text-white md:text-[1.5rem] text-[0.75rem] transition">
            {props.text}
        </a>
    );
};

export const Header: Component = (props) => {
    const [isHeaderVisible, setIsHeaderVisible] = createSignal<boolean>(false);
    const [headerHeigth, setHeaderHeigth] = createSignal<number>(window.innerWidth > 768 ? 70 : 50);
    const isVisible = createMemo(() => isHeaderVisible() ? 'opacity-100' : 'opacity-0');

    const handleScroll = (event: Event) => setIsHeaderVisible(window.scrollY >= window.innerHeight);;
    const handleResize = (event: Event) => setHeaderHeigth(window.innerWidth > 768 ? 70 : 50);

    onMount(() => {
        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleResize);
        onCleanup(() => window.removeEventListener('scroll', handleScroll));
        onCleanup(() => window.removeEventListener('resize', handleResize));
    });

    return (
        <div class={twMerge("fixed top-0 left-0 md:h-[70px] h-[50px] w-screen transition-opacity", isVisible())}>
            <BackgroundNoise
                blur={0}
                speed={0.0005}
                scale={1000}
                dotSize={8}
                gap={0}
                hueRange={40}
                hueBase={570}
                height={headerHeigth()}
                style="absolute opacity-40"
            />
            <div class="absolute inset-0 noise md:h-[70px] h-[50px] opacity-30" />
            <header class="absolute w-screen md:h-[70px] h-[50px] transition-opacity">
                <div class="flex items-center h-full md:mx-16 mx-8">
                    <a href="/about" class="font-michroma text-white md:text-[2rem] text-[1rem] ">CMG</a>
                    <div class="flex justify-around flex-1 md:ml-[40px] ml-[2rem]">
                        <HeaderNavigationButton href="#hero" text="ABOUT" />
                        <HeaderNavigationButton href="#dev" text="DEV" />
                        <HeaderNavigationButton href="#music" text="MUSIC" />
                    </div>
                </div>
            </header>
        </div>
    );
};