export const createProductApi = (
  remix_id = "",
  name = "",
  category = "",
  image = "",
  properties = {}
) => {
  return [
    "/api/create-product",
    { remix_id, name, category, image, properties },
  ];
};

export const findAllProductApi = (remix_id, limit, offset_id, category) => {
  return ["/api/find-all-products", { remix_id, limit, offset_id, category }];
};

export const findRemixCategoriesApi = (id) => {
  return ["/api/find-remix-categories", { id }];
};

export const updateProductApi = (
  remix_id,
  id,
  name = "",
  category = "",
  image = "",
  properties = {}
) => {
  return [
    "/api/update-product",
    {
      remix_id,
      id,
      name,
      category,
      image,
      properties,
    },
  ];
};
