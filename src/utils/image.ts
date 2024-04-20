import { getUrl } from '@/services/storage';
import { Post } from '@/models/dbShema';
import HttpException from '@/exceptions/httpException';
import { HttpClientError } from '@/enums/http';

export const updatePhotoUrls = async (posts: (typeof Post)[]) => {
  const updated = await Promise.all(
    posts.map(async (post: typeof Post) => {
      // Call getUrl function to get the URL
      const photoUrl = await getUrl(post.photoKey);
      const updatedUser = { ...post.user.toObject(), password: undefined };
      // Create a new post object with updated user and photoUrl
      return { ...post.toObject(), user: updatedUser, photoUrl };
    }),
  );
  console.log('All photoUrls updated successfully!');
  return updated;
};
export function extractDataAndMimeType(base64Image: string): string[] {
  const regex: RegExp = /^data:(image\/\w+);base64,/; // Regular expression to match the MIME type
  const match: RegExpMatchArray | null = base64Image.match(regex); // Match the regular expression against the base64 image string
  const base64Data: string = base64Image.replace(/^data:image\/\w+;base64,/, '');
  if (match && match[1]) {
    return [base64Data, match[1]]; // Return the captured MIME type
  } else {
    throw new HttpException("base64image didn't match image type", HttpClientError.BadRequest);
  }
}
