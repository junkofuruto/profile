import { Component } from "solid-js";
import { Scene } from "./Scene";
import { Euler, Vector3 } from "three";

export const Planet: Component = () => {
    return (
        <Scene
            model="src/assets/h_planet.glb"
            delta={0.005}
            scale={new Vector3(0.03, 0.03, 0.03)}
            postion={new Vector3(2, 1, 0)}
            rotation={new Euler(0.4, -2.5, 0)}
            style="h-[700px] w-[700px]"
        />
    );
};