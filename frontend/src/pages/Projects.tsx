import { Component, createEffect, Suspense } from "solid-js";
import { Header } from "../components/Header";
import { LoadingScreen } from "../components/LoadingScreen";
import { data } from "../data";

type ProjectCardProps = {
    tags: string;
    date: string;
    name: string;
    image: string;
    accent: string;
};

const ProjectCard: Component<ProjectCardProps> = (props: ProjectCardProps) => {
    return (
        <a class="md:grid md:grid-cols-2 h-[34vw] hover:bg-[#191919] duration-200" href={`projects/${props.name}`}>
            <div class="p-[10px] font-michroma text-white flex flex-col h-full">
                <div class="grid grid-cols-2 md:text-[1.5vw] sm:text-[15px] flex-grow">
                    <p>{props.tags}</p>
                    <p class="text-right">{props.date}</p>
                </div>
                <div class="col-span-2 mt-auto">
                    <p class="md:text-[3vw] text-[32px] uppercase">{props.name}</p>
                </div>
            </div>
            <div class="md:h-full h-[300px] overflow-hidden relative" style={{ "background-color": props.accent }}>
                <img
                    src={props.image}
                    alt={props.name}
                    class="absolute inset-0 h-full w-auto object-cover mx-auto"
                    loading="lazy"
                />
            </div>
        </a>
    );
};

export const Projects: Component = () => {
    createEffect(() => document.title = "Projects");

    return (
        <Suspense fallback={<LoadingScreen />}>
            <Header style="opacity-30" />
            <section id="dev" class="min-h-screen w-screen md:pt-[50px] pt-[40px]">
                <div class="h-[30vh] px-[30px] border-b border-white">
                    <div class="md:grid md:grid-cols-2 h-full md:mt-0 mt-[10%]">
                        <div class="md:my-auto">
                            <p class="font-michroma text-white md:text-[5vw] text-[40px]">PROJECTS</p>
                        </div>
                        <div class="md:my-auto flex md:justify-end sm:justify-start">
                            <p class="font-michroma md:text-white text-gray-500 md:max-w-[55%] md:text-[1.2vw] sm:text-[15px] md:text-right sm:text-left">
                                CHECK OUT SHOWCASE OF OUR SOFTWARE BUSINESS SOLUTIONS
                            </p>
                        </div>
                    </div>
                </div>
                <div>
                    {
                        data.dev.projects.map((project) => (
                            <ProjectCard tags={project.tags} date={project.date} name={project.name} image={project.logo} accent={project.accent} />
                        ))
                    }
                </div>
            </section>
        </Suspense>
    );
};