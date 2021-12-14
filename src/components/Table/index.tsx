import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { formatFileSize, convertToUtcString, fileType } from '@/utils/files';
import { deleteFile } from '@/services/deleteFile';
import { getFile } from '@/services/getFile';

interface ITable {
  columns: string[];
  fileInfos: object[];
  deleteFileInfo: Function;
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

export const Table: React.FC<IProps> = ({
  columns,
  fileInfos,
  deleteFileInfo,
}) => {
  return (
    <StyledTable>
      <tbody>
        <StyledTableRowHeader>
          {columns.map((column, index) => (
            <StyledTableHeader key={index}>{column}</StyledTableHeader>
          ))}
        </StyledTableRowHeader>
        {fileInfos.map((fileInfo: any, index: number) => (
          <StyledTableRow key={index}>
            <StyledTableData>{fileInfo.filename}</StyledTableData>
            <StyledTableData>
              {formatFileSize(fileInfo.filesize)}
            </StyledTableData>
            <StyledTableData>
              {convertToUtcString(fileInfo.lastmodified)}
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
