const escapeHTML = require('../config/safeEmail');

export const generatePostPublishedEmail = (username, postTitle, postLink) => {
  const safeUsername = escapeHTML(username);
  const safePostTitle = escapeHTML(postTitle);
  const safePostLink = encodeURI(postLink);

  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>New Blog Post Published - Blogify</title>
  </head>
  <body style="background-color:#f9fafb; font-family: 'Inter', sans-serif; padding: 2rem;">
    <div style="max-width: 600px; margin: auto; background-color: white; border-radius: 0.75rem; padding: 2rem; border: 1px solid #e5e7eb;">
      <h1 style="font-size: 1.875rem; font-weight: bold; color: #111827; text-align: center; margin-bottom: 1rem;">
        New Blog Post Published 🎉
      </h1>
      <p style="font-size: 1rem; color: #374151;">
        Hi <strong>${safeUsername}</strong>,
      </p>
      <p style="font-size: 1rem; color: #374151; margin-top: 0.5rem;">
        Your new blog post <strong>"${safePostTitle}"</strong> is now live on <strong>Blogify</strong>!  
        Share it with your readers and let the world know your thoughts.
      </p>
      <a href="${safePostLink}" 
         style="display: inline-block; background-color: #3b82f6; color: white; font-weight: 600; padding: 0.75rem 1.5rem; border-radius: 0.5rem; text-decoration: none; margin-top: 1rem;">
        View Post
      </a>
      <p style="font-size: 0.875rem; color: #6b7280; margin-top: 1.5rem;">
        Thank you for sharing your ideas with Blogify.
      </p>
    </div>
  </body>
  </html>
  `;
};