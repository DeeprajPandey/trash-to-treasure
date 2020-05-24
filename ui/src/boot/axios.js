import Vue from 'vue'
import axios from 'axios'

const axiosInstance = axios.create({
	// baseURL: 'http://0.0.0.0:6401'
})

Vue.prototype.$axios = axiosInstance

export {axiosInstance}