export const heroesFetching = () => {
    return {
        type: 'HEROES_FETCHING'
    }
}

export const heroesFetched = (heroes) => {
    return {
        type: 'HEROES_FETCHED',
        payload: heroes
    }
}

export const heroesFetchingError = () => {
    return {
        type: 'HEROES_FETCHING_ERROR'
    }
}

export const deleteHero = (id) => {
    return {
        type: 'DELETE_HERO',
        payload: id
    }
}

export const addHero = (hero) => {
    return {
        type: 'ADD_HERO',
        payload: hero
    }
}

export const filterFetching = () => {
    return {
        type: 'FILTER_FETCHING'
    }
}

export const filterFetched = (filter) => {
    return {
        type: 'FILTER_FETCHED',
        payload: filter
    }
}

export const filterFetchingError = () => {
    return {
        type: 'FILTER_FETCHING_ERROR'
    }
}

export const changeSelected = (selected) => {
    return {
        type: 'SELECTED_CHANGED',
        payload: selected
    }
}