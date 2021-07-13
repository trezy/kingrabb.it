export default function StorePage(props) {
	const { products } = props

	console.log(products)

	return (
		<div>Store!</div>
	)
}

export async function getStaticProps(context) {
	const {
		params,
		preview,
		previewData,
		locale,
		locales,
		defaultLocale,
	} = context
	const Printful = await import('services/Printful')

	const productsResponseJSON = await Printful.getProducts()

	const products = await Promise.all(productsResponseJSON.result.map(async product => {
		const { result } = await Printful.getProduct({ productID: product.id })

		return result
	}))

	return {
		props: { products },
		revalidate: 60 /* seconds */ * 60 /* minutes */,
	}
}
