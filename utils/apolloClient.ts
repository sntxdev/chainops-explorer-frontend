import { ApolloClient, InMemoryCache, split, HttpLink } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import WebSocket from 'isomorphic-ws';
import { WebSocketLink } from '@apollo/client/link/ws';

const httpLink = new HttpLink({
  uri: 'https://explorer.chainops.org/api/v1/graphql',
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: 'wss://explorer.chainops.org/api/v1/graphql',
    webSocketImpl: WebSocket,
  })
);

const splitLink =
  typeof window !== 'undefined'
    ? split(
        ({ query }) => {
          const { kind, operation }: any = getMainDefinition(query);
          return kind === 'OperationDefinition' && operation === 'subscription';
        },
        wsLink,
        httpLink
      )
    : httpLink;

// export default function createApolloClient() {
//   const ssrMode = typeof window === 'undefined';
//   let link;
//   if (ssrMode) {
//     link = httpLink;
//   } else {
//     link = createWSLink();
//   }
//   return new ApolloClient({
//     ssrMode,
//     link,
//     cache: new InMemoryCache(),
//   });
// }

const client = new ApolloClient({
  ssrMode: typeof window === 'undefined',
  link: splitLink,
  cache: new InMemoryCache(),
});
export default client;
