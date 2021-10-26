import { useState, useEffect } from "react";
import { useToken } from "../auth/useToken";
import { useUser } from "../auth/useUser";
import axios from "axios";
import { Streamers } from "../components/Streamers";
import { useHistory } from "react-router-dom";
import styles from "./ManyStreamers.module.css";

export const ManyStreamers = () => {
  const user = useUser();
  const [token, setToken] = useToken();
  const [topStreamers, setTopStreamers] = useState(null);
  const history = useHistory();

  useEffect(() => {
    const dataS = async () => {
      const responseS = await axios.post(
        "http://localhost:5000/twitchstreamers/many"
      );
      const { data } = responseS.data;
      setTopStreamers(data);
    };

    dataS();
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
                <a href="/games" onClick={() => history.push("/games")}>
                  Games
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
              <h2> Streamers</h2>

              <ul className={styles.nestedgridS}>
                {topStreamers &&
                  topStreamers.map((el) => (
                    <Streamers key={el.id} el={el} user={user} token={token} />
                  ))}
              </ul>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};
