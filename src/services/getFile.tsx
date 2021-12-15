export const getFile = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/file-infos`);
  if (!response.ok) {
    const message = `An error has occured: ${response.status} - ${response.statusText}`;
    throw new Error(message);
  }
  const jsonData = await response.json();
  return jsonData;
};
