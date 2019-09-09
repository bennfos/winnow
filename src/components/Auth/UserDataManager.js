const remoteURL = "http://localhost:8088"

export default {
    getAllUsers() {
        return fetch(`${remoteURL}/users`)
            .then(response => response.json());
    },
    checkUsers(username, password) {
        return fetch(`${remoteURL}/users?username=${username}&&password=${password}`)
            .then(response => response.json());
    },

    postUser(userObject) {
        return fetch(`${remoteURL}/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userObject)
        })
            .then(data => data.json())
    }
}