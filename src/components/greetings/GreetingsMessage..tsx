import { Component } from "solid-js";

export const GreetingsMessageDesktop: Component = () => {
    return (
        <div class="w-screen flex justify-center">
            <div class="text-[36px] text-white font-michroma max-w-[1330px] text-center mx-[10px] mb-[75px]">
                Construct Media Group is IT consulting company that specializes on web development, music promotion and other unique digital services
            </div>
        </div>
    );
};

export const GreetingsMessageMobile: Component = () => {
    return (
        <div class="w-screen flex justify-center">
            <div class="text-[20px] text-white font-michroma max-w-[1000px] text-center mx-[20px] mb-[75px]">
                CMG is an IT consulting firm focused on web development, music promotion, and digital services.
            </div>
        </div>
    );
};