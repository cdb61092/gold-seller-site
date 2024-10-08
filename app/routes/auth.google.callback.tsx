// app/routes/auth/google/callback.tsx
import { LoaderFunctionArgs } from '@remix-run/node'
import { authenticator } from '~/services/auth.server'

export const loader = ({ request }: LoaderFunctionArgs) => {
	return authenticator.authenticate('google', request, {
		successRedirect: '/',
		failureRedirect: '/login',
	})
}