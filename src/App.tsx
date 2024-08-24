export const App = (props) => {
	return (
		<div class="relative">
			<main class="w-screen h-screen">
				{props.children}
			</main>
		</div>
	)
}