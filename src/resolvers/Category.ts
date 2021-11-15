export const Category = {
  products: ({ id: categoryId }, { filter }, { database }) => {
    let filteredProducts = database.products.filter((product: any) => {
      return product.categoryId === categoryId;
    });

    if (filter) {
      const { onSale, avgRating } = filter;

      if (onSale !== null) {
        filteredProducts = filteredProducts.filter((product: any) => {
          return product.onSale === onSale;
        });
      }

      if ([1, 2, 3, 4, 5].includes(avgRating)) {
        filteredProducts = filteredProducts.filter((product: any) => {
          let sumRating: number = 0;
          let reviewCount: number = 0;

          database.reviews.forEach((review: any) => {
            if (review.productId === product.id) {
              sumRating += review.rating;
              reviewCount++;
            }
          });

          const avgProductRating: number = sumRating / reviewCount;
        });
      }
    }

    return filteredProducts;
  },
};
