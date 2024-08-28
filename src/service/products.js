import http from './api';

const products = {
    get: (params)=> http.get('products', {params}),
    delete: (id)=> http.delete(`/product/${id}`),
    update: (data)=> http.put('/product',data),
    create: (data)=> http.post("/product", data),
    get_by_id: (id)=> http.get(`product/${id}`,),
}
export default products