import axios from 'axios';

const instance = axios.create({
   headers: {'Content-type': 'application/x-www-form-urlencoded'}
});

export const FETCH_TODOS = 'FETCH_TODOS';
export const FETCH_TODO = 'FETCH_TODO';
export const CREATE_TODO = 'CREATE_TODO';
export const DELETE_TODO = 'DELETE_TODO';

const BASE_URL = 'http://192.168.1.109/todo/';
const API_KEY = '?key=VoodooRanger';

export function fetchTodos(){
    const request = instance.get(`${BASE_URL}${API_KEY}`);
    return {
        type: FETCH_TODOS,
        payload: request
    }
}

export function fetchTodo(id){
    const request = instance.get(`${BASE_URL}id/${id}${API_KEY}`);

    return {
        type: FETCH_TODO,
        payload: request
    }
}

export function createTodo(item){
    const request = instance.post(`${BASE_URL}${API_KEY}`, item);

    //not needed for post request
    return {
        type: CREATE_TODO,
        payload: request
    }
}

export function deleteTodo(id){
    const request = instance.delete(`${BASE_URL}id/${id}${API_KEY}`);

    return {
        type: DELETE_TODO,
        payload: request
    }
}
