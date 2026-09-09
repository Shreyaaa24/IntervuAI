const TOKEN_KEY = "token";
const USER_KEY = "user";
export interface StoredUser {
    id: string;
    email: string;
    name: string;
}
export const getToken = () => {
    if (typeof window === "undefined") {
        return null;
    }
    return localStorage.getItem(TOKEN_KEY);
};
export const setToken = (token: string): void => {
    if (typeof window === "undefined") {
        return;
    }
    localStorage.setItem(TOKEN_KEY, token);
};