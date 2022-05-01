export function GetTokenFromStorage(){
    const token = window.localStorage.getItem("auth");
    const parseToken = JSON.parse(token);
    const tokenValue = parseToken.token;
    return tokenValue;
}
export function GetKeyFromStorage(key){
    const value = window.localStorage.getItem(key); 
    return value;
}