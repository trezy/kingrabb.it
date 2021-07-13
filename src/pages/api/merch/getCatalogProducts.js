// Local imports
import { createEndpoint } from 'helpers/createEndpoint'
import * as Printful from 'services/Printful'
import httpStatus from 'helpers/httpStatus'





export const handler = async (request, response) => {
	const productsResponseJSON = await Printful.getCatalogProducts()

	response.status(httpStatus.OK).json(productsResponseJSON)
}





export default createEndpoint({
	allowedMethods: ['get'],
	handler,
})
