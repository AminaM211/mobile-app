let items = []; 

export const getWishlist = () => items;

export const addToWishlist = (item) => {
  if (!items.find(i => i.key === item.key)) items.push(item);
};

export const removeFromWishlist = (key) => {
  items = items.filter(i => i.key !== key);
};
