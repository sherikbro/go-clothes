import http from "./api";

const auth = {
    sign_in: (data)=> http.post('/login', data)
}
export default auth