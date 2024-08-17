// app/routes/auth/google.tsx
import {ActionFunctionArgs, LoaderFunctionArgs, redirect} from '@remix-run/node'
import { authenticator } from '~/services/auth.server'


export async function loader({request}: LoaderFunctionArgs) {
	return authenticator.authenticate('google', request)
}

// export const action = ({ request }: ActionFunctionArgs) => {
// 	return authenticator.authenticate('google', request)
// }