import { useEffect } from "react";
import { useHttp } from '../../hooks/http.hook';
import { useSelector, useDispatch } from "react-redux";
import { filterFetched, filterFetching, filterFetchingError, activeFilterChanged } from "../../actions";
import classNames from "classnames";
import Spinner from "../spinner/Spinner";

// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных V
// Фильтры должны отображать только нужных героев при выборе V
// Активный фильтр имеет класс active V
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

const HeroesFilters = () => {
    const {filters, filtersLoadingStatus, activeFilter} = useSelector(state => state);
    const {request} = useHttp();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(filterFetching());
        request('http://localhost:3001/filters')
            .then(data => dispatch(filterFetched(data)))
            .catch(() => dispatch(filterFetchingError()));

        // eslint-disable-next-line
    }, [])

    const renderFilterButtons = (filters) => {
        if(!filters.length) {
            return <h5 className="text-center mt-5">Фильтры не найдены</h5>
        }

        return filters.map(filterItem => {
            const {filter, label, className} = filterItem

            const buttonClass = classNames('btn', className ,{
                'active': filter === activeFilter
            })

            return <button 
                        onClick={() => dispatch(activeFilterChanged(filter))} 
                        key={filter} 
                        className={buttonClass}
                    >{label}</button>
        })
    }

    if (filtersLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (filtersLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const content = renderFilterButtons(filters);

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    {content}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;