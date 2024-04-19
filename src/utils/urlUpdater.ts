import { getUrl } from '@/services/storage';
import { Post } from '@/models/dbShema';

export const updatePhotoUrls = async (posts:typeof Post[]) => {


  const updated = await Promise.all(posts.map(async (post: typeof Post) => {
    // Call getUrl function to get the URL
    const photoUrl = await getUrl(post.photoKey);
    const updatedUser = { ...post.user.toObject(), password: undefined };
    // Create a new post object with updated user and photoUrl
    return { ...post.toObject(), user: updatedUser, photoUrl };
  }));
  console.log("All photoUrls updated successfully!");
  return updated;
};
