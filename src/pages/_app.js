// Style imports
import 'scss/reset.scss'
import 'scss/lib.scss'
import 'scss/app.scss'





// Local imports
import { ApplicationFooter } from 'components/ApplicationFooter'
import { ApplicationHeader } from 'components/ApplicationHeader'
// import { FirestoreContextProvider } from 'contexts/Firestore'
// import {
// 	useApplicationBackground,
// 	useFirebaseWorker,
// } from 'hooks'





export default function App(props) {
	const {
		Component,
		pageProps,
	} = props

  return (
		<div
			data-theme="mystic"
			id="application-wrapper">
			<ApplicationHeader></ApplicationHeader>

			<main>
				<Component {...pageProps} />
			</main>

			<ApplicationFooter></ApplicationFooter>
		</div>
	)
}
