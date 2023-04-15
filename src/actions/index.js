import { createAction } from "@reduxjs/toolkit";

export const fetchHeroes = (request) => (dispatch) => {
    dispatch(heroesFetching());
    request(`http://localhost:3001/heroes`)
        .then(data => dispatch(heroesFetched(data)))
        .catch(() => dispatch(heroesFetchingError()))
}

export const fetchFilters = (request) => (dispatch) => {
    dispatch(filterFetching());
    request('http://localhost:3001/filters')
        .then(data => dispatch(filterFetched(data)))
        .catch(() => dispatch(filterFetchingError()))
}

export const heroesFetching = createAction('HEROES_FETCHING');

export const heroesFetched = createAction('HEROES_FETCHED');

export const heroesFetchingError = createAction('HEROES_FETCHING_ERROR');

export const heroDeleted = createAction('HERO_DELETED');

export const heroCreated = createAction('HERO_CREATED');

export const filterFetching = createAction('FILTER_FETCHING');

export const filterFetched = createAction('FILTER_FETCHED');

export const filterFetchingError = createAction('FILTER_FETCHING_ERROR');

export const activeFilterChanged = createAction('ACTIVE_FILTER_CHANGED');