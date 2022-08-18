import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
import { useParams } from "react-router-dom";
import ReactPlaceholder from "react-placeholder";
import "react-placeholder/lib/reactPlaceholder.css";

// make page layout like masonary
// horizontal bar problem

/*used params and useNavigate for implementing search box navigation*/

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [ready, setReady] = useState(false);
  let { id } = useParams();
  const capitalizefirstchar = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const updateNews = async () => {
    setReady(false);
    if (id) {
      const apiurl = `https://newsapi.org/v2/everything?q=${id}&sortBy=popularity&apiKey=${process.env.REACT_APP_NEWS_API_KEY}`;
      setLoading(true);
      let data = await fetch(apiurl);
      let parsedData = await data.json();
      setArticles(parsedData.articles);
      setTotalResults(parsedData.totalResults);
      setLoading(false);
      setReady(true);
    } else {
      const apiurl = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}`;
      setLoading(true);
      let data = await fetch(apiurl);

      let parsedData = await data.json();

      setArticles(parsedData.articles);
      setTotalResults(parsedData.totalResults);
      setLoading(false);
      setReady(true);
    }
  };

  useEffect(() => {
    updateNews();
    document.title = `${
      props.category === "general"
        ? "Home"
        : capitalizefirstchar(props.category)
    } - NewsBird`;
  }, [id]);

  const fetchMoreArticles = async () => {
    setLoading(true);
    if (id) {
      const apiurl = `https://newsapi.org/v2/everything?q=${id}&sortBy=popularity&apiKey=${
        props.apiKey
      }&page=${page + 1}`;
      setPage(page + 1);
      let data = await fetch(apiurl);
      let parsedData = await data.json();
      setArticles(articles.concat(parsedData.articles));
      setTotalResults(parsedData.totalResults);
    } else {
      const apiurl = `https://newsapi.org/v2/top-headlines?country=${
        props.country
      }&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}`;
      setPage(page + 1);
      let data = await fetch(apiurl);
      let parsedData = await data.json();
      setArticles(articles.concat(parsedData.articles));
      setTotalResults(parsedData.totalResults);
    }
    setLoading(false);
  };
  let bg = `bg-${props.bg}`;
  return (
    <>
      <div className={bg}>
        {id ? (
          ready && articles.length ? (
            <h1 className="text-center pt-5 m-4">
              {capitalizefirstchar(id)} News
            </h1>
          ) : loading ? (
            <h1 className="text-center pt-5 m-4">Searching...</h1>
          ) : (
            <h1 className="text-center pt-5 m-4">No Results Found!</h1>
          )
        ) : (
          <h1 className="text-center pt-5 m-4">
            NewsBird - Top{" "}
            {props.category === "general"
              ? ""
              : capitalizefirstchar(props.category)}{" "}
            Headlines
          </h1>
        )}
        {loading && <Spinner />}
        {console.log(loading)}
        <div className="container" style={{ height: "100vh" }}>
          <ReactPlaceholder
            type="media"
            rows={22}
            ready={ready}
            showLoadingAnimation={true}
          >
            <InfiniteScroll
              dataLength={articles.length}
              next={fetchMoreArticles}
              hasMore={articles.length !== totalResults}
              loader={<Spinner />}
            >
              <div className="row">
                {articles?.map((article, index) => {
                  return (
                    <div className="col-md-4" key={index}>
                      <NewsItem
                        bg={props.bg}
                        title={article.title}
                        desc={article.description}
                        imgurl={article.urlToImage}
                        newsurl={article.url}
                        author={article.author}
                        date={article.publishedAt}
                        source={article.source.name}
                      />
                    </div>
                  );
                })}
              </div>
            </InfiniteScroll>
          </ReactPlaceholder>
        </div>
      </div>
    </>
  );
};
News.defaultProps = {
  country: "in",
  category: "general",
};
News.propTypes = {
  country: PropTypes.string,
  category: PropTypes.string,
};
export default News;
