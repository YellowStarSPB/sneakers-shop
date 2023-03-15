import React from "react";
import { Route } from 'react-router-dom'
import axios from "axios";


import Home from "./pages/Home";
import Drawer from "./components/Drawer/Drawer";
import Header from "./components/Header";
import Favorites from "./pages/Favorites";
import AppContext from "./context";
import Orders from "./pages/Orders";



function App() {
    const [items, setItems] = React.useState([]); // стэйт товаров
    const [cartItems, setCartItems] = React.useState([]); // стэйт товаров в корзине
    const [favorites, setFavorites] = React.useState([]); // стэйт товаров в избранном
    const [cartOpened, setCartOpened] = React.useState(false); //стэйт блолка карзины
    const [searchValue, setSearchValue] = React.useState(''); //стэйт инпута
    const [isLoading, setIsLoading] = React.useState(true); //стэйт загрузки

    React.useEffect(() => {
        async function fetchData() {
            try {
                setIsLoading(true)
                const cartRespose = await axios.get('https://64007a559f8449102991ca93.mockapi.io/cart')
                const favoritesRespose = await axios.get('https://63fdc8af19f41bb9f6533bbf.mockapi.io/favorites')
                const itemsRespose = await axios.get('https://64007a559f8449102991ca93.mockapi.io/items')
                setIsLoading(false)
                //запрос на получение данных товаров магазина
                //запрос на получение данных товаров в избранном
                //запрос на получение данных товаров в корзине
                setCartItems(cartRespose.data)
                setFavorites(favoritesRespose.data)
                setItems(itemsRespose.data)
            } catch (err) {
                alert('Данные не загружены')
            }
        }
        fetchData()
    }, [])

    const onAddToCart = async (obj) => {
        try {
            const findItem = cartItems.find(item => Number(item.parentId) === Number(obj.id))
            if (findItem) {
                setCartItems((prev) => prev.filter((item) => Number(item.parentId) !== Number(obj.id)))
                await axios.delete(`https://64007a559f8449102991ca93.mockapi.io/cart/${findItem.id}`)
            } else {
                setCartItems((prev) => [...prev, obj])
                const { data } = await axios.post('https://64007a559f8449102991ca93.mockapi.io/cart', obj)
                setCartItems((prev) => prev.map(item => {
                    if(item.parentId === data.parentId) {
                        return {
                            ...item,
                            id: data.id
                        }
                    }
                    return item
                }))
            }
        } catch (error) {
            alert('Невозхможно добавить')
        }
    }

    const onAddToFavorite = async (obj) => {
        try {
            if (favorites.find(favObj => Number(favObj.id) === Number(obj.id))) {
                axios.delete(`https://63fdc8af19f41bb9f6533bbf.mockapi.io/favorites/${obj.id}`)
                setFavorites((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)))
            } else {
                const { data } = await axios.post('https://63fdc8af19f41bb9f6533bbf.mockapi.io/favorites', obj)
                setFavorites(prev => [...prev, data])
            }
        } catch (error) {
            alert('Не удалось добавить в Фавориты')
        }
    }

    const onRemoveItemCart = (id) => {
        axios.delete(`https://64007a559f8449102991ca93.mockapi.io/cart/${id}`)
        setCartItems(prev => prev.filter(item => Number(item.id) !== Number(id)))
    }

    const onChangeSearchInput = (event) => {
        setSearchValue(event.target.value)
    }

    const isItemAdded = (id) => {
        return cartItems.some(obj => Number(obj.parentId) === Number(id))
    }

    return (
        <AppContext.Provider value={{ items, cartItems, favorites, isItemAdded, onAddToFavorite, setCartOpened, setCartItems, onAddToCart }}>
            <div className="wrapper clear">
                {/* блок корзины */}
                <Drawer
                    onRemove={onRemoveItemCart}
                    cartItems={cartItems}
                    onClose={() => setCartOpened(false)}
                    opened={cartOpened} />
                {/* шапка */}
                <Header onClickCart={() => setCartOpened(true)} />
                {/* блок основного контента */}
                <Route path='/' exact>
                    <Home
                        items={items}
                        cartItems={cartItems}
                        favorites={favorites}
                        searchValue={searchValue}
                        setSearchValue={setSearchValue}
                        onChangeSearchInput={onChangeSearchInput}
                        onAddToFavorite={onAddToFavorite}
                        onAddToCart={onAddToCart}
                        isLoading={isLoading} />
                </Route>
                <Route path='/favorites' exact>
                    <Favorites />
                </Route>
                <Route path='/orders' exact>
                    <Orders />
                </Route>
            </div>
        </AppContext.Provider>
    );
}


export default App;
