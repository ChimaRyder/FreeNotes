const userAuthenticate = () => {
    return fetch(process.env.API_LINK + "/auth/token", {credentials: "include"})
        .then(res => {
            return res.json();
        })
        .catch(() => {
            return null;
        });
}

export default userAuthenticate;