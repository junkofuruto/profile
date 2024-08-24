import { Component } from "solid-js";
import { Scene } from "./Scene";
import { Euler, Vector3 } from "three";

export const Computer: Component = () => {
    return (
        <Scene
            model="src/assets/computer.glb"
            delta={0.01}
            postion={new Vector3(2, 0.1, 0)}
            rotation={new Euler(0.2, -1, 0)}
            style="absolute"
        />
    );
};