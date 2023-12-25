import Modal from "../UI/Modal";
import "./Cart.css";

const Cart = (props) => {
  const cartItems = <ul className="cart-items">{[{ id: "c1", name: "Sushi", amount: 2, price: 12.99 }].map(
    (item) => <li>{item.name}</li>
  )}</ul>;

  return (
   <Modal onClose={props.onClose}>
    {cartItems}
    <div className="total">
        <span>Total Amount</span>
        <span>35.62</span>
    </div>
    <div className="actions">
       <button className="button--alt" onClick={props.onClose}>Close</button>
       <button className="button">Order</button>
    </div>
   </Modal>
  );
};

export default Cart;
