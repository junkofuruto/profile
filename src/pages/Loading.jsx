import { LoadingScreen } from "../components/LoadingScreen";
import { createSignal } from "solid-js";

export const Loading = () => {
    const [loadingScreenVisibile, setLoadingScreenVisibility] = createSignal(true);

    return (
        <LoadingScreen visibility={loadingScreenVisibile} />
    )
}