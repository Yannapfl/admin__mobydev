import './Projects.css'
import plus from '../../assets/icons/math-plus.svg'
import DropdownFilter from '../../components/DropdownFilter/DropdownFilter'

const mocksSortFilter = ["Популярные", "Новинки", "По рейтингу", "Все"]


export default function Projects() {
    const handleFilterChange = (filterName) => {
        console.log(`Выбран фильтр: ${filterName}`);
    }

    return(
        <>
        <div className="page-header">
            <div className='page-headline'>
                <h1>Проекты</h1>
                <p>133</p>
            </div>
                <button className='btn btn-headline' onClick={() => alert('Add')}>
                    <div className='btn-items-headline'>
                        <img src={plus} alt='plus' />
                        <p>Добавить</p>
                    </div>
                </button>
        </div>
        <div className='filters'>
            <div className='dropdown-group'>
                <DropdownFilter
                    label='Сортировать'
                    options={mocksSortFilter}
                    selectedOption={mocksSortFilter[0]}
                    onSelect={(selectedOption) => handleFilterChange(selectedOption)}
                />
                <DropdownFilter
                    label='Категория'
                    options={mocksSortFilter}
                    selectedOption={mocksSortFilter[0]}
                    onSelect={(selectedOption) => handleFilterChange(selectedOption)}
                />
                <DropdownFilter
                    label='Тип'
                    options={mocksSortFilter}
                    selectedOption={mocksSortFilter[0]}
                    onSelect={(selectedOption) => handleFilterChange(selectedOption)}
                />
            </div>
        </div>
        </>
        
    )
}