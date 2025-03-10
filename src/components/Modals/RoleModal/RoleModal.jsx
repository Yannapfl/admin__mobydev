import { useState } from 'react'
import './RoleModal.css'
import '../Modals.css'
import { takeAccess } from '../../../utils/takeAccess';
import close from '../../../assets/icons/close.svg'
import DropdownList from '../../DropdownList/DropdownList';
import PropTypes from "prop-types";

export function RoleModal({
    role,
    mode,
    onAdd,
    onUpdate,
    closeModal,
}) {

    const title =
    mode === "add"
      ? `Добавить роль`
      : `Редактировать роль`;

    const buttonText = mode === "add" ? "Добавить" : "Сохранить";

    const optionsAccess = ['Редактирование', 'Только чтение'];

    const accesses = {
        projects: takeAccess(role?.isAbleToManageMovies) || '',
        categories: takeAccess(role?.isAbleToManageCategory) || '',
        users: takeAccess(role?.isAbleToManageUser) || '',
        roles: takeAccess(role?.isAbleToManageRole) || '',
    }

    const [name, setName ] = useState(role?.name || '');
    const [projectsAccess, setProjectAccess] = useState(accesses.projects);
    const [categoriesAccess, setCategoriesAccess] = useState(accesses.categories);
    const [usersAccess, setUsersAccess] = useState(accesses.users);
    const [rolesAccess, setRolesAccess] = useState(accesses.roles);

    const handleSave = () => {
        if (!name) {
          alert("Введите наименование");
          return;
        }
        if (!projectsAccess && !categoriesAccess && !usersAccess && !rolesAccess) {
            alert("Заполните все поля");
            return;
        }

    const setAccess = (isAbleToManage) => isAbleToManage === 'Редактирование' ? true : false;

        const newEntity = { 
            name, 
            isAbleToManageCategory: setAccess(categoriesAccess),
            isAbleToManageMovies: setAccess(projectsAccess),
            isAbleToManageRole: setAccess(rolesAccess),
            isAbleToManageUser: setAccess(usersAccess),
        };

        mode === "edit" ? onUpdate(newEntity) : onAdd(newEntity);
    };

    return (
        <div className='modal'>
            <div className='modal-content'>
                <div className='modal-title'>
                    <h2>{title}</h2>
                    <button className="btn-img" onClick={closeModal}>
                        <img src={close} alt="close" />
                    </button>
                </div>
                <div className="border-line m-0"></div>
                <form className='modal-form'>
                    <div className='modal-dropdown-group'>
                        <div className="input-wrapper-main-info">
                            <input
                                type="text"
                                value={name || ""}
                                onChange={(e) => setName(e.target.value)}
                                className={`input-main-info ${!name ? "" : "filled"}`}
                                placeholder="Наименование"
                            />
                            {name && (
                                <p className="input-label-projects">Наименование</p>
                            )}
                        </div>
                        <DropdownList
                            options={optionsAccess}
                            selectedValue={projectsAccess}
                            setSelectedValue={setProjectAccess}
                            placeholder='Проекты'
                        />
                        <DropdownList
                            options={optionsAccess}
                            selectedValue={categoriesAccess}
                            setSelectedValue={setCategoriesAccess}
                            placeholder='Категории'
                        />
                        <DropdownList
                            options={optionsAccess}
                            selectedValue={usersAccess}
                            setSelectedValue={setUsersAccess}
                            placeholder='Пользователи'
                        />
                        <DropdownList
                            options={optionsAccess}
                            selectedValue={rolesAccess}
                            setSelectedValue={setRolesAccess}
                            placeholder='Роли'
                        />
                    </div>
                    <div className="modal-btn-group">
                        <button type="button" onClick={handleSave}>
                            {buttonText}
                        </button>
                        <button type="button" className="btn-grey" onClick={closeModal}>
                            Отмена
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

RoleModal.propTypes = {
    mode: PropTypes.oneOf(["add", "edit"]).isRequired,
    role: PropTypes.object,
    onAdd: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
    closeModal: PropTypes.func.isRequired,
}