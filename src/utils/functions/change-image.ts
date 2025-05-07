import {
  BUCKET_ID,
  DATABASE_ID,
  USER_ID,
  storage,
  account,
  databases,
  ENDPOINT as endpointUrl,
  PROJECT_ID as projectId,
} from "../../appwrite";
import { ID, Permission, Role } from "appwrite";
import { v4 as uuidv4 } from "uuid";

export default async function changeImage(userId: string, image: File) {
  try {
    const profile = await account.getPrefs();

    if (profile.imageUrl !== "N/A" && profile.imageId !== "N/A") {
      await storage.deleteFile(BUCKET_ID, profile.imageId);
    }

    const newImage = new File([image], `zenithbee_profile_${uuidv4()}.jpeg`, {
      type: "image/jpeg",
    });

    const uploadedFile = await storage.createFile(
      BUCKET_ID,
      ID.unique(),
      newImage,
      [Permission.read(Role.any()), Permission.write(Role.user(userId))],
    );

    const imageUrl = `${endpointUrl}/storage/buckets/${uploadedFile.bucketId}/files/${uploadedFile.$id}/view?project=${projectId}&mode=admin`;

    await account.updatePrefs({ imageUrl, imageId: uploadedFile.$id });
    await databases.updateDocument(DATABASE_ID, USER_ID, userId, {
      profileImage: imageUrl,
      profileId: uploadedFile.$id,
    });

    localStorage.setItem("profileId", uploadedFile.$id);
    localStorage.setItem("profileImage", imageUrl);
    return window.location.reload();
  } catch (error) {
    console.error("Error Updating User Image:", error);
  }
}
