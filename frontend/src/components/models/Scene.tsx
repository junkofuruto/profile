import { createSignal, onMount, onCleanup } from "solid-js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { EffectComposer, RenderPass } from "postprocessing";
import * as THREE from "three";

type SceneProps = {
    position?: THREE.Vector3;
    rotation?: THREE.Euler;
    scale?: THREE.Vector3;
    model: string;
    delta: number;
};

const modelCache: Record<string, THREE.Group> = {};
export const [loading, setLoading] = createSignal(true);

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
        composer.addPass(new RenderPass(sceneInstance, cameraInstance));

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

        const loadModel = (url: string) => {
            if (modelCache[url]) {
                gltf = modelCache[url].clone();
                sceneInstance.add(gltf);
                setLoading(false);
            } else {
                const loader = new GLTFLoader();
                loader.load(
                    url,
                    (loadedGltf) => {
                        gltf = loadedGltf.scene;
                        modelCache[url] = gltf;

                        if (props.position) gltf.position.copy(props.position);
                        if (props.rotation) gltf.rotation.copy(props.rotation);
                        if (props.scale) gltf.scale.copy(props.scale);

                        sceneInstance.add(gltf);
                        mixer = new THREE.AnimationMixer(gltf);
                        loadedGltf.animations.forEach((clip) => {
                            mixer!.clipAction(clip).play();
                        });
                        setLoading(false);
                    },
                    undefined,
                    (error) => {
                        console.error("Error loading GLB model:", error);
                    }
                );
            }
        };

        loadModel(props.model);

        const animate = (deltaTime: number) => {
            requestAnimationFrame(() => animate(deltaTime));
            if (mixer) mixer.update(deltaTime);
            gltf?.rotateY(0.004);
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
            composer.dispose();
            if (gltf) sceneInstance.remove(gltf);
        });
    });

    return <div ref={containerRef!} style="position: relative; width: 100%; height: 100%;" />;
};
