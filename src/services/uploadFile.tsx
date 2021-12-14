import { config } from 'process';
export const uploadFile = async (filePassed: object) => {
  const response = await fetch(`http://localhost:5000/file-infos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(filePassed),
  });
  return response;
};
