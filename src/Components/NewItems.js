 const NewItems =(props)=> {
    let { title, description, imageUrl, newsUrl, author, date, source} = props;
    return (
      <div>
        
        <div className="card mx-3 my-3" style={{ width: "18rem" }}>
        <div style={{display: 'flex',
                    justifyContent: 'flex-end',
                    position: 'absolute',
                    right: '0px'
        }}> 
            <span className="badge rounded-pill bg-danger">{source}
            <span className="visually-hidden">unread messages</span>
            </span>
            </div>
            
          <img src={!imageUrl ? "https://i.insider.com/67afa0907bb3f854015cfcfc?width=1200&format=jpeg" : imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <p className="card-text"><small className="text-body-secondary">By {author} on {new Date(date).toGMTString()}</small></p>
            <a href={newsUrl} target='blank' className="btn btn-sm btn-dark">Read more</a>
          </div>
        </div>
      </div>
    )
}
export default NewItems;
