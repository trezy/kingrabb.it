// Module imports
import {
	useCallback,
	useEffect,
	useState,
} from 'react'





// Local imports
import { capitalizeString } from 'helpers/capitalizeString'
import { CatalogItem } from 'components/ProductBuilder/CatalogItem'





export function ProductBuilder() {
	const [productData, setProductData] = useState(null)
	const [filters, setFilters] = useState({
		brand: '',
		category: '',
		subcategory: '',
	})

	const {
		brands,
		subcategories,
	} = productData?.categoryData[filters.category] || {}

	const filterProducts = useCallback(product => {
		if (product.type !== filters.category) {
			return false
		}

		if (filters.subcategory && (product.type_name !== filters.subcategory)) {
			return false
		}

		if (filters.brand && (product.brand !== filters.brand)) {
			return false
		}

		return true
	}, [filters])

	const handleBrandSelect = useCallback(event => {
		setFilters(previousValue => ({
			...previousValue,
			brand: event.target.value,
		}))
	}, [setFilters])

	const handleCategorySelect = useCallback(event => {
		const newFilters = {
			brand: '',
			category: event.target.value,
			subcategory: '',
		}

		if (brands?.length <= 1) {
			newFilters.brand = brands[0]
		}

		if (subcategories?.length <= 1) {
			newFilters.subcategory = subcategories[0]
		}

		setFilters(newFilters)
	}, [
		productData,
		setFilters,
	])

	const handleSubcategorySelect = useCallback(event => {
		setFilters(previousValue => ({
			...previousValue,
			subcategory: event.target.value,
		}))
	}, [setFilters])

	const mapBrands = useCallback(brand => {
		return (
			<option
				key={brand}
				value={brand}>
				{brand}
			</option>
		)
	}, [])

	const mapCategories = useCallback(categoryName => {
		const friendlyCategoryName = categoryName
			.split('-')
			.map(string => capitalizeString(string.toLowerCase()))
			.join(' ')

		return (
			<option
				key={categoryName}
				value={categoryName}>
				{friendlyCategoryName}
			</option>
		)
	}, [])

	const mapProducts = useCallback(product => {
		return (
			<CatalogItem
				key={product.id}
				product={product} />
		)
	}, [])

	const mapSubcategories = useCallback(subcategoryName => {
		return (
			<option
				key={subcategoryName}
				value={subcategoryName}>
				{subcategoryName}
			</option>
		)
	}, [])

	const updateProductData = useCallback(productDataJSON => {
		const allProducts = productDataJSON.result
		const newProductData = allProducts.reduce((accumulator, product, index, array) => {
			if (!accumulator.categoryData[product.type]) {
				accumulator.categoryData[product.type] = {
					brands: new Set,
					subcategories: new Set,
				}
			}

			const category = accumulator.categoryData[product.type]

			category.brands.add(product.brand)
			category.subcategories.add(product.type_name)

			accumulator.categories.add(product.type)
			accumulator.products.push(product)

			return accumulator
		}, {
			categories: new Set,
			categoryData: {},
			products: [],
		})

		newProductData.categories = Array.from(newProductData.categories)

		Object.values(newProductData.categoryData).forEach(category => {
			category.brands = Array.from(category.brands).sort()
			category.subcategories = Array.from(category.subcategories).sort()
		})

		setProductData(newProductData)
	}, [setProductData])

	useEffect(() => {
		if (!productData) {
			fetch('/api/merch/getCatalogProducts')
				.then(response => response.json())
				.then(updateProductData)
		}
	}, [updateProductData])

	if (!productData) {
		return (
			<div>Loading...</div>
		)
	}

	const selectedProducts = productData.products.filter(filterProducts)

	return (
		<div className="product-builder">
			<section className="framed product-builder-options">
				<header>
					{'What type of product are we making?'}
				</header>

				<select
					onChange={handleCategorySelect}
					value={filters.category}>
					<option value="">
						{'Choose a category...'}
					</option>

					{productData.categories.map(mapCategories)}
				</select>

				<select
					disabled={!Boolean(filters.category) || (subcategories.length <= 1)}
					onChange={handleSubcategorySelect}
					value={filters.subcategory}>
					<option value="">
						{'Choose a subcategory...'}
					</option>

					{subcategories?.map(mapSubcategories)}
				</select>

				<select
					disabled={!Boolean(filters.category) || (brands.length <= 1)}
					onChange={handleBrandSelect}
					value={filters.brand}>
					<option value="">
						{'Choose a brand...'}
					</option>

					{brands?.map(mapBrands)}
				</select>
			</section>

			<section className="product-builder-preview">
				{Boolean(filters.category) && (
					<ul>
						{Boolean(selectedProducts.length) && selectedProducts.map(mapProducts)}
						{!selectedProducts.length && (
							<span>No products match your selected filters.</span>
						)}
					</ul>
				)}
			</section>
		</div>
	)
}
