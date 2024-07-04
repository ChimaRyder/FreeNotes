const userAuthenticate = () => {
    return fetch("http://localhost:3000/auth/token", {credentials: "include"})
        .then(res => {
            return res.json();
        })
        .catch(() => {
            return null;
        });
}

export default userAuthenticate;