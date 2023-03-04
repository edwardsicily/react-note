export const categoryList = [
  { name: "activities", color: "#ff0000" },
  { name: "quotes", color: "#00ff00" },
];

const LogoutFromLS = () => {
  localStorage.removeItem("userData");
};

export function isTokenExpired(token) {
  console.log(token.split("."));
  const decodedToken = JSON.parse(atob(token.split(".")[1])); //decodifica il token e ne prende la data di scadenza
  return decodedToken.exp < Date.now() / 1000; //true il token è scaduto
}
