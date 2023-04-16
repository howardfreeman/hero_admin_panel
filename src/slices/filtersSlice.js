import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    filters: [],
    filtersLoadingStatus: 'idle',
    activeFilter: 'all'
};

const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        filterFetching: state => {
            state.filtersLoadingStatus = 'loading';
        },
        filterFetched: (state, action) => {
            state.filters = action.payload;
            state.filtersLoadingStatus = 'idle';
        },
        filterFetchingError: state => {
            state.filtersLoadingStatus = 'error';
        },
        activeFilterChanged: (state, action) => {
            state.activeFilter = action.payload;
        }
    }
});

const { reducer, actions } = filtersSlice;

export default reducer;

export const {
    filterFetching,
    filterFetched,
    filterFetchingError,
    activeFilterChanged
} = actions;