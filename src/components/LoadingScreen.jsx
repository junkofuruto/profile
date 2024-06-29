import { createSignal, createEffect, onCleanup } from "solid-js";
import { twMerge } from "tailwind-merge";

const LoadingScreenContainer = (props) => {
    const [visible, setVisible] = createSignal(true);

    setTimeout(() => setVisible(false), props.delay * 100 + 200);

    return (
        <div class={twMerge("bg-gradient-to-r from-bg-loading-edge via-bg-loading-center to-bg-loading-edge w-screen h-screen content-center", visible() ? "opacity-100" : "duration-300 opacity-0")}>
            <div class="flex justify-center">
                {props.children}
            </div>
        </div>
    );
};

const TypeWriter = (props) => {
    const [displayText, setDisplayText] = createSignal("");

    createEffect(() => {
        let index = 0;
        const typeWriterInterval = setInterval(() => {
            if (index < props.text.length) {
                setDisplayText((prev) => props.text.substring(0, index + 1));
                index++;
            } else {
                clearInterval(typeWriterInterval);
            }
        }, props.delay);

        onCleanup(() => clearInterval(typeWriterInterval));
    });

    return <div class="font-['VT323'] text-[#fff] text-[17px] select-none flex-1">{displayText()}</div>;
};

const LoadingScreenBarSquare = () => <div class="w-[15px] bg-[#fff] mt-[3px] ml-[3px] mb-[3px]" />;

const LoadingScreenBar = (props) => {
    const [squares, setSquares] = createSignal([]);

    createEffect(() => {
        const barInterval = setInterval(() => {
            setSquares((prev) => {
                if (prev.length < props.count) {
                    return [...prev, <LoadingScreenBarSquare />];
                } else {
                    clearInterval(barInterval);
                    return prev;
                }
            });
        }, 100);

        onCleanup(() => clearInterval(barInterval));
    });

    return <div class="w-[493px] h-[30px] border-[2px] border-[#fff] flex justify-start">{squares()}</div>;
};

const LoadingScreenPercent = (props) => {
    const [percent, setPercent] = createSignal(0);

    createEffect(() => {
        let percentValue = 0;
        const percentInterval = setInterval(() => {
            if (percentValue <= 100) {
                setPercent(percentValue++); // Increment should be postfix
            }
        }, props.delay);

        onCleanup(() => clearInterval(percentInterval));
    });

    return <div class="font-['VT323'] text-[#fff] text-[17px] select-none text-right">{percent()}%</div>;
};

export const LoadingScreen = (props) => {
    const delay = 27;
    return (
        <LoadingScreenContainer delay={delay}>
            <div>
                <div class="flex">
                    <TypeWriter text={"Loading construct media components..."} delay={delay} />
                    <LoadingScreenPercent delay={delay} />
                </div>
                <LoadingScreenBar count={delay} />
            </div>
        </LoadingScreenContainer>
    );
};