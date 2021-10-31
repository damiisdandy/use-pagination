import { useEffect, useState } from "react";
import logo from "./logo.svg";
import axios from "axios";
import usePagination from "./hooks/usePagination";

function App() {
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const {
    firstContentIndex,
    lastContentIndex,
    nextPage,
    prevPage,
    page,
    setPage,
    totalPages,
  } = usePagination({
    contentPerPage: 3,
    count: people.length,
  });
  useEffect(() => {
    (async () => {
      try {
        const data = await axios.get(
          "https://random-data-api.com/api/users/random_user?size=20"
        );
        setPeople(data.data);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    })();
  }, []);
  return (
    <div className="App">
      <img src={logo} alt="react logo" />
      <h1 className="title">usePagination()</h1>
      {loading ? (
        <h2>Loading...</h2>
      ) : error ? (
        <h2>Error fetching users</h2>
      ) : (
        <>
          <div className="pagination">
            <p className="text">
              {page}/{totalPages}
            </p>
            <button
              onClick={prevPage}
              className={`page ${page === 1 && "disabled"}`}
            >
              &larr;
            </button>
            {/* @ts-ignore */}
            {[...Array(totalPages).keys()].map((el) => (
              <button
                onClick={() => setPage(el + 1)}
                key={el}
                className={`page ${page === el + 1 ? "active" : ""}`}
              >
                {el + 1}
              </button>
            ))}
            <button
              onClick={nextPage}
              className={`page ${page === totalPages && "disabled"}`}
            >
              &rarr;
            </button>
          </div>
          <div className="items">
            {people
              .slice(firstContentIndex, lastContentIndex)
              .map((el: any) => (
                <div className="item" key={el.uid}>
                  <img
                    src={`https://avatars.dicebear.com/api/big-smile/${el.first_name}.svg`}
                    alt={`${el.username} profile`}
                    className="item__img"
                  />
                  <div className="item__info">
                    <p className="name">
                      {el.first_name} {el.last_name}{" "}
                      <span className="username">(@{el.username})</span>
                    </p>
                    <p className="job">{el.employment.title}</p>
                    <p
                      className={`status ${
                        el.subscription.status.toLowerCase() === "active"
                          ? "success"
                          : el.subscription.status.toLowerCase() === "blocked"
                          ? "danger"
                          : "warn"
                      }`}
                    >
                      {el.subscription.status}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
