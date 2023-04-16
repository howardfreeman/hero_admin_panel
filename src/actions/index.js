import { heroesFetching, heroesFetched, heroesFetchingError } from '../slices/heroesSlice';
import { filterFetching, filterFetched, filterFetchingError } from '../slices/filtersSlice';

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