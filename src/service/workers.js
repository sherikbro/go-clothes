import http from "./api";

const workers = {
    get: (params)=> http.get("/workers", {params}),
    delete: (id)=> http.delete(`/worker/${id}`),
    update: (data)=> http.put('/worker',data),
    create: (data)=> http.post('/worker',data)
}
export default workers