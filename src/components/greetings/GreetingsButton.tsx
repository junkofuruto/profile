import { type Component } from "solid-js";

export const GreetingsButtonDesktop: Component = () => {
    return (
        <div class="w-screen">
            <div class="flex justify-center">
                <a href="/about">
                    <div class="border-[1px] border-white border-solid rounded-[50px] hover:bg-white hover:text-black text-white font-michroma text-[24px] m-[10px] p-[10px] w-[400px]">
                        PROCEED
                    </div>
                </a>
            </div>
        </div>
    )
};

export const GreetingsButtonMobile: Component = () => {
    return (
        <div class="w-screen">
            <div class="flex justify-center">
                <a href="/about">
                    <div class="text-white font-michroma text-[24px] m-[10px] p-[10px] w-[400px]">
                        PROCEED
                    </div>
                </a>
            </div>
        </div>
    )
};