import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { admin } from "better-auth/plugins";

const client = new MongoClient(process.env.MONGODB_URI || "mongodb://localhost:27017/database");
const db = client.db(process.env.AUTH_DB_NAME || "database");

export const auth = betterAuth({
  emailAndPassword: { 
    enabled: true, 
  }, 

  database: mongodbAdapter(db, {
    client
  }),

  plugins: [
    admin({

      roles: ["user", "admin"], 
    })
  ],

  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
        defaultValue: "user"
      }
    }
  }
});