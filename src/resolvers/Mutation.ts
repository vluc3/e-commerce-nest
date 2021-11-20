import { v4 as uuid } from 'uuid';

export const Mutation = {
  addCategory: (parent: any, { input }, { database }) => {
    const { name } = input;

    const result = {
      id: uuid(),
      name,
    };

    database.categories.push(result);
    return result;
  },
  updateCategory: (parent: any, { id, input }, { database }) => {
    const index: number = database.categories.findIndex(
      (category: any) => category.id === id,
    );

    if (index > -1) {
      database.categories[index] = {
        ...database.categories[index],
        ...input,
      };

      return database.categories[index];
    }

    return null;
  },
  deleteCategory: (parent: any, { id }, { database }) => {
    const length: number = database.categories.length;

    database.categories = database.categories.filter(
      (category: any) => category.id !== id,
    );

    const result: boolean = database.categories.length < length;

    if (result) {
      database.products = database.products.map((product: any) => {
        if (product.categoryId === id) {
          return {
            ...product,
            categoryId: null,
          };
        } else {
          return product;
        }
      });
    }

    return result;
  },
  addProduct: (parent: any, { input }, { database }) => {
    const {
      name,
      description,
      categoryId,
      image,
      price,
      onSale,
      quantity,
     } = input;

    const result = {
      id: uuid(),
      name,
      description,
      categoryId,
      image,
      price,
      onSale,
      quantity,
    };

    database.products.push(result);
    return result;
  },
  updateProduct: (parent: any, { id, input }, { database }) => {
    const index: number = database.products.findIndex(
      (product: any) => product.id === id,
    );

    if (index > -1) {
      database.products[index] = {
        ...database.products[index],
        ...input,
      };

      return database.products[index];
    }

    return null;
  },
  deleteProduct: (parent: any, { id }, { database }) => {
    const length: number = database.products.length;
    database.products = database.products.filter(
      (product: any) => product.id !== id,
    );
    const result: boolean = database.products.length < length;

    if (result) {
      database.reviews = database.reviews.filter(
        (review: any) => review.productId !== id,
      );
    }

    return result;
  },
  addReview: (parent: any, { input }, { database }) => {
    const { date, title, productId, comment, rating } = input;

    const result = {
      id: uuid(),
      date,
      title,
      productId,
      comment,
      rating,
    };

    database.reviews.push(result);
    return result;
  },
  updateReview: (parent: any, { id, input }, { database }) => {
    const index: number = database.reviews.findIndex(
      (review: any) => review.id === id,
    );

    if (index > -1) {
      database.reviews[index] = {
        ...database.reviews[index],
        ...input,
      };

      return database.reviews[index];
    }

    return null;
  },
  deleteReview: (parent: any, { id }, { database }) => {
    const length: number = database.reviews.length;
    database.reviews = database.reviews.filter(
      (review: any) => review.id !== id,
    );
    const result: boolean = database.reviews.length < length;
    return result;
  },
};
