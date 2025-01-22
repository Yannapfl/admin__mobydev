import { createContext, useState } from "react";
import PropTypes from "prop-types";

const CategoriesContext = createContext();

export function CategoriesProvider({ children }) {
    const [categories, setCategories] = useState([
        { value: "cartoons", label: "Мультфильмы" },
        { value: "movies_and_series", label: "Фильмы и сериалы" },
        { value: "movies", label: "Фильмы" },
        { value: "series", label: "Сериалы" },
    ])

    const addCategory = (newCategory) => {
        setCategories([...categories, newCategory])
    }

    const removeCategory = (value) => {
        setCategories(categories.filter((category) => category.value !==  value))
    }

    const editCategory = (value, newCategory) => {
        setCategories(categories.map((category) =>
            category.value === value
                ? { ...category, ...newCategory }
                : category
        ));
    }

    return (
        <CategoriesContext.Provider value={{ categories, addCategory, removeCategory, editCategory }}>
            {children}
        </CategoriesContext.Provider>
    )
}

CategoriesProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default CategoriesContext;