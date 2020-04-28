import React from 'react';
import {MainPage, CartPage} from '../pages';
import AppHeader from '../app-header';
import WithRestoService from '../hoc';
import Background from './food-bg.jpg';
import {Route, Switch} from 'react-router-dom';

const App = ({RestoService}) => {

    RestoService.getMenuItems()
            .then(menu => console.log(menu))
            .catch(error => console.log('Произошла ошибка'))
            
    return (
        <div style={{background: `url(${Background}) center center/cover no-repeat`}} className="app">
           <AppHeader total={50}/>
           <Switch>
                <Route
                    path = '/' 
                    component = {MainPage}
                    exact /> 
                <Route 
                    path = '/cart' 
                    component = {CartPage}/>
                
           </Switch>
           
        </div>
    )
}

export default WithRestoService()(App); // так используется компонент высшего порядка
// возьмет наш App и обернет в Consumer для того чтобы мы могли использовать контекст