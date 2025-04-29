import { Client, Account, Storage } from "appwrite";

const ENDPOINT = import.meta.env.VITE_ENDPOINT;
const PROJECT_ID = import.meta.env.VITE_PROJECT_ID;

export const API_URL = import.meta.env.VITE_API_URL;
export const BUCKET_ID = import.meta.env.VITE_BUCKET_ID;

const client = new Client();
client.setEndpoint(ENDPOINT).setProject(PROJECT_ID);

export const account = new Account(client);
export const storage = new Storage(client);
