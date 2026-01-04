export const createRemixApi = (name) => {
  return ["/api/create-remix", { name: name }];
};

export const findAllRemixesApi = (limit, offset_id) => {
  return ["/api/find-all-remixes", { limit, offset_id }];
};

export const findRemixApi = (id) => {
  return ["/api/find-remix", { id }];
};

export const updateRemixApi = (
  id,
  name,
  themes = {},
  categories = [],
  allowed_origins = [],
  system_prompt = ""
) => {
  return [
    "/api/update-remix",
    { id, name, themes, categories, allowed_origins, system_prompt },
  ];
};
