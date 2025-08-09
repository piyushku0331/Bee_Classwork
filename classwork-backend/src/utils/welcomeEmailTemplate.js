const escapeHTML = require('../config/safeEmail');

export const generateWelcomeEmail = (username) => {
    const safeUsername = escapeHTML(username);
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Welcome to Blogify</title>
  </head>
  <body style="margin:0; padding:0; font-family: 'Segoe UI', Tahoma, sans-serif; background-color: #f9fafb; color: #111827;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 0.5rem; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
      
      <!-- Header -->
      <div style="background-color: #3b82f6; padding: 1.5rem; text-align: center;">
        <h1 style="color: white; font-size: 1.75rem; font-weight: bold; margin: 0;">Welcome to Blogify 🚀</h1>
      </div>

      <!-- Body -->
      <div style="padding: 1.5rem;">
        <p style="font-size: 1rem; margin-bottom: 1rem;">
          Hi <strong>${safeUsername}</strong>,
        </p>
        <p style="font-size: 1rem; margin-bottom: 1rem;">
          We’re excited to have you on board! 🎉 Blogify is your space to share stories, discover ideas, and connect with amazing writers from all around the world.
        </p>
        <p style="font-size: 1rem; margin-bottom: 1.5rem;">
          Start your journey today and let your voice be heard. Here’s to creating something amazing together!
        </p>

        <!-- Call to Action Button -->
        <div style="text-align: center;">
          <a href="https://yourblogifywebsite.com" 
             style="background-color: #3b82f6; color: white; padding: 0.75rem 1.5rem; font-size: 1rem; font-weight: 500; text-decoration: none; border-radius: 0.375rem; display: inline-block;">
            Visit Blogify
          </a>
        </div>
      </div>

      <!-- Footer -->
      <div style="background-color: #f3f4f6; padding: 1rem; text-align: center; font-size: 0.875rem; color: #6b7280;">
        <p style="margin: 0;">&copy; ${new Date().getFullYear()} Blogify. All rights reserved.</p>
      </div>
    </div>
  </body>
  </html>
  `;
};