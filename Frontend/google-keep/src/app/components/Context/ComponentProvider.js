import React, { createContext, useState, } from "react";
import axios from 'axios';


export const ComponentContext = createContext();

function ComponentProvider({ children }) {

    const [currentComponent, setCurrentComponent] = useState('notes');


    const toggleComponent = (componentName) => {
        setCurrentComponent(componentName);
        console.log(currentComponent)
    };

    

    return (
        <ComponentContext.Provider value={{ currentComponent, toggleComponent, }}>
            {children}
        </ComponentContext.Provider>
    );
}
export default ComponentProvider;