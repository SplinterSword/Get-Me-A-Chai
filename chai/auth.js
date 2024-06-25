import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import mongoose from "mongoose"
import User from "./models/User"
import Payment from "./models/Payment"

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [GitHub],
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            if(account.provider == "github") {
                const client = await mongoose.connect(`mongodb://localhost:27017/chai`)
                // Check if the user already exists in the database
                const currentUser = await User.findOne({email: email})
                if (!currentUser){
                    const newUser = new User({
                        useremail: profile.email,
                        username: profile.name 
                    })
                    await newUser.save()
                }
                else{
                    user.name = currentUser.username
                }
            }
            return true;
        },
        async session({ session, user, token }) {
            const client = await mongoose.connect(`mongodb://localhost:27017/chai`)
            const dbUser = await User.findOne({email: session.user.email})
            return session
        },
      }
})