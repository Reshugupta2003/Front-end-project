import React, { useEffect, useState } from 'react';
import NewItems from './NewItems';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from './Spinner.js';

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const capitalize = (string) => {
    if (!string) return '';
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const fetchNews = async (pageNo = 1) => {
    try {
      props.setProgress(5);
      setLoading(true);
      const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${pageNo}&pageSize=${props.pageSize}`;
      props.setProgress(30);
      const data = await fetch(url);
      props.setProgress(70);
      const parseData = await data.json();
      props.setProgress(100);

      setArticles(parseData.articles);  // Convert this.setState{Articles} content into SetArticles
      setTotalResults(parseData.totalResults);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };
     
  // On the place of componenetDidMount we can use useEffect.
  useEffect(() => {
  fetchNews();         
  }, []);   // Empty dependency array means this effect runs once after the initial render, if you want to run it on every render, you can remove the array.

  const fetchMoreData = async () => {
    const nextPage = page + 1;
    setPage(nextPage);

    try {
      const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${nextPage}&pageSize=${props.pageSize}`;
      const data = await fetch(url);
      const parseData = await data.json();

      setArticles((prevArticles) => [...prevArticles, ...parseData.articles]);
    } catch (error) {
      console.error("Error fetching more news:", error);
    }
  };

  return (
    <>
      <h2 className='text-center' style={{ padding: '70px' }}>
      Deep Angle - Top {capitalize(props.category || "General")} Headlines
      </h2>   
      {loading && <Spinner/>}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length < totalResults}
        loader={<Spinner/>}
        scrollThreshold={0.95}
      >
        <div className="container">
          <div className="row">
            {articles.map((element) => (
              <div className="col-md-4 mb-4" key={element.url}>
                
                <NewItems
                  title={element.title ? element.title : "No Title"}
                  description={element.description ? element.description : "No Description Available"}
                  imageUrl={element.urlToImage}
                  newsUrl={element.url}
                  author={element.author || "Unknown"}
                  date={element.publishedAt}
                  source={element.source.name}
                />
              </div>
            ))}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
};

News.defaultProps = {
  country: 'us',
  pageSize: 8,
  category: 'general'
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
  apikey: PropTypes.string.isRequired,
  setProgress: PropTypes.func.isRequired
};

export default News;
