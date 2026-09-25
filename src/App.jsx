import Header from "./components/Header";
import { useState, useMemo } from "react"; // Añadimos useMemo
import { db } from "./data/db.js";
import Guitar from "./components/Guitar";

function App() {
  const [data, setData] = useState(db);
  const [auth, setAuth] = useState(false);
  const [cart, setCart] = useState([]);

 
  const cartTotal = useMemo(() => cart.reduce((acc, guitar) => acc + (guitar.price * guitar.quantity), 0), [cart]);

  function handlerClick(item) {
    const guitarExists = cart.findIndex((guitar) => guitar.id === item.id);
    
    if (guitarExists >= 0) {
      const updatedCart = [...cart];
      updatedCart[guitarExists].quantity += 1;
      setCart(updatedCart);
    } else {
      setCart((prevCart) => [...prevCart, { ...item, quantity: 1 }]);
    }
  }

  return (
    <>
      {}
      <Header cart={cart} total={cartTotal} />

      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {data.map((guitar) => (
            <Guitar 
              guitar={guitar} 
              handlerClick={handlerClick}
              key={guitar.id}
            />
          ))}
        </div>
      </main>

      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">
            GuitarLA - Todos los derechos Reservados
          </p>
        </div>
      </footer>
    </>
  );
}

export default App;