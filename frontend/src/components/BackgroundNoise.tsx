import { createSignal, onMount, onCleanup, Component } from 'solid-js';
import { createNoise3D } from 'simplex-noise';
import createRAF from "@solid-primitives/raf";
import { twMerge } from 'tailwind-merge';

interface BackgroundNoiseParams {
    blur: number;
    width?: number;
    height?: number;
    speed: number;
    scale: number;
    dotSize: number;
    gap: number;
    hueBase: number;
    hueRange: number;
    style?: string;
}

export const BackgroundNoise = (props: BackgroundNoiseParams) => {
    const [canvasRef, setCanvasRef] = createSignal<HTMLCanvasElement | null>(null);
    const noise = createNoise3D();
    const style = props.style === undefined ? "" : props.style;

    onMount(() => {
        const canvas = canvasRef();
        if (!canvas) return;

        canvas.style.webkitFilter = `blur(${props.blur}px)`;
        const ctx = canvas.getContext('2d', { alpha: false });
        if (!ctx) return;

        let w = (ctx.canvas.width = props.width ?? window.innerWidth);
        let h = (ctx.canvas.height = props.height ?? window.innerHeight);
        const [nt, setNt] = createSignal(0);

        const resizeHandler = () => {
            w = (ctx.canvas.width = props.width ?? window.innerWidth);
            h = (ctx.canvas.height = props.height ?? window.innerHeight);
        };

        window.addEventListener('resize', resizeHandler);

        const render = () => {
            const { speed: noiseSpeed, scale: noiseScale, dotSize, gap, hueBase, hueRange } = props;

            const draw = () => {
                setNt(nt() + noiseSpeed);
                for (let x = 0; x < w; x += dotSize + gap) {
                    for (let y = 0; y < h; y += dotSize + gap) {
                        const yn = noise(y / noiseScale, x / noiseScale, nt()) * 20;
                        const cn = lerp(hueRange, yn * hueRange, 0.2);

                        ctx.fillStyle = `hsla(${hueBase + cn}, 50%, 50%, ${yn})`;
                        ctx.fillRect(x, y, dotSize, dotSize);
                    }
                }
            };

            const clear = () => {
                ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
                ctx.fillRect(0, 0, w, h);
            };

            const lerp = (x1: number, x2: number, n: number): number => {
                return (1 - n) * x1 + n * x2;
            };

            clear();
            draw();
        };

        const [_, start, stop] = createRAF(() => render());
        start();

        onCleanup(() => {
            window.removeEventListener('resize', resizeHandler);
            stop();
        });
    });

    return <canvas ref={setCanvasRef} class={twMerge(style)} />;
};
