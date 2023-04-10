import { useEffect, useMemo, useRef } from "react";
import { useHttp } from '../../hooks/http.hook';
import { useSelector, useDispatch } from "react-redux";
import { filterFetched, filterFetching, filterFetchingError, changeSelected } from "../../actions";
import { v4 as uuidv4 } from 'uuid';
import classNames from "classnames";
import Spinner from "../spinner/Spinner";
// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных V
// Фильтры должны отображать только нужных героев при выборе V
// Активный фильтр имеет класс active V
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

const HeroesFilters = () => {
    const {filters, filtersLoadingStatus} = useSelector(state => state);
    const {request} = useHttp();
    const dispatch = useDispatch();
    const btnGroupRef = useRef(null);

    useEffect(() => {
        dispatch(filterFetching());
        request('http://localhost:3001/filters')
            .then(filtersFetched)
            .catch(() => dispatch(filterFetchingError()));

        // eslint-disable-next-line
    }, [])

    const filtersFetched = (data) => {
        dispatch(filterFetched(data));
        dispatch(changeSelected(data[0].filter));
    }

    const renderFilterButtons = (filters) => {
        return filters.map((filterItem, index) => {
            const {filter, label} = filterItem

            const buttonClass = classNames('btn', {
                'btn-outline-dark': filter === 'all',
                'btn-danger': filter === 'fire',
                'btn-primary': filter === 'water',
                'btn-success': filter === 'wind',
                'btn-secondary': filter === 'earth',
                'active': !index
            })

            return <button onClick={onSelected} key={uuidv4()} value={filter} className={buttonClass}>{label}</button>
        })
    }

    const onSelected = (e) => {
        const filterValue = e.target.value;
        dispatch(changeSelected(filterValue));
        setActive(filterValue);
    }

    const setActive = (value) => {
        const buttons = Array.from(btnGroupRef.current.children);

        buttons.forEach(btn => {
            btn.classList.remove('active');

            if(btn.value === value) {
                btn.classList.add('active');
            }
        })
    }

    const setContent = (loadingStatus, Component) => {
        switch(loadingStatus) {
            case 'loading':
                return <Spinner/>
            case 'idle':
                return <Component/>
            case 'error':
                return <h5 className="text-center mt-5">Ошибка загрузки</h5>
            default:
                throw new Error('Unexpected loading status')
        }
    }

    const content = useMemo(() => {
        return setContent(filtersLoadingStatus, () => renderFilterButtons(filters))

        // eslint-disable-next-line
    }, [filtersLoadingStatus])

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div ref={btnGroupRef} className="btn-group">
                    {content}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;