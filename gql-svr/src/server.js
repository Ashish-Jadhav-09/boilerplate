import bodyParser from 'body-parser';
import compress from 'compression';
import cors from 'cors';
import { createServer } from 'http';
import Express from 'express';
import helmet from 'helmet';
import methodOverride from 'method-override';
import { ApolloServer } from 'apollo-server-express';
import { execute, subscribe } from 'graphql';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { ApolloServerPluginInlineTrace } from 'apollo-server-core';
import { UserAPI } from './datasource';

export default class Server {
  constructor(config) {
    this.config = config;
    this.app = new Express();
    this.run = this.run.bind(this);
  }

  get application() {
    return this.app;
  }

  /**
   * To enable all the setting on our express app
   * @returns -Instance of Current Object
   */
  bootstrap() {
    this.initHelmet();
    this.initCompress();
    this.initCors();
    this.initJsonParser();
    this.initMethodOverride();
    return this;
  }

  /**
   *
   * @returns -Instance of Current Object
   */
  run() {
    const { port, env } = this.config;
    this.httpServer.listen(port, () => {
      console.info(`server started on port ${port} (${env})`); // eslint-disable-line no-console
    });
    return this;
  }

  async setupApollo(schema) {
    const { app } = this;
    this.httpServer = createServer(app);
    this.server = new ApolloServer({
      schema,
      nodeEnv: this.config.env,
      debug: true,
      csrfPrevention: true,
      cache: 'bounded',
      cors: {
        origin: [
          'https://studio.apollographql.com/',
        ],
      },
      plugins: [ApolloServerPluginInlineTrace()],
      dataSources: () => ({
        userApi: new UserAPI(),
      }),
      context: ({ req }) => ({
        authorization: req.headers.authorization,
      }),
      onHealthCheck: () => Promise.resolve('I am OK'),
    });
    await this.server.start();
    this.server.applyMiddleware({ app });
    SubscriptionServer.create(
      {
        schema,
        execute,
        subscribe,
      },
      {
        server: this.httpServer,
        path: this.server.graphqlPath,
      },
    );
    this.run();
  }

  /**
   * Compression of the output
   */
  initCompress() {
    this.app.use(compress());
  }

  /**
   *
   * Lets you to enable cors
   */
  initCors() {
    this.app.use(cors());
  }

  /**
   *
   * Helmet helps you secure your Express apps by setting various HTTP headers.
   */
  initHelmet() {
    this.app.use(
      helmet.permittedCrossDomainPolicies({
        permittedPolicies: 'by-content-type',
      }),
    );
  }

  /**
   *  - Parses urlencoded bodies & JSON
   */
  initJsonParser() {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
  }

  /**
   *
   * Lets you use HTTP verbs such as PUT or DELETE in places where the client doesn't support it.
   */
  initMethodOverride() {
    this.app.use(methodOverride());
  }
}
