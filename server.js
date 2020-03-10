// IMPORTS
const fastify = require('fastify')()

// CROS
fastify.register(require('fastify-cors'), {
  origin : true,
  exposedHeaders: ['Content-Type']
})

// CONNECTION A LA BD mySQL
fastify.register(require('fastify-mysql'), {
    promise: true,
    host: 'localhost',
    port: '3308',
    user: 'root',
    password: '@Bacoon17!',
    database: 'ffdoo'
}) 

// ROUTES
fastify.register(require('./routes/appRoute'), {prefix: '/characters'})

// LISTENER
const start = async () => {
  try {
    await fastify.listen(3001)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()