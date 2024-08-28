import http from "./api";

const categories = {
    get: (params)=> http.get("/categories", {params}),
    delete: (id)=> http.delete(`/category/${id}`),
    update: (data)=> http.put('/category',data),
    create: (data)=> http.post('/category',data)
}
export default categories