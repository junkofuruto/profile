import "solid-js";

declare global {
    namespace JSX {
        interface IntrinsicElements {
            div: any;
            a: any;
        }
    }
}