import React from "react";
import Card from "../components/Card/Card";
import AppContext from "../context";



const Favorites = () => {
    const { favorites, onAddToFavorite } = React.useContext(AppContext);

    return (
        <div className="content p-40">
            {/* блок поиска и заголовка */}
            <div className="d-flex align-center mb-40 justify-between">
                <h1>Мои закладки</h1>

            </div>
            {/* блок карточек кросовок */}
            <div className="d-flex flex-wrap">
                {favorites.map((item, index) => (
                    <Card
                        key={index}
                        isFavorite={true}
                        onFavorite={onAddToFavorite}
                        {...item}
                    />
                ))}
            </div>
        </div>
    )
}

export default Favorites;