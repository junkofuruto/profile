import { onMount, createSignal, onCleanup } from 'solid-js';
import { createNoise3D } from 'simplex-noise';
import createRAF from "@solid-primitives/raf";

export const BackgroundNoise = (props) => {
    const [canvasRef, setCanvasRef] = createSignal(null);
    const noise = createNoise3D();

    onMount(() => {
        const canvas = canvasRef();
        const ctx = canvas.getContext('2d');
        let w = ctx.canvas.width = window.innerWidth;
        let h = ctx.canvas.height = window.innerHeight;
        let [nt, setNt] = createSignal(0);

        const resizeHandler = () => {
            w = ctx.canvas.width = window.innerWidth;
            h = ctx.canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', resizeHandler);

        const render = () => {
            let noiseSpeed = props.speed;
            let noiseScale = props.scale;
            let dotSize = props.dotSize;
            let gap = props.gap;
            let hueBase = 200;
            let hueRange = 60;

            const draw = () => {
                setNt(nt() + noiseSpeed);
                for (let x = 0; x < w; x += dotSize + gap) {
                    for (let y = 0; y < h; y += dotSize + gap) {
                        let yn = noise(y / noiseScale, x / noiseScale, nt()) * 20;
                        let cn = lerp(hueRange, yn * hueRange, 0.2);

                        ctx.beginPath();
                        ctx.fillStyle = `hsla(${hueBase + cn}, 50%, 50%, ${yn})`;
                        ctx.fillRect(x, y, dotSize, dotSize);
                        ctx.closePath();
                    }
                }
            };

            const clear = () => {
                ctx.fillStyle = 'rgba(0,0,0,1)';
                ctx.fillRect(0, 0, w, h);
            };

            const lerp = (x1, x2, n) => {
                return (1 - n) * x1 + n * x2;
            };

            clear();
            draw();
        };

        const [running, start, stop] = createRAF(() => render());
        start();

        onCleanup(() => {
            window.removeEventListener('resize', resizeHandler);
            stop();
        });
    });

    return (
        <canvas ref={setCanvasRef}></canvas>
    );
};