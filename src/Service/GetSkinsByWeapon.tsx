export const GetSkinsByWeapon = async () => {
  const response = await fetch(`https://valorant-api.com/v1/weapons`);
  const data = await response.json();
  return data.skins;
};

export const GetAllSkins = async () => {
  const response = await fetch(`https://valorant-api.com/v1/weapons/skins`);
  const data = await response.json();
  return data;
};