//schema
// const loginUserSchema = z.object({
//   username: z.string(),
//   password: z.string(),
// });

// const createUserSchema = loginUserSchema.extend({
//   email: z.string(),
// });

// const createPostSchema = z.object({
//   topicName: z.string(),
//   tags: z
//     .object({
//       name: z.string(),
//       score: z.union([z.number(), z.string()]),
//     })
//     .array(),
//   description: z.string(),
//   file: z.string().startsWith('image/', { message: 'Must provide image file' }),
// });

// //function
// export const createUserCheck = (username: unknown, password: unknown, email: unknown) => {
//   const result = createUserSchema.safeParse({
//     username: username,
//     password: password,
//     email: email,
//   });
//   if (!result.success) {
//     throw new HttpException(result.error.flatten().fieldErrors as string, HttpClientError.BadRequest);
//   }
// };
// export const loginUserCheck = (username: unknown, password: unknown) => {
//   const result = loginUserSchema.safeParse({
//     username: username,
//     password: password,
//   });
//   if (!result.success) {
//     throw new HttpException(result.error.flatten().fieldErrors as string, HttpClientError.BadRequest);
//   }
// };

// export const createPostCheck = (topicName: unknown, tags: unknown, description: unknown, mimeType: unknown) => {
//   const result = createPostSchema.safeParse({
//     topicName: topicName,
//     tags: tags,
//     description: description,
//     file: mimeType,
//   });
//   if (!result.success) {
//     throw new HttpException(result.error.flatten().fieldErrors as string, HttpClientError.BadRequest);
//   }
// };

export const parseIntPlus = (data: unknown) => {
  let result: number;
  if (typeof data === 'string') {
    result = parseInt(data);
  } else {
    result = data as number;
  }
  return result;
};
