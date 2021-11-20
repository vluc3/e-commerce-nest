export const Category = {
  products: ({ id: categoryId }, { filter }, { database }) => {
    let result = database.products.filter((product: any) => {
      return product.categoryId === categoryId;
    });

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

          const avgProductRating: number = sumRating / reviewCount;
        });
      }
    }

    return result;
  },
};
