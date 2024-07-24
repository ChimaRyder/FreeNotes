export const setAuthenticate = (auth) => {
    sessionStorage.setItem("SESSION_TOKEN", auth);
}

export const getAuthenticate = () => {
    return sessionStorage.getItem("SESSION_TOKEN");
}

const userAuthenticate = () => {
    const auth = getAuthenticate();
    return fetch(import.meta.env.VITE_API_LINK + "/auth/token", {credentials: "include", headers: {authorization: auth}})
        .then(res => {
            return res.json();
        })
        .catch(() => {
            return null;
        });
}

export default userAuthenticate;