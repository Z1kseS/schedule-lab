import types from "../types.js";

export function fetchTeachersRequest() {
    return {
        type: types.FETCH_TEACHERS_REQUEST
    };
}

export function fetchTeachersSuccess(payload) {
    return {
        type: types.FETCH_TEACHERS_SUCCESS,
        payload
    };
}

// сейчас не используется (пример стуктуры)
export function fetchTeachersError(error) {
    return {
        type: types.FETCH_TEACHERS_FAIL,
        payload: error,
        error: true
    };
}

export const fetchTeachers = () => (dispatch) => {
    return fetch("http://localhost:9100/teachers", {method: "GET"})
        .then(response => response.json())
        .then(json => dispatch(fetchTeachersSuccess(json)));
};

export function fetchTeachersLoadRequest() {
    return {
        type: types.FETCH_TEACHERS_LOAD_REQUEST
    };
}

export function fetchTeachersLoadSuccess(payload) {
    return {
        type: types.FETCH_TEACHERS_LOAD_SUCCESS,
        payload
    };
}

// сейчас не используется (пример стуктуры)
export function fetchTeachersLoadError(error) {
    return {
        type: types.FETCH_TEACHERS_LOAD_FAIL,
        payload: error,
        error: true
    };
}

export const fetchTeachersLoad = (selectedTeachers, selectedWeeks) => (dispatch) => {
    const name = selectedTeachers.join(',');
    const week = selectedWeeks.join(',');
    const params = [{value: name, name: 'name'}, {value: week, name: 'week'}]
        .filter(({value}) => value)
        .map(({name, value}) => `${name}=${value}`)
        .join('&');

    const queryString = params ? '?' + params : '';
    return fetch("http://localhost:9100/teacher/load" + queryString, {method: "GET"})
        .then(response => response.json())
        .then(json => dispatch(fetchTeachersLoadSuccess(json)));
};
