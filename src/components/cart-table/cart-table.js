import React from 'react';
import './cart-table.scss';
import {connect} from 'react-redux';
import { deleteFromCart } from '../../actions';
import WithRestoService from '../hoc';

const CartTable = ({items, deleteFromCart, RestoService}) => {
    if( items.length === 0){
        return (<div className="cart__title"> Ваша корзина пуста :( </div>)
    }
   return (
        <>           
            <div className="cart__title">Ваш заказ:</div>
            <div className="cart__list">
                {
                    items.map(item => {
                        const {title, price, url, id, numberOf} = item;
                        const randKey = Math.floor(Math.random()*100000);                        
                        return (
                            <div key = {randKey} className="cart__item">
                                <img src= {url} className = "cart__item-img" alt = {title}></img>
                                <div className="cart__item-title">{title}</div>
                                <div className="cart__item-price">{price}$</div>
                                <div className = "cart__item-amount">{`Количество ${numberOf}`}</div>
                                <div onClick = {() => deleteFromCart(id)} className="cart__close">&times;</div>
                            </div>
                        )                        
                    })                    
                }
            </div>
            <button onClick = {() => RestoService.setOrder(makeOrder(items)) } className = "cart__btn">Order</button>
        </>
    );
};

const mapStateToProps = ({items}) => {
    return {
        items
    }
};
const mapDispatchToProps = {     
    deleteFromCart
}
const makeOrder = (items) => {
    const newOrder = items.map( item => {
        return {
            id: item.id,
            numberOf: item.numberOf
        }
        return newOrder;        
    })
}

export default WithRestoService()(connect(mapStateToProps, mapDispatchToProps)(CartTable));
