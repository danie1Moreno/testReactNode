import axios from "axios";
export const Games = ({ el, user, token }) => {
  let img = el.box_art_url.split("{");
  let link = `${img[0]}150x200.jpg`;
  const saveFavorito = async () => {
    await axios.post(
      "http://localhost:5000/favorites",

      {
        user_id: user.id,
        type: "Game",
        id: el.id,
        name: el.name,
        box_art_url: link,
      },

      { headers: { "x-access-token": token } }
    );
  };
  return (
    <li>
      <img src={link} alt={el.name} />
      {el.name}
      {token && <button onClick={saveFavorito}>Agregar a favoritos</button>}
    </li>
  );
};
