import { Component, createEffect, Show, Suspense } from "solid-js";
import { FlippingWords } from "../components/FlippingWords";
import { LoadingScreen } from "../components/LoadingScreen";
import { Planet, isLoading } from "../components/models/Planet";
import { Header } from "../components/Header";
import { TypingWords } from "../components/TypingWords";

export const Greetings: Component = () => {
    createEffect(() => document.title = "CMG");

    return (
        <>
            <Show when={!isLoading()}>
                <Header style="opacity-0" />
            </Show>
            <section class="relative">
                <Show when={!isLoading()}>
                    <div class="absolute flex items-center justify-center h-screen z-10">
                        <div class="font-michroma text-white justify-center max-w-[800px] md:ml-[20%] md:text-[48px] md:text-left text-center mx-2 text-[20px]">
                            AT CONSTUCT MEDIA GROUP, WE ARE DEDICATED TO IMPLEMENT YOUR&nbsp;
                            <FlippingWords />
                            <TypingWords />
                        </div>
                    </div>
                </Show>
                <div class="absolute inset-0 z-0">
                    <Planet />
                </div>
                <LoadingScreen show={isLoading} />
            </section>

        </>
    );
};