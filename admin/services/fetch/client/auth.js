export const googleLoginApi = (fingerprint, code) => {
  return [
    `${process.env.NEXT_PUBLIC_PROXY_BASE}/auth/google-sign-in`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Device-Fingerprint": fingerprint,
      },
      credentials: "include",
      body: JSON.stringify({ code: code }),
    },
  ];
};

export const signInApi = (fingerprint, email, password) => {
  return [
    `${process.env.NEXT_PUBLIC_PROXY_BASE}/auth/sign-in`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Device-Fingerprint": fingerprint,
      },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    },
  ];
};

export const signUpApi = (fingerprint, email, password) => {
  return [
    `${process.env.NEXT_PUBLIC_PROXY_BASE}/auth/sign-up`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Device-Fingerprint": fingerprint,
      },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    },
  ];
};

export const revokeTokenApi = (fingerprint, refresh_token) => {
  return [
    `${process.env.NEXT_PUBLIC_PROXY_BASE}/auth/revoke-token-body`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Device-Fingerprint": fingerprint,
      },
      credentials: "include",
      body: JSON.stringify({ refresh_token: refresh_token }),
    },
  ];
};

export const updateTokenApi = (old_fingerprint, new_fingerprint) => {
  return [
    `${process.env.NEXT_PUBLIC_PROXY_BASE}/auth/update-token`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Device-Fingerprint": new_fingerprint,
        "X-Device-Fingerprint-Old": old_fingerprint,
      },
      credentials: "include",
    },
  ];
};

export const logoutApi = (fingerprint) => {
  return [
    `${process.env.NEXT_PUBLIC_PROXY_BASE}/auth/revoke-token`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Device-Fingerprint": fingerprint,
      },
      credentials: "include",
    },
  ];
};

export const verifyUserApi = (user, code) => {
  return [
    `${process.env.NEXT_PUBLIC_PROXY_BASE}/auth/verify-user`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ user, code }),
    },
  ];
};

export const revokeUserApi = (user, code) => {
  return [
    `${process.env.NEXT_PUBLIC_PROXY_BASE}/auth/revoke-user`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ user, code }),
    },
  ];
};
