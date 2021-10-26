import { useState } from "react";
import axios from "axios";
export const FStreamers = ({ el, user, token, setfavStreamers }) => {
  const [newName, setNewName] = useState("");
  const delFavorito = async () => {
    const nS = await axios.post(
      `http://localhost:5000/favorites`,
      { user_id: user.id, type: "StmrD", id: el.id },
      { headers: { "x-access-token": token } }
    );
    await setfavStreamers(nS.dataS);
    await window.location.reload(true);
  };
  const editFavorito = async () => {
    const nS = await axios.post(
      "http://localhost:5000/favorites",
      { user_id: user.id, id: el.id, type: "StmrUp", user_name: newName },
      { headers: { "x-access-token": token } }
    );
    await setfavStreamers(nS.dataS);
    await window.location.reload(true);
  };
  return (
    <tr>
      <td>{el.user_name}</td>
      <td>{el.language}</td>
      <td>{el.game_name}</td>
      <td>
        <button onClick={delFavorito}>Eliminar</button>
        <input
          type="text"
          placeholder="Editar Nombre"
          onChange={(e) => {
            setNewName(e.target.value);
          }}
        />
        <button onClick={editFavorito}>Editar </button>
      </td>
    </tr>
  );
};
