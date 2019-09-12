const remoteURL = "http://localhost:8088"

export default {

//All methods that fetch the news data, with varying parameters and/or methods

    getPage(id) {
        return fetch(`${remoteURL}/pages/${id}`)
            .then(response => response.json());
    },
    getAllPages(userId) {
        return fetch(`${remoteURL}/pages?userId=${userId}`)
            .then(response => response.json());
    },
    getUserPages() {
        return fetch(`${remoteURL}/pages?_embed=users`)
            .then(response => response.json());
    },
    postPage(bookObject) {
        return fetch(`${remoteURL}/pages`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(bookObject)
        }).then(response => response.json())
    },
    deletePage(id) {
        return fetch(`${remoteURL}/pages/${id}`,
        {method: "DELETE"
        }).then(response => response.json())
    },
    editPage(editedPage) {
        return fetch (`${remoteURL}/pages/${editedPage.id}`,  {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(editedPage)
        }).then(response => response.json());
    },
    checkPages(bookId, month, day) {
        return fetch(`${remoteURL}/pages?bookId=${bookId}&&month=${month}&&day=${day}`)
            .then(response => response.json());
    },
}