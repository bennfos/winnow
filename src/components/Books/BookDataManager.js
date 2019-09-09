const remoteURL = "http://localhost:8088"

export default {

//All methods that fetch the news data, with varying parameters and/or methods

    getBook(id) {
        return fetch(`${remoteURL}/books/${id}`)
            .then(response => response.json());
    },
    getAllBooks(userId) {
        return fetch(`${remoteURL}/books?userId=${userId}`)
            .then(response => response.json());
    },
    getUserBooks() {
        return fetch(`${remoteURL}/news?_embed=users`)
            .then(response => response.json());
    },
    postBook(bookObject) {
        return fetch(`${remoteURL}/books`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(bookObject)
        }).then(response => response.json())
    },
    deleteBook(id) {
        return fetch(`${remoteURL}/books/${id}`,
        {method: "DELETE"
        }).then(response => response.json())
    },
    editBook(editedBook) {
        return fetch (`${remoteURL}/books/${editedBook.id}`,  {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(editedBook)
        }).then(response => response.json());
    }
}