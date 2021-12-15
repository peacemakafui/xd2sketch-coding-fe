export const deleteFile = async (idPassed: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/file-infos/${idPassed}`,
    {
      method: 'DELETE',
    },
  );
  if (!response.ok) {
    const message = `An error has occured: ${response.status} - ${response.statusText}`;
    throw new Error(message);
  }
  return response;
};
