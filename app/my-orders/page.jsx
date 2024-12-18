'use client'
import React ,{useState}from 'react'

const page = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [orders, setOrders] = useState([
    { id: 1, date: '2024-09-01', orderId: '12345', status: 'Delivered', price: '$99.99', details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' , img:'/images/product1.png'},
    { id: 2, date: '2024-09-02', orderId: '12346', status: 'Cancelled', price: '$55.00', details: 'Praesent ut efficitur sapien. Proin condimentum enim quis quam viverra.' , img:'/images/product2.png'},
    { id: 3, date: '2024-09-01', orderId: '12345', status: 'Delivered', price: '$99.99', details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', img:'/images/product3.png' },
    { id: 4, date: '2024-09-02', orderId: '12346', status: 'Pending', price: '$55.00', details: 'Praesent ut efficitur sapien. Proin condimentum enim quis quam viverra.' , img:'/images/product4.png' },
    { id: 5, date: '2024-09-01', orderId: '12345', status: 'Delivered', price: '$99.99', details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' , img:'/images/product1.png'},
    { id: 6, date: '2024-09-02', orderId: '12346', status: 'Cancelled', price: '$55.00', details: 'Praesent ut efficitur sapien. Proin condimentum enim quis quam viverra.' , img:'/images/product2.png'},
    { id: 7, date: '2024-09-01', orderId: '12345', status: 'Delivered', price: '$99.99', details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', img:'/images/product3.png' },
    { id: 8, date: '2024-09-02', orderId: '12346', status: 'Pending', price: '$55.00', details: 'Praesent ut efficitur sapien. Proin condimentum enim quis quam viverra.' , img:'/images/product4.png' }
  ]);
  const [activeOrder, setActiveOrder] = useState(null);
  const toggleAccordion = (orderId) => {
    setActiveOrder(activeOrder === orderId ? null : orderId);
  };
  const [filteredOrders, setFilteredOrders] = useState(orders);
const [showDescription , setShowDescription] = useState(false);
  const filterOrders = (status) => {
    setActiveFilter(status); // Corrected this line
    console.log(`Filtering orders by status: ${status}`);
    if (status === 'all') {
      setFilteredOrders(orders);
    } else {
      const filtered = orders.filter(order => order.status.toLowerCase() === status.toLowerCase());
      setFilteredOrders(filtered);
    }
  };

    
      return (
        <div className="container left-section-container">
          <div className="left-section">
            <h2 className="size2">My Orders</h2>
            <div className="filter">
          <button
            className={`filter-btn txtsize `}
            onClick={() => filterOrders('all')}
            style={activeFilter === 'all' ? {backgroundColor: 'rgb(0, 123, 255)',
              color: '#fff',}:undefined}
          >
            Order Success
          </button>
          <button
            className={`filter-btn txtsize`}
            onClick={() => filterOrders('Cancelled')}
            style={activeFilter === 'Cancelled' ? {backgroundColor: 'rgb(0, 123, 255)',
              color: '#fff',}:undefined}
          >
            Cancelled Orders
          </button>
          <button
            className={`filter-btn txtsize `}
            onClick={() => filterOrders('Delivered')}
            style={activeFilter === 'Delivered' ? {backgroundColor: 'rgb(0, 123, 255)',
              color: '#fff',}:undefined}
          >
            Fulfilled Orders
          </button>
          <button
            className={'filter-btn txtsize'}
            onClick={() => filterOrders('Pending')}
            style={activeFilter === 'Pending' ? {backgroundColor: 'rgb(0, 123, 255)',
              color: '#fff',}:undefined}
          >
            Pending Orders
          </button>
        </div>
          </div>
    
          <div className="right-section">
            <div className="accordion-header-fixed">
              <span style={{ visibility: 'hidden' }}><img src="/image/product1" alt="Astrology Consultation" className="order-image" /></span>
              <span>Date: </span>
              <span>Order ID: </span>
              <span>Status: </span>
              <span>Price: </span>
              <span className="icon" style={{ visibility: 'hidden' }}>+</span>
            </div>
            <div className="accordion">
              {filteredOrders.map(order => (
                <div className="accordion-item" key={order.id} data-order-id={order.id}>
                  <div className="accordion-header" onClick={() => toggleAccordion(order.id)}>
                    <span><img src={order.img} alt="Astrology Consultation" className="order-image" /></span>
                    <span>{order.date}</span>
                    <span>{order.orderId}</span>
                    <span className="order-status">{order.status}</span>
                    <span>{order.price}</span>
                    <span className="icon">+</span>
                  </div>
                  {activeOrder === order.id && (
                <div className="accordion-content">
                  <div className="order-items">
                    <div className="order-item">
                      <div className="item-info">
                        <p>{order.details}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
                </div>
              ))}
            </div>
          </div>
          <style jsx>{`
       



.container{
width:1260px;
margin:0 auto;
}

button .active {
  background-color: rgb(0, 123, 255);
  color: #fff;
}
      

.left-section {
    width: 17%;
    padding: 20px 0;
    padding-right: 10px;
    
    border-right: 1px solid #ddd;
    padding-right: 5px;
    height: 85%;
    
}
.left-section-container{
    display: flex;
}
.left-section>h2{
    /* margin: 20px; */
    margin-bottom: 10px;
  
    font-size: 18px;
}
.right-section {
  
    width: 100%;
    padding: 20px 0;
    padding-left: 10px;
}

.filter button {
    display: block;
    width: 100%;
    padding: 10px;
    /* margin-bottom: 10px; */
    margin-top: -5px;
    font-size: 16px;
    cursor: pointer;
    background-color: #f1f1f1;
    color: black;
}
.filter button:hover{
    background-color: #cddce7;
}


.accordion-item {
    border-bottom: 1px solid #ddd;
    /* margin-bottom: 10px; */
    border-radius: 4px;
}

.accordion-header {
    padding: 5px 15px;
    display: flex;
    justify-content: space-between;
    cursor: pointer;
    /* background-color: #f1f1f1; */
    // font-weight: bold;
    /* border-bottom: 1px solid #ddd; */
}

.accordion-header-fixed{
    padding: 15px;
    display: flex;
    justify-content: space-between;
    cursor: pointer;
    background-color: #f1f1f1;
    font-weight: bold;
    height: 48px;
    border-bottom: 1px solid #ddd;
    /* gap: 124px; */
    /* width: 200px; */
}

.accordion-header span {
    margin-right: 10px;
}

.accordion-header .icon {
    // font-weight: bold;
    font-size: 20px;
}

.accordion-content {
    // display: none;
    padding: 15px;
    background-color: #fafafa;
}

.order-item {
    display: flex;
    align-items: center;
}

.order-image {
    width: 50px;
    margin-right: 15px;
}

.order-actions {
    display: flex;
    margin-top: 10px;
}

.order-actions button {
    padding: 8px 12px;
    margin-right: 10px;
    cursor: pointer;
}

.accordion-item.active .icon {
    /* Minus to Plus */
    font-size: 20px;
}



@media only screen and (max-width: 768px) {
  .left-section-container{
    flex-direction: column;

  }
    .left-section{
        width: auto;
        position: static;
        padding: 4px;
    }

    .filter{
        display: flex;
        /* border-radius: 0; */
        box-shadow: rgba(33, 35, 38, 0.1) 0px 10px 10px -10px;
    }

    .filter-btn{
        border-radius: 0%;
    }
    .right-section{
        margin-left: 0;
        width: 100%;
        padding: 2px;
    }

    .accordion-header{
        font-size: 13px;
    }
    .accordion-header-fixed{
        font-size: 14px;
    }
        .container{
width:100%;
margin:0 auto;
}

.filter button {
    display: block;
    width: 100%;
    padding: 5px;
    /* margin-bottom: 10px; */
    margin-top: -5px;
    font-size: 14px;
    cursor: pointer;
    background-color: #f1f1f1;
    color: black;
}
.filter button:hover{
    background-color: #cddce7;
}


}
       
       
       
       
       
       
       
             `}</style>
        </div>
      );
}

export default page
