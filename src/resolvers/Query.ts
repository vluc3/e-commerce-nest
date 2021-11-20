export const Query = {
  category: (parent: any, { id }, { database }) => {
    return database.categories.find((category: any) => category.id === id);
  },
  categories: (parent: any, args: any, { database }) => {
    return database.categories;
  },

  product: (parent: any, { id }, { database }) => {
    return database.products.find((product: any) => product.id === id);
  },
  products: (parent: any, { filter }, { database }) => {
    let result = database.products;

    if (filter) {
      const { onSale, avgRating } = filter;

      if (onSale !== null) {
        result = result.filter((product: any) => {
          return product.onSale === onSale;
        });
      }

      if ([1, 2, 3, 4, 5].includes(avgRating)) {
        result = result.filter((product: any) => {
          let sumRating = 0;
          let reviewCount = 0;

          database.reviews.forEach((review: any) => {
            if (review.productId === product.id) {
              sumRating += review.rating;
              reviewCount++;
            }
          });

          const avgProductRating = sumRating / reviewCount;
          return avgProductRating >= avgRating;
        });
      }
    }

    return result;
  },
};
