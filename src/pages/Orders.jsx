import React from "react";
import Card from "../components/Card/Card";
import axios from "axios";
import AppContext from "../context";



const Orders = () => {
    const { favorites } = React.useContext(AppContext)

    const [orders, setOrders] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true); //стэйт загрузки

    React.useEffect(() => {
        try {
            async function dataOrders() {
                const { data } = await axios.get('https://640462ea80d9c5c7bac69b90.mockapi.io/orders')
                setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []))
                setIsLoading(false)
            }
            dataOrders()
        } catch(err) {
            alert('Нет данных')
        }
    }, [])

    return (
        <div className="content p-40">
            <div className="d-flex align-center mb-40 justify-between">
                <h1>Мои заказы</h1>
            </div>

            <div className="d-flex flex-wrap">
                {(isLoading ? [...Array(4)] : orders).map((item, index) => (
                    <Card
                        key={index}
                        isFavorite={favorites.some(obj => Number(obj.id) === Number(item.id))}
                        loading={isLoading}
                        {...item}
                    />
                ))}
            </div>
        </div>
    )
}

export default Orders;