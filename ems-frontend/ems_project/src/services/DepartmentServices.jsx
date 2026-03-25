import axios from "axios";

const DEPARTMENT_API_BASE_URL = "http://localhost:8080/api/departments";

export const listDepartments = () => {
    return axios.get(DEPARTMENT_API_BASE_URL);
}

export const createDepartment = (department) => {
    return axios.post(DEPARTMENT_API_BASE_URL, department);
}

export const getDepartmentById = (id) => {
    return axios.get(`${DEPARTMENT_API_BASE_URL}/${id}`);
}

export const updateDepartment = (id, department) => {
    return axios.put(`${DEPARTMENT_API_BASE_URL}/${id}`, department);
}

export const deleteDepartment = (id) => {
    return axios.delete(`${DEPARTMENT_API_BASE_URL}/${id}`);
}