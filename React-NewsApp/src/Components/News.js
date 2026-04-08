import React, { Component } from 'react';
import NewItems from './NewItems';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from './Spinner.js';
export default class News extends Component {
  static defaultProps = {
    country: 'us',
    pageSize: 8,
    category: 'general'
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  };

  capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0
    };
    document.title = `${this.capitalize(this.props.category)} - NewsMonkey`;
  }

  componentDidMount() {
    this.fetchNews();
  }

  fetchNews = async (page = 1) => {
    try {
      this.props.setProgress(5);
      this.setState({ loading: true });
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${page}&pageSize=${this.props.pageSize}`;
      this.props.setProgress(30); 
      let data = await fetch(url);
      this.props.setProgress(70);
      let parseData = await data.json();
      this.props.setProgress(100);

      this.setState({
        articles: parseData.articles,
        totalResults: parseData.totalResults,
        page: page,
        loading: false
      });
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };

  fetchMoreData = async () => {
    if (this.state.articles.length >= this.state.totalResults) return;

    try {       
      let nextPage = this.state.page + 1;
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${nextPage}&pageSize=${this.props.pageSize}`; 
      let data = await fetch(url);
      let parseData = await data.json();
    
      this.setState((prevState) => ({
        articles: [...prevState.articles, ...parseData.articles],
        page: nextPage,
      }));
    } catch (error) {
      console.error("Error fetching more news:", error);
    }
  };

  render() {
    return (
      <>
        <h2 className='text-center' style={{ padding: '20px' }}>
          NewsMonkey - Top {this.capitalize(this.props.category)} Headlines
        </h2>
        {this.state.loading && <Spinner/>}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>} 
          scrollThreshold={0.95}  // Load more when scrolling near bottom
        >       
          <div className="container">
          <div className="row"> {/* Bootstrap Grid for 3 cards per row */}
            {this.state.articles.map((element) => (
              <div className="col-md-4 mb-4" key={element.url}>
                <NewItems
                  title={element.title ? element.title : "No Title"}
                  description={element.description ? element.description : "No Description Available"}
                  imageUrl={element.urlToImage}
                  newsUrl={element.url}
                  author={element.author ? element.author : "Unknown"}
                  date={element.publishedAt}
                  source={element.source.name}
                />
              </div>
            ))}
           </div>
          </div>
        </InfiniteScroll>

                {/* <div className="d-flex justify-content-between my-3">
          <button 
            disabled={this.state.page === 1} 
            className="btn btn-dark" 
            onClick={this.handlePrevClick}
          >                                 We remove button because we use infinte scroll bar
            &larr; Previous
          </button>
          <button 
            disabled={this.state.page + 1 > Math.ceil(this.state.totalResults /this.props.pageSize)} 
            className="btn btn-dark" 
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div> */}
      </>
    );
  }
}

