import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';

import { useHttp } from '../../hooks/http.hook';
import { fetchHeroes } from '../../actions';
import { heroDeleted } from '../../slices/heroesSlice';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';

// Задача для этого компонента:
// При клике на "крестик" идет удаление персонажа из общего состояния
// Усложненная задача:
// Удаление идет и с json файла при помощи метода DELETE

const HeroesList = () => {
    const filteredHeroesSelector = createSelector(
        state => state.heroes.heroes,
        state => state.filters.activeFilter,
        (heroes, filter) => {
            if(filter === 'all') {
                return heroes;
            }
    
            return heroes.filter(hero => hero.element === filter)
        }
    )

    const filteredHeroes = useSelector(filteredHeroesSelector);
    const heroesLoadingStatus = useSelector(state => state.heroes.heroesLoadingStatus);
    const dispatch = useDispatch();
    const {request} = useHttp();
    const BASE_URL = 'http://localhost:3001';

    useEffect(() => {
        dispatch(fetchHeroes(request))

        // eslint-disable-next-line
    }, []);

    const onDeleteHero = useCallback((id) => {
        request(`${BASE_URL}/heroes/${id}`, 'DELETE')
            .then(response => console.log('Deleted:', response))
            .then(dispatch(heroDeleted(id)))
            .catch(err => {
                throw new Error(`Error occured: ${err}`)
            })

        // eslint-disable-next-line
    }, [request]);

    if (heroesLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (heroesLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const renderHeroesList = (heroes) => {
        if (heroes.length === 0) {
            return <h5 className="text-center mt-5">Героев пока нет</h5>
        }

        return heroes.map(({id, ...props}) => {
            return <HeroesListItem onDeleteHero={() => onDeleteHero(id)} key={id} {...props}/>
        })
    }

    const elements = renderHeroesList(filteredHeroes);
    return (
        <ul>
            {elements}
        </ul>
    )
}

export default HeroesList;