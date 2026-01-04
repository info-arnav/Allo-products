export const startMultipartApi = (
  filename,
  type,
  file_size,
  thumbnail,
  thumbnail_type
) => {
  return [
    "/file/start-multipart",
    { filename, type, file_size, thumbnail, thumbnail_type },
  ];
};

export const getPrartUrlApi = (filename, partNumber, uploadId) => {
  return ["/file/get-part-url", { filename, partNumber, uploadId }];
};

export const completeMultipartApi = (filename, uploadId, parts, hash) => {
  return ["/file/complete-multipart", { filename, uploadId, parts, hash }];
};

export const viewAllFilesApi = (parent_id, offset_id, file_type = null) => {
  return ["/file/view-all-files", { parent_id, offset_id, file_type }];
};

export const viewFileApi = (filename) => {
  return ["/file/view-file", { filename: filename }];
};
