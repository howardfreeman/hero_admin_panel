import { useState, useMemo } from "react";
import { v4 as uuidv4 } from 'uuid';
import { addHero } from "../../actions";
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
    const { filters, filtersLoadingStatus } = useSelector(state => state);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [element, setElement] = useState('');
    const dispatch = useDispatch();
    const { request } = useHttp();

    const onInputChange = (event) => {
        const target = event.target;

        let value = target.value;
        const name = target.name;

        switch(name) {
            case 'name':
                setName(value);
                break;
            case 'text':
                setDescription(value);
                break;
            case 'element':
                setElement(value);
                break;
            default:
                throw new Error('Unknown input');
        }
        
    }

    const onHeroSubmit = (event) => {
        event.preventDefault();

        const hero = {
            id: uuidv4(),
            name: name.trim(),
            description: description.trim(),
            element
        };

        dispatch(addHero(hero));

        const jsonHero = JSON.stringify(hero);
        request('http://localhost:3001/heroes', 'POST', jsonHero)
            .catch(err => {
                throw new Error(`Error occured: ${err}`)
            });

        setName('');
        setDescription('');
        setElement('');
    }

    const renderOptions = (filters) => {
        if(!filters.length) {
            return null;
        }

        const filtersWithoutAll = filters.filter(({filter}) => filter !== 'all');

        return filtersWithoutAll.map(({filter, label}) => {
            return <option key={uuidv4()} value={filter}>{label}</option>
        })
    }

    const setOptions = (loadingStatus, Component) => {
        switch(loadingStatus) {
            case 'loading':
                return null
            case 'idle':
                return <Component/>
            case 'error':
                return <h5 className="text-center mt-5">Ошибка загрузки</h5>
            default:
                throw new Error('Unexpected loading status')
        }
    }

    const options = useMemo(() => {
        return setOptions(filtersLoadingStatus, () => renderOptions(filters));

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
                    value={name}
                    onChange={onInputChange}
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
                    value={description}
                    onChange={onInputChange}
                />
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                <select 
                    required
                    className="form-select" 
                    id="element" 
                    name="element"
                    value={element}
                    onChange={onInputChange}
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