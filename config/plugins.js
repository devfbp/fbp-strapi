module.exports = ({ env }) => ({
 /* graphql: {
    config: {
      apolloServer: {
        introspection: true,
      },
    },
  },
  /*'sendemail': {
    enabled: true,
    resolve: './src/plugins/sendemail'
  },*/
  graphql: {
    enabled: true,
    config: {
      endpoint: "/graphql",
      shadowCRUD: true,
      playgroundAlways: true,
      defaultLimit: 1000,
      maxLimit: 1000,
      apolloServer: {
        tracing: true,
	introspection: true
      },
    },
  },
  'fbp': {
    enabled: true,
    resolve: './src/plugins/fbp'
  },
 'import-export-entries': {
    enabled: true,
    config: {
      // See `Config` section.
    },
  },
  /*upload: {
    config: {
      provider: 'aws-s3',
      providerOptions: {
        accessKeyId: 'AKIASGDWBYABLH2XPFY7',
        secretAccessKey: '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',
        region: 'ap-south-1',
        params: {
          Bucket: 'fbp-strapi-upload'
        },
      },
      actionOptions: {
        upload: {},
        uploadStream: {},
        delete: {},
      },
    },
  },*/
});
