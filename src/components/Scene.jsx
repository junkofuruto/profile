import { createSignal, onMount, onCleanup } from "solid-js";
import createRAF from "@solid-primitives/raf";
import * as THREE from "three";

const Sphere = () => {
    const geometry = new THREE.SphereGeometry(3, 32, 16);
    const material = new THREE.MeshBasicMaterial({ color: 0xFFFFFF, wireframe: false });
    const mesh = new THREE.Mesh(geometry, material);

    const animate = () => {
        mesh.rotation.y += 0.01;
        mesh.rotation.x += 0.01;
    };

    return [mesh, animate];
}

const AxesHelper = () => {
    const axesHelper = new THREE.AxesHelper(5);
    return [axesHelper, () => { }];
}

const Scene = (props) => {
    let camera, renderer, scene, controls;

    const objects = [
        Sphere(),
        // AxesHelper()
    ];

    const [rendererElement, setRendererElement] = createSignal(null);
    const [_, startAnimationFrame, stopAnimationFrame] = createRAF(() => {
        objects.forEach(el => el[1]());
        //controls.update();
        renderer.render(scene, camera);
    });

    const resizeHandler = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    const scrollHandler = () => {
        console.log(window.scrollY);
    };

    onMount(() => {
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        //controls = new OrbitControls(camera, renderer.domElement);
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.domElement.style = "absolute inset-0 z-0";
        setRendererElement(renderer.domElement);
        window.addEventListener("resize", resizeHandler);
        window.addEventListener("scroll", scrollHandler);
        startAnimationFrame();
        objects.forEach(el => scene.add(el[0]));
        camera.position.set(0, 0, 20);
    });

    onCleanup(() => {
        window.removeEventListener("resize", resizeHandler);
        stopAnimationFrame();
    });

    return (
        <>
            {rendererElement()}
        </>
    );
}