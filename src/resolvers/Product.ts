export const Product = {
  category: ({ categoryId }, args: any, { database }) => {
    return database.categories.find(
      (category: any) => category.id === categoryId,
    );
  },
  reviews: ({ id }, args: any, { database }) => {
    return database.reviews.filter((review: any) => review.productId === id);
  },
};
