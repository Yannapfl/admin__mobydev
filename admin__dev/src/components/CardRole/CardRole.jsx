import './CardRole.css'
import pencil from '../../assets/icons/edit_pencil.svg'
import wastebasket from '../../assets/icons/wastebasket.svg'
import PropTypes from "prop-types";
import { takeAccess } from '../../utils/takeAccess';

export default function CardRole({ role, onEdit, onDelete }) {

    return (
        <div className='content-card-role'>
            <div className='card-title-role'>
                <h2>{role.name}</h2>
            </div>
            <div className='role-card-content'>
                <ul className='list-block m-0'>
                    <li>
                        <h5 className='m-0'><span>Проекты</span>{` (${takeAccess('projects', role)})`}</h5>
                    </li>
                    <li>
                        <h5 className='m-0'><span>Категории</span>{` (${takeAccess('categories', role)})`}</h5>
                    </li>
                    <li>
                        <h5 className='m-0'><span>Пользователи</span>{` (${takeAccess('users', role)})`}</h5>
                    </li>
                </ul>
                <div className='card-actions-btn m-0'>
                    <button className="btn-img" onClick={onEdit}>
                        <img src={pencil} alt='edit' />
                    </button>
                    <button className="btn-img" onClick={onDelete}>
                        <img src={wastebasket} alt='delete' />
                    </button>
                </div>
            </div>
        </div>
    )
}

CardRole.propTypes = {
    role: PropTypes.shape({
        name: PropTypes.string,
        readAccess: PropTypes.arrayOf(PropTypes.string),
        editAccess: PropTypes.arrayOf(PropTypes.string),
    }).isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
}