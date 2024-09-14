import { Component } from "solid-js";
import { Scene, loading } from "./Scene";
import { Euler, Vector3 } from "three";

import model from "../../assets/planet.glb";

export const isLoading = loading;

export const Planet: Component = () => {
    return (
        <Scene
            model={model}
            delta={0.005}
            scale={new Vector3(0.03, 0.03, 0.03)}
            position={new Vector3(2, 1, 0)}
            rotation={new Euler(0.4, -2.5, 0)}
        />
    );
};