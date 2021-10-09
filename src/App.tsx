import { useEffect, useState } from "react";
import logo from "./logo.svg";
import axios from "axios";

function App() {
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
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
        <h2>Error fetching data</h2>
      ) : (
        <div className="items">
          {people.map((el: any) => (
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
      )}
    </div>
  );
}

export default App;
