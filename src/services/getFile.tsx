export const getFile = async () => {
  const response = await fetch('http://localhost:5000/file-infos');
  const jsonData = await response.json();
  return jsonData;
};
