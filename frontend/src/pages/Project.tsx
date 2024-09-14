import { Show, createEffect } from "solid-js";
import { useParams } from "@solidjs/router";
import { Header } from "../components/Header";
import { NotFound } from "./NotFound";
import { data } from "../data.jsx"

export const Project = () => {
    const { name } = useParams();
    const project = data.dev.projects.find(project => project.name === name);

    createEffect(() => document.title = name.toUpperCase());

    return (
        <Show when={project} fallback={<NotFound />}>
            <Header style="opacity-30" />
            <section class="font-michroma text-white md:pt-[50px] pt-[40px] h-screen">
                <div class="md:grid md:grid-cols-2 block h-[87vh]">
                    <div class="md:h-[87vh] w-full">
                        <img
                            src={project?.preview}
                            class="md:h-full h-[20vh] md:mb-0 mb-[3vh] w-full object-cover object-center md:pr-[2vw] p-0 md:block hidden"
                            loading="lazy"
                        />
                    </div>

                    <div class="mr-[2vw] md:ml-0 ml-[2vw]">
                        <p class="md:text-[4.5vw] text-[2.5rem] md:text-left text-center">{project?.name.toUpperCase()}</p>
                        <p class="text-justify ml-[0.3vw]">{project?.info}</p>
                    </div>
                </div>
                <div class="border-t border-white grid grid-cols-2 md:h-[calc(13vh-50px)] h-[calc(13vh-40px)] px-[15px]">
                    <p class="text-left my-auto">{project?.date}</p>
                    <p class="text-right my-auto">{project?.tags}</p>
                </div>
            </section>
        </Show>
    );
};