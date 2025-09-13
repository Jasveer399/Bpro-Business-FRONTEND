import { Link, useNavigate } from "react-router-dom";
import { timeAgo } from "../../../Utils/Helper";
import Loader from "../../../ui/Loader";

const LatestArticles = ({ articles, status }) => {
  const navigate = useNavigate();
  return (
    <div className="w-full md:w-1/1 md:pl-2">
      <h2 className="text-xl md:text-2xl font-bold text-indigo-800 mb-4">
        LATEST ARTICLES
      </h2>
      <ul className="space-y-4">
        {status === "loading" ? (
          <div className="flex items-center justify-center">
            <Loader />
          </div>
        ) : articles && articles.length > 0 ? (
          articles.map((article) => (
            <li key={article.id} className="flex">
              <div className="w-1 bg-secondary mr-4"></div>
              <div>
                <p className="text-gray-500 text-sm">
                  {timeAgo(article.createdAt)}
                </p>
                <p
                  onClick={() => navigate(`/BlogDetails/${article.id}`)}
                  className="text-gray-800 text-sm md:text-base cursor-pointer hover:text-primary hover:underline"
                >
                  {article.name}
                </p>
              </div>
            </li>
          ))
        ) : (
          <li className="flex justify-center items-center">
            <div>
              <p className="text-gray-800">No Articles Available</p>
            </div>
          </li>
        )}
      </ul>
      {articles && articles.length > 0 && (
        <Link
          to="/blogs"
          className="block mt-4 text-secondary font-semibold hover:underline"
        >
          Read More...
        </Link>
      )}
    </div>
  );
};

export default LatestArticles;
