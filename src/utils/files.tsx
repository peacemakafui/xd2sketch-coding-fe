const GB_TO_BYTES_RATIO = 1073741824;
const MB_TO_BYTES_RATIO = 1048576;
const KB_TO_BYTES_RAIO = 1024;

const validExtensions = [
  `application/vnd.openxmlformats-officedocument.wordprocessingml.document`,
  `application/msword`,
  `application/pdf`,
];

export const fileType = (format: string) => {
  if (format == validExtensions[2]) {
    return 'pdf';
  } else if (format == validExtensions[1]) {
    return 'doc';
  } else if (format == validExtensions[0]) {
    return 'docx';
  }
};
export const convertToUtcString = (epoch: number) => {
  return new Date(Number(epoch)).toUTCString();
};
export const isValidFileType = (file: File) =>
  validExtensions.indexOf(file.type) > -1;

export const formatFileSize = (bytes: number): string => {
  if (bytes / GB_TO_BYTES_RATIO > 1) {
    return `${(bytes / GB_TO_BYTES_RATIO).toFixed(2)} GB`;
  }
  if (bytes / MB_TO_BYTES_RATIO > 1) {
    return `${(bytes / MB_TO_BYTES_RATIO).toFixed(2)} MB`;
  }

  if (bytes / KB_TO_BYTES_RAIO > 1) {
    return `${(bytes / KB_TO_BYTES_RAIO).toFixed(2)} KB`;
  }
  return `${bytes} B`;
};
