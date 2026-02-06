# How to Generate and Add Veo 3 Videos

You have requested to use **Google Veo** (or similar high-end AI video generators) for your background videos. Since I am an AI assistant coding environment, I cannot directly generate video files for you, but I have set up the infrastructure to support them perfectly.

Here is your guide to creating and adding the videos:

## 1. Plan Your Videos
You need 6 videos for the current layout:

1.  **Hero Section (`VIDEOS.hero`)**:
    *   *Prompt Idea*: "Cinematic drone shot of a misty forest at sunrise, 4k, slow smooth motion, photorealistic, luxury nature vibe."
2.  **Stats Section (`VIDEOS.stats`)**:
    *   *Prompt Idea*: "Abstract timelapse of stars moving in night sky, dark aesthetic, high contrast, 4k."
3.  **Services Section (`VIDEOS.services`)**:
    *   *Prompt Idea*: "Close up of a professional camera lens focusing, dark studio lighting, gold reflections, cinematic."
4.  **Portfolio Section (`VIDEOS.portfolio`)**:
    *   *Prompt Idea*: "Ocean waves crashing on black rocks in slow motion, moody weather, high definition."
5.  **About Section (`VIDEOS.about`)**:
    *   *Prompt Idea*: "Silhouette of a photographer walking through a landscape, soft lighting, inspirational."
6.  **Contact Section (`VIDEOS.contact`)**:
    *   *Prompt Idea*: "Aerial view of mountains, calm and serene, ending shot style."

## 2. Generate with Veo
1.  Access the Veo tool (VideoFX).
2.  Use the prompts above.
3.  Ensure you generate in **Landscape** mode (16:9).
4.  Download the videos.

## 3. Add to Website
1.  Create a folder named `public/videos` in your project.
2.  Move your generated `.mp4` files there.
3.  Update the `src/App.tsx` file:

```typescript
// src/App.tsx

const VIDEOS = {
  hero: "/videos/hero.mp4",      // Replace with your filenames
  services: "/videos/services.mp4",
  portfolio: "/videos/portfolio.mp4",
  about: "/videos/about.mp4",
  stats: "/videos/stats.mp4",
  contact: "/videos/contact.mp4"
};
```

## Tips for Luxury Feel
*   **Slow Motion**: Generate or slow down videos to be calm and not distracting.
*   **Darker Tone**: Since the text is white, darker videos work best. The code already has an overlay, but darker source footage is better.
*   **Looping**: Try to generate videos that loop well or are long enough (10-20 seconds).
