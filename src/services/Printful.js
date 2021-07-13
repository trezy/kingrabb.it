function getAuthToken() {
	const API_KEY = process.env.PRINTFUL_API_KEY
	const API_KEY_BUFFER = Buffer.from(API_KEY, 'utf-8')
	return API_KEY_BUFFER.toString('base64')
}

function PrintfulFetch(route, options = {}) {
	return fetch(`https://api.printful.com/${route.replace(/^\//, '')}`, {
		...options,
		headers: {
			...options.headers,
			Authorization: `Basic ${getAuthToken()}`,
		},
	})
}

export async function getCatalogProducts() {
	const response = await PrintfulFetch('/products')

	return response.json()
}

export async function getProduct(options) {
	const { productID } = options

	const response = await PrintfulFetch(`/store/products/${productID}`)

	return response.json()
}

export async function getProducts() {
	const response = await PrintfulFetch('/store/products')

	return response.json()
}
