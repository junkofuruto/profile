import { Component, Suspense, createEffect, createSignal, Signal, Accessor } from "solid-js";
import { LoadingScreen } from "../components/LoadingScreen";
import { Header } from "../components/Header";

const ContactField: Component<{ placeholder: string, signal: Signal<string> }> = (props) => {
    return (
        <input
            type="text"
            placeholder={props.placeholder}
            value={props.signal[0]()}
            onInput={(e) => props.signal[1](e.target.value)}
            class="md:text-[1vw] text-[1rem] border-b border-white bg-transparent text-white md:mb-[1vw] mb-[40px] w-full focus:outline-none md:pb-[0.5vw] pb-[5px]"
        />
    );
};

const ContactButton: Component<{ text: string; selected: boolean; onClick: () => void }> = (props) => {
    return (
        <button
            class={`border border-white md:text-[1vw] text-[1rem] md:p-[0.5vw] p-[5px] md:mr-[0.5vw] mr-[5px] md:mb-[0.5vw] mb-[5px] transition duration-300 ${props.selected ? 'bg-white text-black' : 'bg-transparent text-white'}`}
            onClick={props.onClick}
        >
            {props.text}
        </button>
    );
};

const SubmitButton: Component<{
    projectType: Accessor<string>,
    description: Accessor<string>,
    name: Accessor<string>,
    mail: Accessor<string>,
}> = (props) => {
    const clickHandler = () => {
        // TODO: actual code xd what am I waiting for
    };

    return (
        <button onClick={clickHandler}>
            <p class="md:text-[1vw] text-[1rem] text-black bg-white md:p-[0.6vw] p-[10px]">Send request</p>
        </button>
    );
};

export const Contact: Component = () => {
    createEffect(() => (document.title = "Contact"));

    const [selected, setSelected] = createSignal<string>("Other");
    const nameSignal = createSignal<string>("");
    const mailSignal = createSignal<string>("");
    const descriptionSignal = createSignal<string>("");

    const handleButtonClick = (text: string) => {
        setSelected(text);
    };

    return (
        <Suspense fallback={<LoadingScreen />}>
            <Header style="opacity-30" />
            <section id="contact" class="md:grid md:grid-cols-2 w-screen h-screen text-white font-michroma md:pt-[50px] pt-[40px]">
                <div class="my-auto md:mx-[10vw] mx-[20px] md:text-[2.8vw] text-[2rem] md:mt-auto mt-[50px]">
                    <p class="md:text-left text-center">Have a project?</p>
                    <p class="md:text-left text-center">We would love to help</p>
                </div>
                <div class="my-auto md:mx-[10vw] mx-[20px] md:mt-auto mt-[5vh]">
                    <p class="md:text-[1.5vw] text-[1rem] md:text-left text-center">I'm interested in...</p>
                    <div class="md:mt-[1vw] mt-[10px]">
                        {["Telegram Bot", "Application", "Website", "Music video", "Music distribution", "Other"].map((text) => (
                            <ContactButton
                                text={text}
                                selected={selected() === text}
                                onClick={() => handleButtonClick(text)}
                            />
                        ))}
                    </div>
                    <div class="md:mt-[1vw] mt-[5vh]">
                        <ContactField placeholder="Name" signal={nameSignal} />
                        <ContactField placeholder="Email" signal={mailSignal} />
                        <ContactField placeholder="Tell us about your project" signal={descriptionSignal} />
                    </div>
                    <div class="md:mt-[2vw] mt-[5vh] md:flex-none flex md:justify-start justify-center">
                        <SubmitButton
                            projectType={selected}
                            description={descriptionSignal[0]}
                            name={nameSignal[0]}
                            mail={mailSignal[0]} />
                    </div>
                </div>
            </section>
        </Suspense>
    );
};
