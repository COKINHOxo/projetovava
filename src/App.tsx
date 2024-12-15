import { useEffect, useState } from "react";
import './stylesglobal.css'

export const GetWeapons = async () => {
  const response = await fetch(`https://valorant-api.com/v1/weapons`);
  const data = await response.json();
  return data.data;
};

const isValid = (skin: skin) => {
  const name = skin.displayName.toLowerCase();
  return !name.includes("standard") && !name.includes("random");
};

interface skin{
  uuid: string
  displayName: string
  displayIcon: string
}

interface weapon{
  uuid: string
  displayName: string
  skins: skin[]
}

function App() {
  const [weapons, setWeapons] = useState<weapon[]>([]);
  const [selectedWeaponUuid, setSelectedWeaponUuid] = useState<string>("");
  const [weaponSkins, setWeaponSkins] = useState<skin[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await GetWeapons();
      setWeapons(data);
    };

    fetchData();
  }, []);


    useEffect(() => {
      if(selectedWeaponUuid){
        const selectedWeapon = weapons.find((weapon) => weapon.uuid === selectedWeaponUuid)
        if(selectedWeapon){
          const validSkins = selectedWeapon.skins.filter(isValid)
          setWeaponSkins(validSkins)
        }
      }
    }, [selectedWeaponUuid, weapons])
 

  return (
    <div className="bg-slate-100">
      <h1 className="titulo">Valorant Skins</h1>
      <label>Selecione uma arma: </label>
      <select
        onChange={(e) => setSelectedWeaponUuid(e.target.value)}
        value={selectedWeaponUuid}
      >
        <option value="">-- Select a Weapon --</option>
        {weapons.map((weapon) => (
          <option key={weapon.uuid} value={weapon.uuid}>
            {weapon.displayName}
          </option>
        ))}
      </select>

      <ul>{weaponSkins.map((skin) => (
        <li key={skin.uuid}>
          <h2>{skin.displayName}</h2>
          {skin.displayIcon ? (
            <img src={skin.displayIcon} width={200}/>
          ) : (
            <p>nenhuma imagem disponivel</p>
          )}
        </li>
      ))}</ul>
    </div>
    
  );
}

export default App;
