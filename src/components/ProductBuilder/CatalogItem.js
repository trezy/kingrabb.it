// Local imports
import { CatalogItemOptions } from 'components/ProductBuilder/CatalogItemOptions'





export function CatalogItem(props) {
	const { product } = props

	console.log({product})

	return (
		<li key={product.id}>
			<header>{product.model}</header>

			<img src={product.image} />

			<CatalogItemOptions
				options={product.options}
				sizes={product.dimensions} />

			{/* <pre>{JSON.stringify(product.options, null, 2)}</pre> */}

			{/* <details>
				<pre>{JSON.stringify(product, null, 2)}</pre>
			</details> */}
		</li>
	)
}
