import { createReducer } from "@reduxjs/toolkit";
import {
    filterFetching,
    filterFetched,
    filterFetchingError,
    activeFilterChanged
} from '../actions';

const initialState = {
    filters: [],
    filtersLoadingStatus: 'idle',
    activeFilter: 'all'
}

const filters = createReducer(initialState, builder => {
    builder
        .addCase(filterFetching, state => {
            state.filtersLoadingStatus = 'loading';
        })
        .addCase(filterFetched, (state, action) => {
            state.filters = action.payload;
            state.filtersLoadingStatus = 'idle';
        })
        .addCase(filterFetchingError, state => {
            state.filtersLoadingStatus = 'error';
        })
        .addCase(activeFilterChanged, (state, action) => {
            state.activeFilter = action.payload;
        })
        .addDefaultCase(() => {})
});

export default filters;