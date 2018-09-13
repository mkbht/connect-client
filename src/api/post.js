import axios from 'axios';

export function createPost(data) {
    return axios.post("/post", data, {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
        }
    }).then((response) => {
        return response.data;
    }).catch((error) => {
        return error.response.data;
    });
}