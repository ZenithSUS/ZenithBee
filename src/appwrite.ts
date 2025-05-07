import { Client, Account, Storage, Databases } from "appwrite";

export const ENDPOINT = import.meta.env.VITE_ENDPOINT;
export const PROJECT_ID = import.meta.env.VITE_PROJECT_ID;
export const API_URL = import.meta.env.VITE_API_URL;
export const BUCKET_ID = import.meta.env.VITE_BUCKET_ID;
export const DATABASE_ID = import.meta.env.VITE_DATABASE_ID;
export const USER_ID = import.meta.env.VITE_USER_ID;

const client = new Client();
client.setEndpoint(ENDPOINT).setProject(PROJECT_ID);

export const account = new Account(client);
export const storage = new Storage(client);
export const databases = new Databases(client);
