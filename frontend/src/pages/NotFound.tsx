import { createEffect, Suspense } from 'solid-js';

import { LoadingScreen } from "../components/LoadingScreen";
import { Header } from "../components/Header";

export const NotFound = () => {
    createEffect(() => document.title = "404 :(");

    return (
        <Suspense fallback={<LoadingScreen />}>
            <Header style='opacity-30' />
            <section class="w-screen h-screen text-white font-michroma">
                <div class="flex items-center justify-center min-h-screen">
                    <h1 class="text-[3vw]">IS THAT OURS MISTAKE OR YOURS?</h1>
                </div>
            </section>
        </Suspense>
    );
};