const faunadb = require("faunadb");

const q = faunadb.query;
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SECRET,
});

class FaunaAPI {
  constructor() {
    this._user = null;
  }

  set user (userId) {
    this._user = userId;
  }

  async create(collection, params, transformPayload) {
    try {
      const created = await client.query(
        q.Create(q.Collection(collection), {
          data: {
            ...transformPayload(params, q),
            user: this._user
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
      const document = await client.query(
        q.Get(q.Ref(q.Collection(collection), id))
      );

      if (document && document.data && document.data.user === this._user) {
        const updated = await client.query(
          q.Update(q.Ref(q.Collection(collection), id), {
            data: {
              ...transformPayload(params, q)
            },
          })
        );
  
        return updated;
      }

      throw new Error();
    } catch (error) {
      return {
        error,
      };
    }
  }

  async replace(collection, id, params) {
    try {
      const document = await client.query(
        q.Get(q.Ref(q.Collection(collection), id))
      );

      if (document && document.data && document.data.user === this._user) {
        const replaced = await client.query(
          q.Replace(q.Ref(q.Collection(collection), id), {
            data: {
              ...params,
              user: this._user
            },
          })
        );

        return replaced;
      }

      throw new Error();
    } catch (error) {
      return {
        error,
      };
    }
  }

  async remove(collection, id) {
    try {
      const document = await client.query(
        q.Get(q.Ref(q.Collection(collection), id))
      );
        
      if (document && document.data && document.data.user === this._user) {
        const deleted = await client.query(
          q.Delete(q.Ref(q.Collection(collection), id))
        );

        return deleted;
      }

      throw new Error('Wrong document');
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

        if (document && document.data && document.data.user === this._user) {
          return {
            data: document,
          };  
        }

        return { data: null };
      }

      const refs = await client.query(
        q.Paginate(
          q.Match(q.Index(`${collection}Index`), this._user)
        )
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
