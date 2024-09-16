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
    const clickHandler = async () => {
        const serverURL = `${window.location.protocol}//${window.location.host}`;
        const apiURL = `${serverURL}/api/contact`;
        const message = `${props.name()} requested ${props.projectType()}.\n\n"${props.description()}"\n- ${props.mail()}`;

        try {
            const response = await fetch(apiURL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    text: message
                }),
            });

            if (!response.ok) {
                alert('Network response was not ok ' + response.statusText);
            }

            const data = await response.json();
            console.log('Success!', data);
        } catch (error) {
            console.error('Error:', error);
        }
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
            <div class="fixed bottom-0 right-0 py-[20px] px-[10px]">
                <a href="https://t.me/constructmg" class="ml-[10vw]">
                    <svg fill="#ffffff" height="40px" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff">
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                        <g id="SVGRepo_iconCarrier">
                            <path d="M29.919 6.163l-4.225 19.925c-0.319 1.406-1.15 1.756-2.331 1.094l-6.438-4.744-3.106 2.988c-0.344 0.344-0.631 0.631-1.294 0.631l0.463-6.556 11.931-10.781c0.519-0.462-0.113-0.719-0.806-0.256l-14.75 9.288-6.35-1.988c-1.381-0.431-1.406-1.381 0.288-2.044l24.837-9.569c1.15-0.431 2.156 0.256 1.781 2.013z"></path>
                        </g>
                    </svg>
                </a>
            </div>
            <section id="contact" class="md:grid md:grid-cols-2 h-screen w-screen text-white font-michroma md:pt-[50px] pt-[40px]">
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
                    <div class="md:mt-[1vw] mt-[3vh] md:flex-none flex md:justify-start justify-center">
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
