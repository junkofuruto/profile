import { Component, createEffect, Suspense } from "solid-js";
import { LoadingScreen } from "../components/LoadingScreen";
import { Header } from "../components/Header";
import { data } from "../data";

const ArtistPage: Component<{ name: string, genre: string, image_url: string, href: string }> = (props) => {
    return (
        <a class="md:grid md:grid-cols-3 h-[34vw] hover:bg-[#191919] duration-200" href={`${props.href}`}>
            <div class="p-[10px] col-span-2 font-michroma text-white flex flex-col h-full">
                <div class="md:text-[1.5vw] sm:text-[15px] flex-grow">
                    <p>{props.genre}</p>
                </div>
                <div class="col-span-2 mt-auto">
                    <p class="md:text-[3vw] text-[32px] uppercase">{props.name}</p>
                </div>
            </div>
            <div class="md:h-full h-[350px] max-w-[600px]">
                <img
                    src={props.image_url}
                    alt={props.name}
                    class="h-full w-full object-cover object-center"
                    loading="lazy"
                />
            </div>
        </a>
    );
};

export const Label: Component = () => {
    createEffect(() => document.title = "Label");

    return (
        <Suspense fallback={<LoadingScreen />}>
            <Header style="opacity-30" />
            <section id="music" class="w-screen text-white font-michroma md:pt-[50px] pt-[40px]">
                <div class="w-screen md:grid block grid-cols-2 border-b border-white">
                    <div class="md:h-[80vh] h-[70vh] order-2 relative">
                        <img
                            src={data.label.hero.image_url}
                            alt="Album cover"
                            class="h-full w-full object-cover object-center"
                            loading="lazy"
                        />
                    </div>
                    <div class="grid grid-rows-2 md:pl-[20px] pl-0 md:h-[80vh] h-[calc(30vh-40px)] order-1">
                        <div class="md:pt-0 pt-[20px]">
                            <p class="text-[4.5vw] hidden md:block">CHECK IT OUT!</p>
                            <p class="md:text-[1.5vw] text-[1rem] md:text-left text-center">LISTEN NEW RELEASE <span class="text-red-600 font-bold">{data.label.hero.album}</span> BY {data.label.hero.author}</p>
                        </div>
                        <a class="md:mt-auto mt-0 mb-[20px] md:flex flex-none items-center" href={data.label.hero.link}>
                            <span class="md:text-[1.5vw] text-[1.5rem] md:text-left md:w-auto md:inline block w-screen text-center md:no-underline underline">LISTEN NOW</span>
                            <svg xmlns="http://www.w3.org/2000/svg" height="1.5vw" viewBox="0 -960 960 960" width="1.5vw" fill="#FFFFFF" class="ml-2 hidden md:block">
                                <path d="m256-240-56-56 384-384H240v-80h480v480h-80v-344L256-240Z" />
                            </svg>
                        </a>
                    </div>
                </div>
                <div class="flex md:h-[calc(20vh-50px)] h-[calc(10vh)] items-center border-b border-white">
                    <div class="w-[10vw]"></div>
                    <div class="w-[80vw] text-[4.5vw] text-center">OUR ARTISTS</div>
                    <div class="w-[10vw]">
                        <svg xmlns="http://www.w3.org/2000/svg" height="4.5vw" viewBox="0 -960 960 960" width="4.5vw" fill="#FFFFFF"><path d="M440-800v487L216-537l-56 57 320 320 320-320-56-57-224 224v-487h-80Z" /></svg>
                    </div>
                </div>
                {
                    data.label.artists.map((artist) => (
                        <ArtistPage name={artist.name} genre={artist.genre} image_url={artist.image_url} href={artist.href} />
                    ))
                }
            </section>
        </Suspense>
    );
};