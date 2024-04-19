import { getUrl } from '@/services/storage';
import { Post, PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export const updatePhotoUrls = async (updatePhoto: Post[]) => {
  const allPosts = updatePhoto;

  // Iterate through each post
  for (const post of allPosts) {
    // Generate the URL using getUrl function
    const photoUrl = await getUrl(post.photoKey);
    // Update the photoUrl field of the post
    await prisma.post.update({
      where: { id: post.id },
      data: { photoUrl: photoUrl },
    });
  }

  console.log('All photoUrls updated successfully!');
};
