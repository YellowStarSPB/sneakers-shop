import React from "react";
import Info from "../Info";
import AppContext from "../../context";
import axios from "axios";

import classes from './Drawer.module.scss'

const Drawer = ({ onClose, cartItems = [], onRemove, opened }) => {
    const { setCartItems } = React.useContext(AppContext)
    const [isOrderComplete, setIsOrderComlete] = React.useState(false);

    const totalPrice = cartItems.reduce((sum, obj) => obj.price + sum, 0)

    const onClickOrder = async () => {
        setIsOrderComlete(true)
        
        setCartItems([])
        cartItems.forEach(item => {
            axios.delete(`https://64007a559f8449102991ca93.mockapi.io/cart/${item.id}`, [])
        })
    }
    return (
        <div className={`${classes.overlay} ${opened ? classes.overlayVisible : ''}`}>
            <div className={classes.drawer}>
                <h2 className="d-flex justify-between mb-30 ">
                    Корзина
                    <img onClick={onClose} className="cu-p" src="./img/btn-remove.svg" alt="Close" />
                </h2>
                {cartItems.length > 0 ? (
                    <>
                        <div className={classes.items}>
                            {cartItems.map((obj) => (
                                <div key={obj.id} className="cartItem d-flex align-center mb-20">
                                    <div className="cartItemImg" style={{ backgroundImage: `url(${obj.url})` }}></div>
                                    <div className="mr-20 flex">
                                        <p className="mb-5">{obj.title}</p>
                                        <b>{obj.price} руб.</b>
                                    </div>
                                    <img onClick={() => onRemove(obj.id)} className="removeBtn" src="./img/btn-remove.svg" alt="Remove" />
                                </div>
                            ))}
                        </div>

                        <div className="cardTotalBlock">
                            <ul>
                                <li>
                                    <span>Итого:</span>
                                    <div></div>
                                    <b>{totalPrice} руб.</b>
                                </li>
                                <li>
                                    <span>Налог 5%:</span>
                                    <div></div>
                                    <b>{totalPrice / 100 * 5} руб.</b>
                                </li>
                            </ul>
                            <button onClick={onClickOrder} className="greenButton">Оформить заказ <img src="./img/arrow.svg" alt="Arrow" /></button>
                        </div>
                    </>
                ) : (
                    <Info
                        title={isOrderComplete ? 'Заказ оформлен!':'Корзина пустая' }
                        description={isOrderComplete ? 'Ваш заказ #18 скоро будет передан курьерской доставке' :'Добавьте хотя бы одну пару кросовок, чтобы сделать заказ.'}
                        image={isOrderComplete ? "./img/complete-order.png" : "./img/empty-cart.png"}
                    />

                )
                }






            </div>
        </div>
    )
}

export default Drawer;