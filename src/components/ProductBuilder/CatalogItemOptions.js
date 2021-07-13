// Module imports
import { useCallback } from 'react'





// Local imports
import { CatalogItemColor } from 'components/ProductBuilder/CatalogItemColor'
import { CatalogItemSize } from 'components/ProductBuilder/CatalogItemSize'





export function CatalogItemOptions(props) {
	const {
		options,
		sizes,
	} = props

	const mapProductOptions = useCallback(option => {
		switch (option.type) {
			case 'multi_select':
				if (option.id.includes('colors')) {
					return (
						<CatalogItemColor
							key={option.id}
							option={option} />
					)
				}
				break

			case 'text':
				return null

			default:
				console.warn(`Unrecognized product option type:`, option.type)
				return null
		}
	}, [options])

	// console.log(options)

	return (
		<>
			{Boolean(sizes) && (
				<CatalogItemSize sizes={sizes} />
			)}
			{options.map(mapProductOptions)}
		</>
	)
}
