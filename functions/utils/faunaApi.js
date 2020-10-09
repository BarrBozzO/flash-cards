const faunadb = require("faunadb");

const q = faunadb.query;
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SECRET,
});

class FaunaAPI {
  async create(collection, params, transformPayload) {
    try {
      const created = await client.query(
        q.Create(q.Collection(collection), {
          data: {
            ...transformPayload(params, q),
          },
        })
      );

      return created;
    } catch (error) {
      return {
        error,
      };
    }
  }

  async update(collection, id, params, transformPayload) {
    try {
      const updated = await client.query(
        q.Update(q.Ref(q.Collection(collection), id), {
          data: {
            ...transformPayload(params, q),
          },
        })
      );

      return updated;
    } catch (error) {
      return {
        error,
      };
    }
  }

  async replace(collection, id, params) {
    try {
      const replaced = await client.query(
        q.Replace(q.Ref(q.Collection(collection), id), {
          data: {
            ...params,
          },
        })
      );

      return replaced;
    } catch (error) {
      return {
        error,
      };
    }
  }

  async remove(collection, id) {
    try {
      const deleted = await client.query(
        q.Delete(q.Ref(q.Collection(collection), id))
      );

      return deleted;
    } catch (error) {
      return {
        error,
      };
    }
  }

  async get(collection, id) {
    try {
      if (id) {
        const document = await client.query(
          q.Get(q.Ref(q.Collection(collection), id))
        );

        return {
          data: document,
        };
      }

      const refs = await client.query(
        q.Paginate(q.Documents(q.Collection(collection)))
      );

      if (refs.data) {
        const itemRefs = refs.data;

        const getAllItemsDataQuery = itemRefs.map((ref) => {
          return q.Get(ref);
        });

        const documents = await client.query(getAllItemsDataQuery);

        return {
          data: documents,
        };
      }
    } catch (error) {
      return {
        error,
      };
    }
  }
}

module.exports = FaunaAPI;
