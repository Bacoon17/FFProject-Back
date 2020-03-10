async function routes(fastify, options) {

    // fastify.get(path, [options], handler)

    fastify.get('/all', async (req, reply) => {

        const connection = await fastify.mysql.getConnection();

        try {
            const [rows, fields] = await connection.query(
                'SELECT * FROM characters'
            );
            return rows;
        }
        catch (error) {
            return reply.status(500).send();
        }
        finally {
            connection.release();
        }

    })

    fastify.get('/:id', async (req, reply) => {

        const connection = await fastify.mysql.getConnection();

        try {
            const [rows, fields] = await connection.query(
                'SELECT * FROM characters WHERE id=?',
                [req.params.id]
            );
            return rows[0];
        }
        catch (error) {
            return error;
        }
        finally {
            connection.release();
        }

    })

    // fastify.post(path, [options], handler)

    fastify.post('/add', async (req, reply) => {

        // VERIF AUTH

        // VERIF DONNEES
        let ajouts = JSON.parse(req.body);
        var insert = [];
        for (const ajout of ajouts) {
            insert.push(Object.keys(ajout).map(function (v) { return ajout[v]; }))
        }
        //if donnee false : return error 400

        // ENVOI DONNEES
        const connection = await fastify.mysql.getConnection();
        try {
            console.log(insert);
            var sql = 'INSERT INTO characters (`name`, `episode`, `cristal`, `weapon`, `voice`) VALUES ?'
            let res= await connection.query(
                sql,
                [insert]
            )
            return reply.status(204).send();
        }
        catch (error) {
            return error;
        }
        finally {
            connection.release();
        }

    })



};

module.exports = routes;