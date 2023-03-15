import React from 'react';
import Card from '../components/Card/Card';


const Home = ({
    items,
    searchValue,
    setSearchValue,
    onChangeSearchInput,
    onAddToFavorite,
    onAddToCart,
    favorites,
    isLoading }) => {


    
    
    const renderItems = () => {
        const filtredItems = items.filter((item) =>
            item.title.toLowerCase().includes(searchValue.toLowerCase()));
        return (isLoading ? [...Array(8)] : filtredItems).map((item, index) => (
            <Card
                key={index}
                onFavorite={(obj) => onAddToFavorite(obj)}
                onPlus={(obj) => onAddToCart(obj)}
                isFavorite={favorites.some(obj => Number(obj.id) === Number(item.id))}
                loading={isLoading}
                {...item}
            />
        ))
    }

    return (
        <div className="content p-40">
            {/* блок поиска и заголовка */}
            <div className="d-flex align-center mb-40 justify-between">
                <h1>{searchValue ? `Поиск по запросу: "${searchValue}"` : `Все кроcсовки`}</h1>
                <div className="search-block d-flex">
                    <img src="./img/search.svg" alt="Search" />
                    {searchValue && <img
                        onClick={() => setSearchValue('')}
                        className=" clear cu-p"
                        src="./img/btn-remove.svg"
                        alt="Clear" />
                    }
                    <input
                        onChange={onChangeSearchInput}
                        value={searchValue}
                        placeholder="Поиск..." />
                </div>
            </div>
            {/* блок карточек кросовок */}
            <div className="d-flex flex-wrap">
                {renderItems()}
            </div>
        </div>
    )
}

export default Home;