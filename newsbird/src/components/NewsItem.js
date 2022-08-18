import noimage from "./noimage.png";
const NewsItem = (props) => {
  let { title, desc, imgurl, newsurl, author, date, source } = props;
  return (
    <div className="card my-3 p-4" style={{ border: "1px dotted" }}>
      {!imgurl ? (
        <img src={noimage} className="card-img-top" alt="..." />
      ) : (
        <img src={imgurl} className="card-img-top" alt="..." />
      )}
      <div className="card-body">
        <h5 className="card-title">
          {title}
          <span
            className={
              props.bg === "danger"
                ? "position-absolute top-0 translate-middle badge rounded-pill bg-success"
                : "position-absolute top-0 translate-middle badge rounded-pill bg-danger"
            }
            style={{ left: "90%", zIndex: 1 }}
          >
            {source}
          </span>
        </h5>
        <p className="card-text">{desc}</p>
        <p className="card-text">
          <small className="text-muted">
            {author ? author : "Anonymous"},{" "}
            <strong>
              {new Date(date).toLocaleTimeString(navigator.language, {
                hour: "2-digit",
                minute: "2-digit",
                day: "2-digit",
                month: "2-digit",
                year: "2-digit",
              })}
            </strong>
          </small>
        </p>
        <a
          rel="noopener noreferrer"
          href={newsurl}
          target="_blank"
          className="stretched-link"
        />
      </div>
    </div>
  );
};
export default NewsItem;
