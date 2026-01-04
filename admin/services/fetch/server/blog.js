export const getServerBlogCountApi = () => {
  return [
    `${process.env.DATABASE_URI}/api/get-blog-count`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    },
  ];
};

export const getServerAllBlogsApi = (start, limit) => {
  return [
    `${process.env.DATABASE_URI}/api/get-all-blogs-server`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ offset: start, limit: limit }),
    },
  ];
};

export const getBlogMetaApi = (id) => {
  return [
    `${process.env.DATABASE_URI}/api/meta-data/blog`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ blog_id: id }),
      next: { revalidate: 60 },
    },
  ];
};
