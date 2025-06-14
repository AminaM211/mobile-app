let items = [];

export const getWishlist = () => items;

export const addToWishlist = item => { //voegt item toe aan wishlist als het er nog niet in zit
  if (!items.find(i => i.id === item.id)) items.push(item); 
};

export const removeFromWishlist = id => {
  items = items.filter(i => i.id !== id); //Verwijdert het item met dat id uit de lijst.               
};

let cart = []; // lijst met alle producten die aan cart zijn toegevoegd.

export const getCart = () => cart; // Geeft de inhoud van de cart terug

export const addToCart = item => {
  const found = cart.find(i => i.id === item.id);
  if (found) found.qty += 1; // product zit er al in? q + 1
  else cart.push({ ...item, qty: 1 }); // product zit er nog niet in? voeg toe met qty 1
};

export const incrQty = id => {
  const it = cart.find(i => i.id === id);
  if (it) it.qty += 1;
};

export const decrQty = id => {
  const it = cart.find(i => i.id === id);
  if (it) {
    it.qty -= 1;
    if (it.qty <= 0) removeFromCart(id);
  }
};

export const removeFromCart = id => {
  cart = cart.filter(i => i.id !== id); // id = product id -> verwijdert het item met dat id uit de lijst.
};
