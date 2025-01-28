# Streaming Platform Boilerplate

A modern, customizable streaming platform template built with Next.js, Tailwind CSS, and Radix UI.

## Features

- 🎨 Fully customizable branding
- 🔒 Authentication system
- 🎬 Content browsing
- 📱 Responsive design
- 🎯 Modern UI components

## Customization

### Environment Variables

Create a `.env.local` file based on `.env.example` and customize:

```env
NEXT_PUBLIC_PLATFORM_NAME="Your Platform Name"
NEXT_PUBLIC_BRAND_COLOR="emerald" # Any Tailwind color
NEXT_PUBLIC_HERO_TITLE="Your Custom Hero Title"
NEXT_PUBLIC_HERO_SUBTITLE="Your Custom Hero Subtitle"
```

### Branding Colors

The default theme uses emerald, but you can change it to any Tailwind color by updating `NEXT_PUBLIC_BRAND_COLOR`.

Available colors:
- emerald
- blue
- red
- purple
- amber
- etc.

### Content

Update the featured and trending content in `app/browse/page.tsx` to match your platform's needs.

## Getting Started

1. Clone the repository
2. Copy `.env.example` to `.env.local` and customize variables
3. Install dependencies: `npm install`
4. Run development server: `npm run dev`

## Deployment

Build for production:

```bash
npm run build
```

## License

MIT