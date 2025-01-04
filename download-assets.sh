#!/bin/bash

# Create videos directory if it doesn't exist
mkdir -p public/videos

# Download the video
curl -L "https://elements.envato.com/fintech-digital-technology-background-loop-PNRW6YH.mp4" -o "public/videos/hero-background.mp4"

# Make the script executable
chmod +x download-assets.sh
