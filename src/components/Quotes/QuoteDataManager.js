const remoteURL = "http://localhost:8088"

export default {

//All methods that fetch the news data, with varying parameters and/or methods

    getQuote(id) {
        return fetch(`${remoteURL}/quotes/${id}`)
            .then(response => response.json());
    },
    getAllUserQuotes(userId) {
        return fetch(`${remoteURL}/quotes?userId=${userId}`)
            .then(response => response.json());
    },
    getQuotesWithEmbeddedUser() {
        return fetch(`${remoteURL}/quotes?_embed=users`)
            .then(response => response.json());
    },
    postQuote(quoteObject) {
        return fetch(`${remoteURL}/quotes`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(quoteObject)
        }).then(response => response.json())
    },
    deleteQuote(id) {
        return fetch(`${remoteURL}/quotes/${id}`,
        {method: "DELETE"
        }).then(response => response.json())
    },
    editQuote (editedQuote) {
        return fetch (`${remoteURL}/quotes/${editedQuote.id}`,  {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(editedQuote)
        }).then(response => response.json());
    }
}