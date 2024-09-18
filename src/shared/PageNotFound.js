// PageNotFound.js
import React from 'react';

const PageNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-9xl font-bold text-red-600">404</h1>
      <p className="text-lg text-gray-600 mt-4">Sorry, the page you are looking for does not exist.</p>
    </div>
  );
};

export default PageNotFound;
