import React from 'react';
import RestoServiceContext from '../resto-service-context';
import RestoService from '../../services/resto-service';

// Компонент высшего порядка возвращает функцию которая как аргумент принимает какой нибудь компонент например Wrapped 
// Этому компоненту мы можем передать какие то свойства (props). 

const WithRestoService = () => (Wrapped) => { 
    return (props) => {
        return (
            <RestoServiceContext.Consumer>
                {
                    (RestoService) => {
                        return <Wrapped {...props} RestoService = {RestoService}/>
                    }
                }
            </RestoServiceContext.Consumer>
        )
    }
};

export default WithRestoService;
// Короче будем передавать в эту функцию нужный компонент и он будет обернут в контекст чтобы из него получать RestoService