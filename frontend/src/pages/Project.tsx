import { Show, createEffect } from "solid-js";
import { useParams } from "@solidjs/router";
import { Header } from "../components/Header";
import { NotFound } from "./NotFound";
import { data } from "../data.jsx"

const TitleBlock = (props: { name: string, date: string, tags: string }) => {
    return (
        <div class="font-michroma text-white">
            <div class="h-[25vh] flex items-center">
                <p class="md:ml-[1vw] ml-5 md:text-[5vw] text-[2.5rem]">{props.name.toUpperCase()}</p>
            </div >
            <div class="min-h-[3vw] md:mx-[1vw] mx-5 mb-2 grid grid-cols-2 md:text-[1.5rem] text-[1rem] items-center">
                <p>{props.date}</p>
                <p class="text-right">{props.tags}</p>
            </div>
        </div>
    )
}

const PreviewBlock = (props: { type: string, data: string }) => {
    return (
        <div class="w-screen">
            <img class="w-full" src={props.data} />
        </div>
    )
}

export const Project = () => {
    const { name } = useParams();
    const project = data.dev.projects.find(project => project.name === name);

    createEffect(() => document.title = name.toUpperCase());

    return (
        <Show when={project} fallback={<NotFound />}>
            <Header style="opacity-30" />
            <section class="font-michroma min-h-screen md:pt-[50px] pt-[40px]">
                <TitleBlock name={project!.name} date={project!.date} tags={project!.tags} />
                {
                    project?.data.map((data) => {
                        switch (data.type) {
                            case "preview": return <PreviewBlock type={data.type} data={data.data} />;
                        }
                    })
                }
            </section>
        </Show>
    );
};