import { GoogleStrategy } from 'remix-auth-google'
import { Authenticator } from "remix-auth";
import {User} from ".prisma/client";
import { sessionStorage } from "~/services/session.server";
import db from 'app/utils/db.server';

const googleStrategy = new GoogleStrategy(
    {
        clientID: process.env.OAUTH_CLIENT_ID!,
        clientSecret: process.env.OAUTH_CLIENT_SECRET!,
        callbackURL: process.env.OAUTH_CALLBACK_URL!,
    },
    async ({ accessToken, refreshToken, extraParams, profile }) => {
        // Get the user data from your DB or API using the tokens and profile
        const email = profile.emails[0].value;

        let user = await db.user.findUnique({
            where: {
                email,
            },
        });

        if (!user) {
            user = await db.user.create({
                data: {
                    email,
                },
            });
        }

        return user;
    }
)

export const authenticator = new Authenticator<User>(sessionStorage);

authenticator.use(googleStrategy, "google");