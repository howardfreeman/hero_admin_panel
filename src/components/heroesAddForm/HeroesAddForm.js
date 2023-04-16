import { useState, useMemo } from "react";
import { v4 as uuidv4 } from 'uuid';
import { heroCreated } from "../../slices/heroesSlice";
import { useDispatch, useSelector } from "react-redux";
import { useHttp } from "../../hooks/http.hook";

// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров

const HeroesAddForm = () => {
    const [heroName, setHeroName] = useState('');
    const [heroDescr, setHeroDescr] = useState('');
    const [heroElement, setHeroElement] = useState('');

    const { filters, filtersLoadingStatus } = useSelector(state => state.filters);
    
    const dispatch = useDispatch();
    const { request } = useHttp();

    const onHeroSubmit = (event) => {
        event.preventDefault();

        const hero = {
            id: uuidv4(),
            name: heroName.replace(/\s+/g, ' ').trim(),
            description: heroDescr.replace(/\s+/g, ' ').trim(),
            element: heroElement
        };

        request('http://localhost:3001/heroes', 'POST', JSON.stringify(hero))
            .then(data => console.log('Added', data))
            .then(dispatch(heroCreated(hero)))
            .catch(err => console.error(`Error: ${err}`));

        setHeroName('');
        setHeroDescr('');
        setHeroElement('');
    }

    const renderOptions = (filters, status) => {
        if (status === "loading") {
            return <option>Загрузка элементов</option>
        } else if (status === "error") {
            return <option>Ошибка загрузки</option>
        }

        if(filters.length) {
            return filters.map(({filter, label}) => {
                if(filter === 'all') {
                    return null;
                }

                return <option key={filter} value={filter}>{label}</option>
            })
        }
    }

    const options = useMemo(() => {
        return renderOptions(filters, filtersLoadingStatus);

        // eslint-disable-next-line
    }, [filtersLoadingStatus]);

    return (
        <form className="border p-4 shadow-lg rounded" onSubmit={onHeroSubmit} >
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                <input 
                    required
                    type="text" 
                    name="name" 
                    className="form-control" 
                    id="name" 
                    placeholder="Как меня зовут?"
                    value={heroName}
                    onChange={(e) => setHeroName(e.target.value)}
                />
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">Описание</label>
                <textarea
                    required
                    name="text" 
                    className="form-control" 
                    id="text" 
                    placeholder="Что я умею?"
                    style={{"height": '130px'}}
                    value={heroDescr}
                    onChange={(e) => setHeroDescr(e.target.value)}
                />
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                <select 
                    required
                    className="form-select" 
                    id="element" 
                    name="element"
                    value={heroElement}
                    onChange={(e) => setHeroElement(e.target.value)}
                >
                    <option value="" >Я владею элементом...</option>
                    {options}
                </select>
            </div>

            <button 
                type="submit" 
                className="btn btn-primary"
            >Создать</button>
        </form>
    )
}

export default HeroesAddForm;