export const createChatApi = (name) => {
  return ["/api/create-chat-bot", { name: name }];
};

export const findAllChatsApi = (limit, offset_id) => {
  return ["/api/find-all-chat-bots", { limit, offset_id }];
};

export const findChatApi = (id) => {
  return ["/api/find-chat-bot", { id }];
};

export const getLeadsDataApi = (id, offset_id = null, limit = 20) => {
  return ["/api/get-leads-data", { id, offset_id, limit }];
};

export const updateChatApi = (
  id,
  name,
  systemPrompt,
  domains,
  firstMessage,
  allowedOrigins,
  llm,
  knowledge,
  dialogueText,
  logoId,
  leadLimit,
  tools,
  mode
) => {
  return [
    "/api/update-chat-bot",
    {
      id,
      name,
      system_prompt: systemPrompt,
      first_message: firstMessage,
      website_urls: domains,
      allowed_origins: allowedOrigins,
      llm,
      knowledge_base: knowledge,
      dialogue_text: dialogueText,
      logo_id: logoId,
      lead_limit: leadLimit,
      tools,
      chat_mode: mode,
    },
  ];
};
