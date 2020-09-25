import axios from 'axios'

const instance = axios.create({
    baseURL:'http://localhost:3000',
    timeout:1000 * 10,
})

instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

instance.interceptors.request.use(config=>{
    return config
})

instance.interceptors.response.use(res=>{
    return res
},err=>{
    return err
})
export default instance