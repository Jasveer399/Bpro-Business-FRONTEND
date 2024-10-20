import React from 'react';

const LatestArticles = ({ articles }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-indigo-800 mb-4">LATEST ARTICLES</h2>
      <ul className="space-y-4">
        {articles.map((article, index) => (
          <li key={index} className="flex">
            <div className="w-1 bg-secondary mr-4"></div>
            <div>
              <p className="text-gray-500 text-sm">{article.time}</p>
              <p className="text-gray-800">{article.title}</p>
            </div>
          </li>
        ))}
      </ul>
      <a href="#" className="block mt-4 text-secondary font-semibold hover:underline">Read More...</a>
    </div>
  );
};

export default LatestArticles;