export const bookDemoApi = (
  first_name,
  last_name,
  email,
  phone,
  expectation
) => {
  return [
    `${process.env.NEXT_PUBLIC_PROXY_BASE}/api/book-demo`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        first_name,
        last_name,
        email,
        phone,
        expectation,
      }),
    },
  ];
};
