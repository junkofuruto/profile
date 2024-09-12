import { Header } from "./components/Header"

export const App = (props: any) => {
	return (
		<div class="relative">
			<div class="w-screen h-screen">
				{props.children}
			</div>
		</div>
	)
}