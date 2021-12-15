import { config } from 'process';
export const uploadFile = async (filePassed: object) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/file-infos`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(filePassed),
    },
  );
  if (!response.ok) {
    const message = `An error has occured: ${response.status} - ${response.statusText}`;
    throw new Error(message);
  }
  return response;
};
