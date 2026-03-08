import { Client } from "@hashgraph/sdk";
import dotenv from "dotenv";

dotenv.config();

export const client = Client.forTestnet();
client.setOperator(process.env.ACCOUNT_ID, process.env.PRIVATE_KEY);