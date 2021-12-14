export const deleteFile = async (idPassed: string) => {
  const response = await fetch(`http://localhost:5000/file-infos/${idPassed}`, {
    method: 'DELETE',
  });
  return response;
};
