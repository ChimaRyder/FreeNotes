const userAuthenticate = () => {
    return fetch(import.meta.env.VITE_API_LINK + "/auth/token", {credentials: "include"})
        .then(res => {
            return res.json();
        })
        .catch(() => {
            return null;
        });
}

export default userAuthenticate;