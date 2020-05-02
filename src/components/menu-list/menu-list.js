import React, {Component} from 'react';
import MenuListItem from '../menu-list-item';
import {connect} from 'react-redux';
import './menu-list.scss';
import WithRestoService from '../hoc';
import {menuLoaded, menuRequested, menuError, addedToCart} from '../../actions';
import Spinner from '../spinner';
import Error from '../error';




class MenuList extends Component {

    componentDidMount() {
     
        this.props.menuRequested();     // выполняем actionCreater - меню запрошено (loading = true)
// результат операции - объект который сразу диспетчится коннектом
        const {RestoService} = this.props; // приходит из Provider

        RestoService.getMenuItems()
            .then(res => this.props.menuLoaded(res)) // помещаем загруженный объект в actionCreater для изменения меню, loading = false
            .catch(error => this.props.menuError());

    }

    render() {
    
        const {menuItems, loading, error, addedToCart} = this.props; // приходит в пропс из connect 

        if(error){
            return (
                <Error/>
            )
        }
        if(loading){
            return <Spinner/>
        }
        ///////////////////////////// Вынесли эту логику отдельно //////////////////////////////////
        const items = menuItems.map(menuItem => { // сформировал массив items
                       return  <MenuListItem 
                                    key = {menuItem.id}
                                    menuItem = {menuItem}
                                    onAddToCart = {() => addedToCart(menuItem.id)}/>
                    })

        //////////////////////////////////////////////////////////////////////////////////////////////            
        return (    
            <View items = {items}/>
        ) 
        
    }
};
const mapStateToProps = (state) => { // для получения данных из state
    return {
        menuItems: state.menu,
        loading: state.loading,
        error: state.error
    }
}
 
const mapDispatchToProps = {  // для добавления данных
   menuLoaded,
   menuRequested,
   menuError,
   addedToCart
};  

const View = ({items}) => {
    return (
        <ul className="menu__list">
            {items}
        </ul>
    )
    
}

export default WithRestoService()(connect(mapStateToProps, mapDispatchToProps)(MenuList));

