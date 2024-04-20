import getUrl from '../services/r2_storage/getUrl.js';
import HttpException from '../exceptions/httpException.js';
import { HttpClientError } from '../enums/http.js';

export const updatePhotoUrls = async (posts) => {
  const updated = await Promise.all(
    posts.map(async (post) => {
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
export function extractDataAndMimeType(base64Image) {
  const regex = /^data:(image\/\w+);base64,/; // Regular expression to match the MIME type
  const match = base64Image.match(regex); // Match the regular expression against the base64 image string
  const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, '');
  if (match && match[1]) {
    return [base64Data, match[1]]; // Return the captured MIME type
  } else {
    throw new HttpException("base64image didn't match image type", HttpClientError.BadRequest);
  }
}
