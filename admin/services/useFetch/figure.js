export const createFigureApi = (
  remix_id = "",
  image = "",
  name = "",
  properties = {}
) => {
  return ["/api/create-figure", { remix_id, image, name, properties }];
};

export const findAllFiguresApi = (remix_id, limit, offset_id) => {
  return ["/api/find-all-figures", { remix_id, limit, offset_id }];
};

export const updateFigureApi = (remix_id, id, image, name, properties) => {
  return [
    "/api/update-figure",
    {
      remix_id,
      id,
      image,
      name,
      properties,
    },
  ];
};
