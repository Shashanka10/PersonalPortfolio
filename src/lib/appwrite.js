import { Client, Databases, Storage, Query } from "appwrite";

const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);

export const databases = new Databases(client);
export const storage = new Storage(client);

export const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
export const COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID;
export const BUCKET_ID = process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID;
export const ENDPOINT = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
export const PROJECT_ID = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;

/* Fetch all gallery documents ordered by section order */
export async function getGalleryDocs() {
  const res = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [
    Query.orderAsc("order"),
    Query.limit(500),
  ]);
  return res.documents;
}

/* Get public image URL from Appwrite Storage */
export function getImageUrl(fileId) {
  return `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${fileId}/view?project=${PROJECT_ID}`;
}