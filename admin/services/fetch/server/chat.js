export const getChatMetaApi = (id) => {
  return [
    `${process.env.DATABASE_URI}/api/meta-data/chat`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ chat_id: id }),
    },
  ];
};
