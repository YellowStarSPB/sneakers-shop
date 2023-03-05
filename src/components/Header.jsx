import React from 'react'
import { Link } from 'react-router-dom'
import AppContext from '../context'


const Header = (props) => {
    const { cartItems } = React.useContext(AppContext)

    const totalPrice = cartItems.reduce((sum, obj) => obj.price + sum, 0)

    return (
        <header className="d-flex justify-between align-center p-40">
            <Link to='/'>
                <div className="d-flex align-center">

                    <img width={40} height={40} src="./img/logo.svg" alt="logo" />
                    <div>
                        <h3 className="text-uppercase">React Sneakers</h3>
                        <p className="opacity-5">Магазин лучших кросовок</p>
                    </div>

                </div>
            </Link>


            <ul className="d-flex">
                <li onClick={props.onClickCart} className="mr-30 cu-p">
                    <img width={18} height={18} src="./img/cart.svg" alt="card" />
                    <span>{totalPrice} руб.</span>
                </li>
                <li className="mr-20 cu-p">
                    <Link to='/favorites'>
                        <img width={18} height={18} src="./img/btn-favorite.svg" alt="favorite" />
                    </Link>
                </li>
                <li>
                    <Link to='/orders'>
                        <img width={18} height={18} src="./img/user.svg" alt="user" />
                    </Link>
                </li>
            </ul>

        </header >
    )
}

export default Header;