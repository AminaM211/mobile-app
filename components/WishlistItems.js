let items = [];

export const getWishlist = () => items;

export const addToWishlist = item => {
  if (!items.find(i => i.id === item.id)) items.push(item); 
};

export const removeFromWishlist = id => {
  items = items.filter(i => i.id !== id);                
};

let cart     = []; 

export const getCart = () => cart;

export const addToCart = item => {
  const found = cart.find(i => i.id === item.id);
  if (found) found.qty += 1;
  else cart.push({ ...item, qty: 1 });
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
  cart = cart.filter(i => i.id !== id);
};
