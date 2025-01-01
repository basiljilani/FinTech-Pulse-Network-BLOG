import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-article-bg flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-article-heading mb-4">404</h1>
        <h2 className="text-2xl text-article-text mb-6">Page Not Found</h2>
        <p className="text-article-text mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-block bg-article-highlight text-article-text px-6 py-3 rounded-lg hover:bg-opacity-80 transition-colors"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
