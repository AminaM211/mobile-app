let items = [];

export const getWishlist = () => items;

export const addToWishlist = item => {
  if (!items.find(i => i.id === item.id)) items.push(item); 
};

export const removeFromWishlist = id => {
  items = items.filter(i => i.id !== id);                
};
