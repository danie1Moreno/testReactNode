import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useToken } from "../auth/useToken";
import { useUser } from "../auth/useUser";
import { Games } from "../components/Games";
import { Streamers } from "../components/Streamers";
import styles from "./UserInfoPage.module.css";

export const UserInfoPage = () => {
  const user = useUser();
  const [token, setToken] = useToken();
  const [topGames, setTopGames] = useState(null);
  const [topStreamers, setTopStreamers] = useState(null);
  const history = useHistory();

  useEffect(() => {
    const dataG = async () => {
      const responseG = await axios.post("http://localhost:5000/twitchgames");
      const { data } = responseG.data;
      setTopGames(data);
    };
    const dataS = async () => {
      const responseS = await axios.post(
        "http://localhost:5000/twitchstreamers"
      );
      const { data } = responseS.data;
      setTopStreamers(data);
    };
    dataG();
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
              <h2>Top Streamers</h2>

              <ul className={styles.nestedgridS}>
                {topStreamers &&
                  topStreamers.map((el) => (
                    <Streamers key={el.id} el={el} user={user} token={token} />
                  ))}
              </ul>
            </div>
            <div>
              <h2>Top Games</h2>

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

      {/* <h1>Info for {email}</h1>
            {showSuccessMessage && <div className="success">Successfully saved user data!</div>}
            {showErrorMessage && <div className="fail">Uh oh... something went wrong and we couldn't save changes</div>}
            <label>
                Favorite Food:
                <input
                    onChange={e => setFavoriteFood(e.target.value)}
                    value={favoriteFood} />
            </label>
            <label>
                Hair Color:
                <input
                    onChange={e => setHairColor(e.target.value)}
                    value={hairColor} />
            </label>
            <label>
                Bio:
                <input
                    onChange={e => setBio(e.target.value)}
                    value={bio} />
            </label>
            <hr />
            <button onClick={saveChanges}>Save Changes</button>
            <button onClick={resetValues}>Reset Values</button>
            <button onClick={logOut}>Log Out</button> */}
    </>
  );
};
