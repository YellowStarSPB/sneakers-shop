import React from 'react';
import classes from './Card.module.scss';
import ContentLoader from "react-content-loader"
import AppContext from '../../context';

const Card = ({ id, onFavorite, onPlus, url, title, price, isFavorite = false, loading=false}) => {
    const { isItemAdded } = React.useContext(AppContext)
const obj = { id, parentId: id, title, url, price }
    const [isLiked, setIsLiked] = React.useState(isFavorite);

    const onClickPlus = () => {
        onPlus(obj)

    }
    const onClickHeart = () => {
        onFavorite(obj)
        setIsLiked(!isLiked)
    }
    return (
        <div className={classes.card}>
            {loading ? (
                    <ContentLoader
                        speed={2}
                        width={155}
                        height={250}
                        viewBox="0 0 155 265"
                        backgroundColor="#f3f3f3"
                        foregroundColor="#ecebeb"

                    >
                        <rect x="1" y="0" rx="10" ry="10" width="155" height="155" />
                        <rect x="0" y="167" rx="5" ry="5" width="155" height="15" />
                        <rect x="0" y="187" rx="5" ry="5" width="100" height="15" />
                        <rect x="1" y="235" rx="5" ry="5" width="80" height="25" />
                        <rect x="124" y="230" rx="10" ry="10" width="32" height="32" />
                    </ContentLoader>
                ) : (<>
                        {onFavorite && <div onClick={onClickHeart} className={classes.favorite}>
                            <img src={isLiked ? './img/heart-liked.svg' : './img/heart-unliked.svg'} alt="Unliked" />
                        </div>}
                        <img width='100%' height={135} src={url} alt="Sneakers" />
                        <h5>{title}</h5>
                        <div className="d-flex justify-between align-center">
                            <div className="d-flex flex-column">
                                <span>Цена:</span>
                                <b>{price} руб.</b>
                            </div>

                            {onPlus && <img
                                className={classes.plus}
                                onClick={onClickPlus}
                                src={isItemAdded(id) ? './img/btn-checked.svg' : './img/btn-plus.svg'}
                                alt="Plus"
                            />}

                        </div>
                    </>)}
        </div>
    )

}

export default Card;