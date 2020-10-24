const FaunaAPI = require("./utils/faunaApi");
const { getUserId } = require("./utils/user");

const db = new FaunaAPI();

exports.handler = (event, context, callback) => {
  const { identity, user } = context.clientContext;

  if (!identity || !user) {
    return {
      statusCode: 401,
    };
  }

  const userId = getUserId(user);

  if (!userId) {
    return { 
      statusCode: 401
    };
  }

  db.user = userId;

  const path = event.path.replace(/\.netlify\/functions\/[^/]+/, "");
  const segments = path.split("/").filter((e) => e);

  let request = null;
  const collection = segments[0];

  switch (event.httpMethod) {
    case "GET":
      if (segments.length <= 2) {
        const id = segments[1];

        request = db.get(collection, id).then((response) => {
          if (!response.error) {
            if (!id) {
              const queryParams = event.queryStringParameters;
              const filters = queryParams.filters
                ? JSON.parse(queryParams.filters)
                : {};

                return {
                  data: filterData(collection, response.data, filters), // filter response
                };
            } else {
              if (response.data === null) {
                return {
                  error: {
                    not_found: true
                  }
                }
              }
            }
          }

          return response;
        });

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
        params,
        transformCreatePayload(collection)
      );
      break;
    }
    case "PUT":
      if (segments.length === 2) {
        const id = segments[1];
        const params = JSON.parse(event.body);
        request = db.replace(collection, id, params, transformReplacePayload(collection));
        break;
      } else {
        return {
          statusCode: 500,
          body:
            "invalid segments in PUT request, must be /.netlify/functions/db/123456",
        };
      }
    case "PATCH":
      if (segments.length === 2) {
        const id = segments[1];
        const params = JSON.parse(event.body);

        request = db.update(
          collection,
          id,
          params,
          transformUpdatePayload(collection)
        );
        break;
      } else {
        return {
          statusCode: 500,
          body:
            "invalid segments in PATCH request, must be /.netlify/functions/db/123456",
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
        if (data.error['not_found']) {
          return {
            statusCode: 400 // netlify hangs if 404 xD
          };
        }

        return {
          statusCode: 400,
          body: JSON.stringify({
            error: data.error instanceof Error ? data.error.toString() : data.error,
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
        value: data.value,
        description: data.description
      };
    };
  } else if (collection === 'collections') {
    return (data, q) => {
      return {
        name: data.name,
        description: data.description,
      };
    };
  }

  return (data) => data;
}

function transformCreatePayload(collection) {
  if (collection === "terms") {
    return (data, q) => {
      return {
        value: data.value,
        description: data.description,
        set: data.set_idq.Ref(q.Collection("collections"), data.set_id),
      };
    };
  } else if (collection === 'collections') {
    return (data, q) => {
      return {
        name: data.name,
        description: data.description,
      };
    };
  }

  return (data) => data;
}

function transformReplacePayload(collection) {
  if (collection === "terms") {
    return (data, q) => {
      return {
        value: data.value,
        description: data.description,
        set: data.set_id ? q.Ref(q.Collection("collections"), data.set_id) : undefined,
      };
    };
  } else if (collection === 'collections') {
    return (data, q) => {
      return {
        name: data.name,
        description: data.description,
      };
    };
  }

  return (data) => data;
}
