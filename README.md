# Music Tag Manager Demo

<p style="text-align: justify;">Experience music your way with MTM. This player, powered by YouTube and YouTube Music, goes beyond the limitations of services like YouTube, YouTube Music, Spotify and SoundCloud, delivering dynamic and exceptionally customizable playlists.
</p>

**DISCLAIMER**: This is a demonstration only. Not all functionalities are enabled or available in this demo.

- [MTM Demo](https://portfolio.tvhq.dev/music-tag-manager-demo)

## Table of content

1. Installation
2. Features

## Installation

### Basic setup & fast boostrap.

This method implements `PGlite` to provide single-command application boostrap.

**Note**: The initial startup may take a while because it inserts data into the PGlite database.

```bash
# Use npm, pnmp, yarn or bun.
# Install necessary packages.
npm install

# Run the application.
npm run dev
```

### Intermediate Setup

This method requires `Postgres` to be installed locally or running in a `Docker` image. Before installing and running the app, ensure you:

#### Install Packages

```bash
# Use npm, pnpm, yarn, or bun.
# Install the necessary packages.
npm install
```

#### Define `.env` variables

Modify the values according to your preferences.

```
NUXT_POSTGRES_USER=postgres
NUXT_POSTGRES_PASSWORD=postgres
NUXT_POSTGRES_PORT=5432
NUXT_POSTGRES_HOST=127.0.0.1
NUXT_POSTGRES_DATABASE=music-tag-manager
```

#### Seed the database

Navigate to `modules/music-tag-manager/v1/database/backup/mtm-backup.sql` and run the script to seed the database.

#### Change the `DataSource` options

Navigate to `modules/music-tag-manager/v1/database/datasource.ts` and make the following changes:

```ts
// Before:
export const AppDataSourceType: PostgresType = "pglite";

// After
export const AppDataSourceType: PostgresType = "postgres";
```

#### Bootstrap application

```bash
# Run the application.
npm run dev
```

## Features

### Playback Controls

- **Video Information:** Displays video details when a video is playing or active.
- **Playback Control:** Offers controls for play, pause, resume, loop, shuffle, volume adjustment, and time seeking.

### Playlist Management

- **Dynamic Playlist Generation:** Enables the creation of playlists.

### Tag Management

- **Video Tag Display:** Shows tags associated with the currently playing or active video.
- **Tag List:** Displays a comprehensive list of all tags.

### Navigation and Organization

- **Channel Listing:** Presents a list of available channels.
- **Video Listing:** Displays a list of all videos.

### Configuration

- **Settings Panel:** Provides access to application settings.
