import { useState, useEffect } from "react";
import axios from "axios";
import { Games } from "../components/Games";
import { Streamers } from "../components/Streamers";
import styles from "./Home.module.css";
import { useHistory } from "react-router-dom";

export const Home = () => {
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
  return (
    <>
      <div className={styles.container}>
        <div>
          <nav className={styles.navgrid}>
            <img
              src="https://cdn.pixabay.com/photo/2021/03/02/12/04/twitch-6062248_960_720.png"
              alt="custom-twitch-logo"
              height="100"
              width="100"
            />
            <header>Twitch App</header>
            <ul>
              <li>
                <a href="/login">Login</a>
              </li>
            </ul>
          </nav>
          <section className={styles.sectiongrid}>
            <div>
              <h2>Top Streamers</h2>

              <ul className={styles.nestedgridS}>
                {topStreamers &&
                  topStreamers.map((el) => <Streamers key={el.id} el={el} />)}
              </ul>
            </div>
            <div>
              <h2>Top Games</h2>

              <ul className={styles.nestedgridG}>
                {topGames &&
                  topGames.map((el) => <Games key={el.id} el={el} />)}
              </ul>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};
