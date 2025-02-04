# Zupdogollion AI

## Overview

Zupdogollion AI is an innovative platform that allows users to create memes effortlessly by entering text prompts. The generated memes are created using the Imgflip API and can be shared on Twitter with a specific hashtag. Users can also view, vote on, and track the most liked memes of the day on the website. The platform aims to enhance user engagement through meme creation and sharing.

## Features

- **Meme Generation**: Users can create memes by entering text prompts, which are then automatically generated using the Imgflip API.
- **Image Generation**: Users can generate images based on text prompts using the Stability AI API.
- **Social Sharing**: Memes can be shared directly on Twitter with a specific hashtag for wider visibility.
- **Voting System**: Users can vote on their favorite memes, contributing to community engagement.
- **Daily Winners**: The platform tracks votes and announces daily winners based on user participation.
- **User Profiles**: Users can create accounts to track their submitted memes and voting history.
- **Responsive Design**: Built with modern web technologies to ensure a seamless experience across devices.

## Technical Stack

- **Frontend**: Next.js for building a dynamic user interface.
- **Backend**: Flask for handling API requests and business logic.
- **Database**: PostgreSQL for storing meme data, user profiles, and voting information.
- **APIs**:
  - Imgflip API for meme generation.
  - Stability AI API for image generation.
  - Twitter API integration for sharing memes.

## Installation

### Prerequisites

- Python 3.x
- Node.js
- PostgreSQL

### Clone the Repository

```
git clone https://github.com/BitFancy/Zupdogollion-AI.git
cd Zupdogollion-AI
```

### Backend Setup

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Install required packages:
   ```
   pip install -r requirements.txt
   ```

3. Set up your database and environment variables:
   - Create a `.env` file in the backend directory and add your API keys:
     ```
     IMGFLIP_API_KEY=your_imgflip_api_key
     STABILITY_API_KEY=your_stability_api_key
     TWITTER_API_KEY=your_twitter_api_key
     ```

4. Run the Flask server:
   ```
   flask run
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd ../frontend
   ```

2. Install required packages:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

## Usage

1. Open your browser and navigate to `http://localhost:3000`.
2. Create an account or log in if you already have one.
3. Enter your text prompt in the meme generator section.
4. Share your generated meme on Twitter using the provided button.
5. Participate in voting for your favorite memes displayed on the platform.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Make your changes and commit them (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a Pull Request.

## Acknowledgments

- Thanks to Imgflip and Stability AI for their APIs that power our meme generation and image generation features.
- Special thanks to all contributors who have helped improve this project.
