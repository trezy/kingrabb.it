// Module imports
import { useCallback } from 'react'





export function CatalogItemColor(props) {
	const { option } = props

	const mapValues = useCallback(([value, name]) => {
		return (
			<li key={value}>
				<button style={{
					backgroundColor: value,
				}}>
					<span className="screen-reader-only">
						{name}
					</span>
				</button>
			</li>
		)
	}, [option])

	// console.log({option})
	return (
		<div>
			<header>{option.title}</header>
			<ul className="colors-list">
				{Object.entries(option.values).map(mapValues)}
			</ul>
		</div>
	)
}
