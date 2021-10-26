import axios from "axios";
export const Streamers = ({ el, user, token }) => {
  let img = el.thumbnail_url.split("{");
  let link = `${img[0]}200x150.jpg`;
  const saveFavorito = async () => {
    await axios.post(
      "http://localhost:5000/favorites",

      {
        user_id: user.id,
        type: "Stmr",
        id: el.id,
        user_name: el.user_name,
        language: el.language,
        game_name: el.game_name,
      },

      { headers: { "x-access-token": token } }
    );
  };
  return (
    <li>
      <img src={link} alt={el.user_name} />
      {el.title}
      {el.user_name}
      {token && <button onClick={saveFavorito}>Agregar a favoritos</button>}
    </li>
  );
};
