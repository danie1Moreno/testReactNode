import { useState } from "react";
import axios from "axios";
export const FGames = ({ el, user, token, setfavGames }) => {
  const [newName, setNewName] = useState("");
  let img = el.box_art_url.split("{");
  let link = `${img[0]}150x200.jpg`;
  const delFavorito = async () => {
    const nG = await axios.post(
      `http://localhost:5000/favorites`,
      { user_id: user.id, type: "GameD", id: el.id },
      { headers: { "x-access-token": token } }
    );
    await setfavGames(nG.dataG);
    await window.location.reload(true);
  };
  const editFavorito = async () => {
    const nG = await axios.post(
      "http://localhost:5000/favorites",
      { user_id: user.id, id: el.id, type: "GameUp", name: newName },
      { headers: { "x-access-token": token } }
    );
    await setfavGames(nG.dataG);
    await window.location.reload(true);
  };

  return (
    <li>
      <img src={link} alt={el.name} />
      {el.name}
      <button onClick={delFavorito}>Eliminar </button>
      <input
        type="text"
        placeholder="Editar Nombre"
        onChange={(e) => {
          setNewName(e.target.value);
        }}
      />
      <button onClick={editFavorito}>Editar</button>
    </li>
  );
};
