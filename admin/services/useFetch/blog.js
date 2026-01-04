export const getBlogApi = (id) => {
  return ["/api/get-blog", { id: id }];
};

export const getAllBlogsApi = (limit, offset_id) => {
  return ["/api/get-all-blogs", { limit: limit, offset_id: offset_id }];
};
