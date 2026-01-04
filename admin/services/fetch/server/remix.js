export const getRemixMetaApi = (id) => {
  return [
    `${process.env.DATABASE_URI}/api/meta-data/remix`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ chat_id: id }),
    },
  ];
};
