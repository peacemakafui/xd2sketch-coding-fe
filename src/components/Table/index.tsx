import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { formatFileSize, dateModified, fileType } from '@/utils/files';

interface ITable {
  columns: string[];
}

type IProps = ITable;

const StyledTable = styled.table`
  border: 1px solid #efefef;
  border-radius: 6px;
  border-spacing: 1;
  border-collapse: collapse;
`;

const StyledTableRowHeader = styled.tr`
  background-color: #ffffff;
  font-family: Arial;
  color: #2d0d85;
`;

const StyledTableHeader = styled.th`
  min-width: 150px;
  text-align: left;
  padding: 12px;
`;

const StyledTableRow = styled.tr`
  background-color: #f6f6f6;
  font-family: Arial;
  color: #2d0d85;
`;

const StyledTableData = styled.td`
  padding: 12px;
  border: none;
`;

export const Table: React.FC<IProps> = ({ columns }) => {
  const [fileInfos, setFileInfos]: [
    fileInfos: any,
    setFileInfos: any,
  ] = useState<[]>([]);

  const deleteFileInfo = async (uuid: any) => {
    try {
      const deleteFileInfo = await fetch(
        `http://localhost:5000/file-infos/${uuid}`,
        {
          method: 'DELETE',
        },
      );
      setFileInfos(fileInfos.filter((fileInfo: any) => fileInfo.uuid !== uuid));
    } catch (err) {
      console.log(err);
    }
  };

  const getFileInfo = async () => {
    try {
      const response = await fetch('http://localhost:5000/file-infos');
      const jsonData = await response.json();

      setFileInfos(jsonData);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getFileInfo();
  }, []);

  return (
    <StyledTable>
      <tbody>
        <StyledTableRowHeader>
          {columns.map((column) => (
            <StyledTableHeader>{column}</StyledTableHeader>
          ))}
        </StyledTableRowHeader>
        {fileInfos.map((fileInfo: any, index: number) => (
          <StyledTableRow key={index}>
            <StyledTableData>{fileInfo.filename}</StyledTableData>
            <StyledTableData>
              {formatFileSize(fileInfo.filesize)}
            </StyledTableData>
            <StyledTableData>
              {dateModified(fileInfo.lastmodified)}
            </StyledTableData>
            <StyledTableData>{fileType(fileInfo.filetype)}</StyledTableData>
            <StyledTableData>
              <button
                type="submit"
                onClick={() => deleteFileInfo(fileInfo.uuid)}
              >
                X
              </button>
            </StyledTableData>
          </StyledTableRow>
        ))}
      </tbody>
    </StyledTable>
  );
};
