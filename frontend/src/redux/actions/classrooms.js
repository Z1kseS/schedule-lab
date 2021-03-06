import types from "../types.js";

export function fetchClassroomsRequest() {
    return {
        type: types.FETCH_CLASSROOMS_REQUEST
    };
}

export function fetchClassroomsSuccess(payload) {
    return {
        type: types.FETCH_CLASSROOMS_SUCCESS,
        payload
    };
}

// сейчас не используется (пример стуктуры)
export function fetchClassroomsError(error) {
    return {
        type: types.FETCH_CLASSROOMS_FAIL,
        payload: error,
        error: true
    };
}

export const fetchClassrooms = () => (dispatch) => {
    return fetch("http://localhost:9100/classrooms", {method: "GET"})
        .then(response => response.json())
        .then(json => dispatch(fetchClassroomsSuccess(json)));
};


export function fetchTeacherClassroomsRequest() {
    return {
        type: types.FETCH_TEACHER_CLASSROOMS_REQUEST
    };
}

export function fetchTeacherClassroomsSuccess(payload) {
    return {
        type: types.FETCH_TEACHER_CLASSROOMS_SUCCESS,
        payload
    };
}

// сейчас не используется (пример стуктуры)
export function fetchTeacherClassroomsError(error) {
    return {
        type: types.FETCH_TEACHER_CLASSROOMS_FAIL,
        payload: error,
        error: true
    };
}

export const fetchTeacherClassrooms = (selectedTeachers) => (dispatch) => {
    const teachers = selectedTeachers.join(',');

    const params = [{value: teachers, name: 'teacher'}]
        .filter(({value}) => value)
        .map(({name, value}) => `${name}=${value}`)
        .join('&');

    const queryString = params ? '?' + params : '';

    return fetch("http://localhost:9100/classroom/teacher"+queryString, {method: "GET"})
        .then(response => response.json())
        .then(json => dispatch(fetchTeacherClassroomsSuccess(json)));
};

export function fetchEmptyClassroomsRequest() {
    return {
        type: types.FETCH_EMPTY_CLASSROOMS_REQUEST
    };
}

export function fetchEmptyClassroomsSuccess(payload) {
    return {
        type: types.FETCH_EMPTY_CLASSROOMS_SUCCESS,
        payload
    };
}

// сейчас не используется (пример стуктуры)
export function fetchEmptyClassroomsError(error) {
    return {
        type: types.FETCH_EMPTY_CLASSROOMS_FAIL,
        payload: error,
        error: true
    };
}

export const fetchEmptyClassrooms = (selectedDays, selectedHours, selectedWeeks) => (dispatch) => {
    const day = selectedDays.join(',');
    const week = selectedWeeks.join(',');
    const hour = selectedHours.join(',');

    const params = [{value: day, name: 'day'}, {value: week, name: 'week'}, {value: hour, name: 'hour'}]
        .filter(({value}) => value)
        .map(({name, value}) => `${name}=${value}`)
        .join('&');

    const queryString = params ? '?' + params : '';
    return fetch("http://localhost:9100/classroom/empty" + queryString, {method: "GET"})
        .then(response => response.json())
        .then(json => dispatch(fetchEmptyClassroomsSuccess(json)));
};

export function fetchClassroomDuplicatesRequest() {
    return {
        type: types.FETCH_CLASSROOM_DUPLICATES_REQUEST
    };
}

export function fetchClassroomDuplicatesSuccess(payload) {
    return {
        type: types.FETCH_CLASSROOM_DUPLICATES_SUCCESS,
        payload
    };
}

// сейчас не используется (пример стуктуры)
export function fetchClassroomDuplicatesError(error) {
    return {
        type: types.FETCH_CLASSROOM_DUPLICATES_FAIL,
        payload: error,
        error: true
    };
}

export const fetchClassroomDuplicates = () => (dispatch) => {
    return fetch("http://localhost:9100/reports/duplicates/classroom", {method: "GET"})
        .then(response => response.json())
        .then(json => dispatch(fetchClassroomDuplicatesSuccess(json)));
};