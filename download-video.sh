#!/bin/bash

# Create videos directory if it doesn't exist
mkdir -p public/videos

# Download the video
curl -L "https://assets.mixkit.co/videos/preview/mixkit-times-square-at-night-4315-large.mp4" -o "public/videos/nyc-night.mp4"
