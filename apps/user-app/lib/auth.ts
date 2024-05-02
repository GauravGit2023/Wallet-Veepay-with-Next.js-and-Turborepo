import bcrypt from "bcrypt";
import db from "@repo/db/client"
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                phone: { label: "Phone number", type: "text", placeholder: "1234567890" },
                password: { label: "Password", type: "password" }
            },

            // TODO: User credentials type from next-aut
            async authorize(credentials: any){
                // Do zod validation, OTP validation here
                const hashedPassword = await bcrypt.hash(credentials.password, 10);
                const existingUser: any = await db.user.findFirst({
                    where: {
                        number: credentials.phone
                    }
                });

                if(existingUser){
                    const passwordValidation = await bcrypt.compare(credentials.password, existingUser.password);
                    
                    if(passwordValidation){
                        return {
                            id: existingUser.id,
                            email: existingUser.email, // harkirat used existingUser.number in case of email
                            name: existingUser.name
                        }
                    }
                    return null;
                }

                try {
                    const user = await db.user.create({
                        data: {
                            number: credentials.phone,
                            password: hashedPassword
                        }
                    });

                    return {
                        id: user.id.toString(),
                        email: user.email, // harkirat used existingUser.number in case of email
                        name: user.name
                    }
                } catch(e){
                    console.error(e);
                }
                return null;
            },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || ""
        })
    ],
    secret: process.env.JWT_SECRET || "secret",
    callbacks: {
        async session({ token, session }: any){
            session.user.id = token.sub

            return session
        }
    }
}