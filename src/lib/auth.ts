import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { admin } from "better-auth/plugins";

const client = new MongoClient(
  process.env.MONGODB_URI || "mongodb://localhost:27017/database"
);

const db = client.db(process.env.AUTH_DB_NAME || "database");

export const auth = betterAuth({
  trustedOrigins: [
    "http://localhost:3000",
    "https://scic-a3.vercel.app",
  ],

  emailAndPassword: {
    enabled: true,
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },

  database: mongodbAdapter(db, {
    client,
  }),

  user: {
    additionalFields: {
      plan: {
        type: "string",
        required: false,
        defaultValue: "free",
      },
    },
  },

  plugins: [
    admin({
      defaultRole: "user",
    }),
  ],
});