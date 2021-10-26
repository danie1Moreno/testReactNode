import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useToken } from "../auth/useToken";
import { useUser } from "../auth/useUser";
import { FGames } from "../components/Fgames";
import { FStreamers } from "../components/FStreamers";
import styles from "./UserInfoPage.module.css";

export const UserFavorites = () => {
  const user = useUser();
  const [token, setToken] = useToken();
  const [favGames, setfavGames] = useState(null);
  const [favStreamers, setfavStreamers] = useState(null);
  const history = useHistory();

  useEffect(() => {
    const data = async () => {
      const responseG = await axios.get(
        `http://localhost:5000/favorites?userid=${user.id}`,
        {
          headers: { "x-access-token": token },
        }
      );
      const { dataG, dataS } = responseG.data;
      setfavGames(dataG);
      setfavStreamers(dataS);
    };
    data();
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
                <a href="/games" onClick={() => history.push("/games")}>
                  Games
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
              <h2>Streamers</h2>

              <table>
                <thead>
                  <tr>
                    <th>Nombre Streamer</th>
                    <th>Idioma</th>
                    <th>Juegos</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody className={styles.table}>
                  {favStreamers &&
                    favStreamers.map((el) => (
                      <FStreamers
                        key={el.id}
                        el={el}
                        user={user}
                        token={token}
                        setfavStreamers={setfavStreamers}
                      />
                    ))}
                </tbody>
              </table>
            </div>
            <div>
              <h2>Games</h2>

              <ul className={styles.nestedgridG}>
                {favGames &&
                  favGames.map((el) => (
                    <FGames
                      key={el.id}
                      el={el}
                      user={user}
                      token={token}
                      setfavGames={setfavGames}
                    />
                  ))}
              </ul>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};
