import { createSignal, onMount, onCleanup, type Component } from "solid-js";
import { twMerge } from "tailwind-merge";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { BloomEffect, EffectComposer, EffectPass, RenderPass } from "postprocessing"

type SceneProps = {
    postion?: THREE.Vector3,
    rotation?: THREE.Euler,
    scale?: THREE.Vector3,
    style?: string,
    model: string,
    delta: number
};

export const Scene = (props: SceneProps) => {
    let containerRef: HTMLDivElement | null = null;
    const [renderer, setRenderer] = createSignal<THREE.WebGLRenderer>();
    const [scene, setScene] = createSignal<THREE.Scene>();
    const [camera, setCamera] = createSignal<THREE.PerspectiveCamera>();
    let gltf: THREE.Group | null = null;
    let mixer: THREE.AnimationMixer | null = null;

    onMount(() => {
        const sceneInstance = new THREE.Scene();
        const cameraInstance = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const rendererInstance = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        const composer = new EffectComposer(rendererInstance);
        composer.addPass(new RenderPass(sceneInstance, cameraInstance))

        rendererInstance.setSize(window.innerWidth, window.innerHeight);
        containerRef!.appendChild(rendererInstance.domElement);

        const ambientLight = new THREE.AmbientLight(0xffffff, 1);
        sceneInstance.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(5, 5, 5).normalize();
        sceneInstance.add(directionalLight);

        setScene(sceneInstance);
        setCamera(cameraInstance);
        setRenderer(rendererInstance);

        cameraInstance.position.set(0, 1, 4);

        const loader = new GLTFLoader();
        loader.load(
            props.model,
            (loadedGltf) => {
                gltf = loadedGltf.scene;

                if (props.postion != undefined) gltf.position.set(props.postion.x, props.postion.y, props.postion.z);
                if (props.rotation != undefined) gltf.rotation.set(props.rotation.x, props.rotation.y, props.rotation.z);
                if (props.scale != undefined) gltf.scale.set(props.scale.x, props.scale.y, props.scale.z);

                sceneInstance.add(gltf);
                mixer = new THREE.AnimationMixer(gltf);
                loadedGltf.animations.forEach((clip) => {
                    mixer!.clipAction(clip).play();
                });
            },
            undefined,
            (error) => {
                console.error("Error loading GLB model:", error);
            }
        );

        const animate = (deltaTime: number) => {
            requestAnimationFrame(() => animate(deltaTime));
            if (mixer) mixer.update(deltaTime);
            composer.render();
        };

        animate(props.delta);

        const resizeHandler = () => {
            if (cameraInstance) {
                cameraInstance.aspect = window.innerWidth / window.innerHeight;
                cameraInstance.updateProjectionMatrix();
            }
            rendererInstance.setSize(window.innerWidth, window.innerHeight);
        };

        window.addEventListener("resize", resizeHandler);

        onCleanup(() => {
            window.removeEventListener("resize", resizeHandler);
            rendererInstance.dispose();
        });
    });

    return <div ref={containerRef!} style="absolute" />;

};
