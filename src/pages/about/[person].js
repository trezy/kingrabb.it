// Module imports
import { useRouter } from 'next/router'





export default function AboutAlexPage() {
	const { query } = useRouter()

	return (
		<div>About {query.person}!</div>
	)
}
