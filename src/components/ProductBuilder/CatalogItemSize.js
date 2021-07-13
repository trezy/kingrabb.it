// Module imports
import { useCallback } from 'react'





export function CatalogItemSize(props) {
	const { sizes } = props

	const mapSizes = useCallback(label => {
		return (
			<li key={label}>
				<button>
					{label}
				</button>
			</li>
		)
	}, [sizes])

	// console.log({sizes})
	return (
		<div>
			<ul className="size-list">
				{Object.keys(sizes).map(mapSizes)}
			</ul>
		</div>
	)
}
