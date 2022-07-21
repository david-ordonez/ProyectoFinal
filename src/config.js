export default {
  tipoInicio : process.env.INICIO || 'fork',
  port: process.env.PORT || 8080,
  fileSystem: {
    dbFolder: "./DB/",
  },
  mongodb: {
    mongoUrl: 'mongodb+srv://dordonez:00Gd801011_@cluster0.thmqy.mongodb.net/ecommerce',
    mongoOptions: { 
      useNewUrlParser: true, 
      useUnifiedTopology: true 
    }
  },
  firebase: {
    databaseURL: "https://coderhouse-725d3.firebaseio.com",
    jsonConfig: {
      type: "service_account",
      project_id: "coderhouse-ac017",
      private_key_id: "2570411aab864d8ed276b8c5be948c95c76481d9",
      private_key:
        "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDYRLu9kZSHp2UM\ndMjy7L+dVRZXa0Inc2oK/Uqb65VrvyHsWEc5zOfsDlPGsjn/A/OFDU7UN6mrC/Lb\nV992fe6LLUQXJ7cRBI57Ipl+6rwQcfkiPvW2IOcwCH+h3ihH6SGyFY1nD0KFUEA6\neAvSGWuNUjFM8/2cqiJ9G3ArpgHkisycSbwRTvRonXB9Cw5SMKrBgxgmf55AN014\nQVlinBFWcBhfJDemfldpzISGJfo60li+kjdk8qny28nTNIf0hx8L7SCjJNxIMOpd\neFyjHzsME9uHogacX01smSpK3LWMHk9oIEo0wxa/fP0ys/GGcPODKnso8zMqZodt\nI1hUD8kFAgMBAAECggEABZIq5LFsVw/VbYjqNQyRZXC8q5g3hj0JEHfORTTAKGj7\nBO1dOe+9ha1bNE7naY2x5zQcwYceV5A7CEvVYmY23KtYCeF1a/qaRP4mLOIurmnE\nYvQMoxo3E/V6fDJbbUbKUTd26TgeaY3tdm22a3B8mCsm2lzRCqKwH4x//jY/h27z\nvhgg3Z36wi7gdLEnxRLfoSYA5Uk6DhmuGlXRTKWhhZnJqiPxcCx3JUTt23hukLNm\nacH/vXG0tFbCMJjXffW9Bsy87DxYboLIXHiMSWDsRerSucrgLjm9Y0xLVbzvcGNe\nuj6aOjGSXk113AABd+bVr+FSBFW8s76A1lyyWGnu3QKBgQD4Vl2s3DXuAWeOFUCz\n1FlebRrI+H6jkxaGi4hCcfwacxOFepwxhC56tkROL430Oy2kan07mIpHBHkpdaKJ\nAy8R8txRDrPil+gm2nBt4F2tSt+cc/gH65jkTDDGd/1x9duSWr2lXg2T+qmDAXqq\nqfVMjrozRJHiWUfjIRoI3DJzQwKBgQDe8Q2bwaGv+Tw3klbS+x68VAncV/1hC30g\nNV76uZb98yVd3BGQvxAA1QDHH/1YKvUOh+Fw8xl6+YGSa9meEwivNhhYD4Cs1BmA\nYzM/ahr7zzs+5Hkj6wwp03Po3lNVVy0/pKR5tnCkLeDjXHY53VEK9a5RSROb/PFs\n4KeEIaj6FwKBgESlexeBd9bmxH1eGpibJmkXt8O+DSOiUSO4Bl53q7yT+t122x5E\n76Q0JgWG17KfeSpt1VhX/kFLV0LCpb9CBgzsGUK+0bLdUusKjvGQh9STUeSpmfJ2\nibjx5rm2CXUrBRsbwjioGxDAxYLVMddjS89x1L6/QaRUEa8TQ2MXm0qJAoGAZ0Ha\nfbOXQbv8Kfj7gciRmcSKtKWEU7hQgeR2U0Y2KvS879YHxLTZoqkFLTUhz/5Fdi91\nOS0/NffuDXUqW86RDSXO7KpxfJrYHODVUZ/BU7PNyvljKkGpZo3rd4XRrwsrh/in\nvT/EuCYPrP6cO3zIFn1n+XoRPQRQhY8fx1EXxI0CgYB68Z5xwGeWkvzbuTFeflXq\nKuy+8Ct+qFR2yHHLFVT+GU5tsfug3hvSsiG/WHUHCRsFq7dVWxsmNMlUIxuAY1HX\nQRx42RvxfmGaCQXAJuYYOLiMrJcV+DFL9Oju8UXhWiopnCTPu2z7jodaxKDDqOsP\nDRtp0MnLgCh/3thTRDYqCQ==\n-----END PRIVATE KEY-----\n",
      client_email:
        "firebase-adminsdk-vnc6d@coderhouse-ac017.iam.gserviceaccount.com",
      client_id: "111262360652481642652",
      auth_uri: "https://accounts.google.com/o/oauth2/auth",
      token_uri: "https://oauth2.googleapis.com/token",
      auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
      client_x509_cert_url:
        "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-vnc6d%40coderhouse-ac017.iam.gserviceaccount.com",
    },
  },
  sqlite3: {
    client: "sqlite3",
    connection: {
      filename: "./DB/ecommerce.sqlite",
    },
    useNullAsDefault: true,
    debug: true,
  },
  mariaDb: {
    client: "mysql",
    connection: {
      host: "127.0.0.1",
      user: "root",
      password: "my-secret-pw",
      database: "ecommerce",
    },
  },
};
