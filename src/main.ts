import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { ApolloServer } from 'apollo-server';

import { schemas } from './schemas';

import { Query } from './resolvers/Query';
import { Mutation } from './resolvers/Mutation';

import { Category } from './resolvers/Category';
import { Product } from './resolvers/Product';

import { categories } from './database/categories';
import { products } from './database/products';
import { reviews } from './database/reviews';

const database = {
  categories,
  products,
  reviews
}

const apolloServer = new ApolloServer({
  typeDefs: schemas,
  resolvers: {
    Query,
    Mutation,
    Category,
    Product
  },
  context: {
    database
  }
});

async function bootstrap() {
  apolloServer.listen().then(({ url }) => {
    console.log();
    console.log(`Apollo server is ready at ${url}`);
  });

  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}

bootstrap();
