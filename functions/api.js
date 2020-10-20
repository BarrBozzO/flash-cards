const FaunaAPI = require("./utils/faunaApi");

const db = new FaunaAPI();

exports.handler = (event, context, callback) => {
  const path = event.path.replace(/\.netlify\/functions\/[^/]+/, "");
  const segments = path.split("/").filter((e) => e);

  let request = null;
  const collection = segments[0];

  switch (event.httpMethod) {
    case "GET":
      if (segments.length <= 2) {
        const id = segments[1];

        request = db.get(collection, id);

        if (!id) {
          const queryParams = event.queryStringParameters;
          const filters = queryParams.filters
            ? JSON.parse(queryParams.filters)
            : {};

          request = request.then((response) => {
            if (!response.error) {
              return {
                data: filterData(collection, response.data, filters), // filter response
              };
            }

            return response;
          });
        }

        break;
      } else {
        return {
          statusCode: 500,
          body: "too many segments in GET request",
        };
      }
    case "POST": {
      const params = JSON.parse(event.body);
      request = db.create(
        collection,
        {
          value: params.value,
          description: params.description,
          set_id: params.set_id,
        },
        transformCreatePayload(collection)
      );
      break;
    }
    case "PUT":
      if (segments.length === 2) {
        const id = segments[1];
        const params = JSON.parse(event.body);
        request = db.replace(collection, id, {
          name: params.name,
          description: params.description,
          set_id: params.set_id,
        });
        break;
      } else {
        return {
          statusCode: 500,
          body:
            "invalid segments in POST request, must be /.netlify/functions/db/123456",
        };
      }
    case "PATCH":
      if (segments.length === 2) {
        const id = segments[1];
        const params = JSON.parse(event.body);

        request = db.update(
          collection,
          id,
          {
            name: params.name,
            description: params.description,
            set_id: params.set_id,
          },
          transformUpdatePayload(collection)
        );
        break;
      } else {
        return {
          statusCode: 500,
          body:
            "invalid segments in POST request, must be /.netlify/functions/db/123456",
        };
      }
    case "DELETE":
      if (segments.length === 2) {
        const id = segments[1];
        request = db.remove(collection, id);
        break;
      } else {
        return {
          statusCode: 500,
          body:
            "invalid segments in DELETE request, must be /.netlify/functions/db/123456",
        };
      }
  }

  if (!request) {
    return {
      statusCode: 500,
      body: "unrecognized HTTP Method, must be one of GET/POST/PUT/DELETE",
    };
  }

  return request
    .then((data) => {
      if (data.error) {
        return {
          statusCode: 400,
          body: JSON.stringify({
            error: data.error,
          }),
        };
      }

      return {
        statusCode: 200,
        body: JSON.stringify(data),
      };
    })
    .catch((err) => {
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: err,
        }),
      };
    });
};

function filterData(collection, data, filters) {
  if (!filters) return data;

  try {
    if (collection === "terms") {
      if (filters.set_id) {
        return data.filter((item) => {
          return (
            item.data && item.data.set && item.data.set.id === filters.set_id
          );
        });
      }
    }

    return data;
  } catch (err) {
    console.error(err);
    throw new Error("Wrong filters object provided");
  }
}

function transformUpdatePayload(collection) {
  if (collection === "terms") {
    return (data, q) => {
      return {
        ...data,
        set: q.Ref(q.Collection("collections"), data.set_id),
      };
    };
  }

  return (data) => data;
}

function transformCreatePayload(collection) {
  if (collection === "terms") {
    return (data, q) => {
      return {
        ...data,
        set: q.Ref(q.Collection("collections"), data.set_id),
      };
    };
  }

  return (data) => data;
}
