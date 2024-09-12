import { Suspense, createEffect } from "solid-js";
import { useParams } from "@solidjs/router";

import { LoadingScreen } from "../components/LoadingScreen";
import { Header } from "../components/Header";

export const Project = () => {
    const { name } = useParams();
    createEffect(() => document.title = name.toUpperCase());

    return (
        <Suspense fallback={<LoadingScreen />}>
            <Header style="opacity-30" />
            <section class="font-michroma text-white md:pt-[50px] pt-[40px]">

            </section>
        </Suspense>
    );
};