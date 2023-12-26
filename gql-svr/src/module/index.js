import { mergeTypeDefs } from '@graphql-tools/merge';
import { loadFilesSync } from '@graphql-tools/load-files';
import { makeExecutableSchema } from '@graphql-tools/schema';
import path from 'path';

import * as user from './user';

const typesArray = loadFilesSync(path.join(__dirname, './**/*.graphql'));

const appSchema = mergeTypeDefs(typesArray, { all: true });

export default makeExecutableSchema({
  resolvers: {
    Query: {
      ...user.Query,
    },
    Mutation: {
      ...user.Mutation,
    },
    Subscription: {
      ...user.Subscription,
    },
  },
  typeDefs: [appSchema],
});
