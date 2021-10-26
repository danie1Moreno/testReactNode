import { useState, useEffect } from "react";
import axios from "axios";
import { useToken } from "../auth/useToken";
import { useUser } from "../auth/useUser";
import { Games } from "../components/Games";
import { useHistory } from "react-router-dom";
import styles from "./ManyGames.module.css";

export const ManyGames = () => {
  const user = useUser();
  const [token, setToken] = useToken();
  const [topGames, setTopGames] = useState(null);
  const history = useHistory();

  useEffect(() => {
    const dataG = async () => {
      const responseG = await axios.post(
        "http://localhost:5000/twitchgames/many"
      );
      const { data } = responseG.data;
      setTopGames(data);
    };

    dataG();
  }, []);
  const logOut = () => {
    localStorage.removeItem("token");
    history.push("/home");
  };
  return (
    <>
      <div className={styles.container}>
        <header>Twitch App</header>
        <div>
          <nav className={styles.navgrid}>
            <ul className={styles.navgrid}>
              <li>
                <a href="/" onClick={() => history.push("/")}>
                  Inicio
                </a>
              </li>
              <li>
                <a href="/streamers" onClick={() => history.push("/streamers")}>
                  streamers
                </a>
              </li>
              <li>
                <a href="/favoritos" onClick={() => history.push("/favoritos")}>
                  Favoritos
                </a>
              </li>
              <li>
                <a href="/" onClick={logOut}>
                  Logout
                </a>
              </li>
            </ul>
          </nav>
          <section className={styles.sectiongrid}>
            <div>
              <h2>Games</h2>

              <ul className={styles.nestedgridG}>
                {topGames &&
                  topGames.map((el) => (
                    <Games key={el.id} el={el} user={user} token={token} />
                  ))}
              </ul>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};
