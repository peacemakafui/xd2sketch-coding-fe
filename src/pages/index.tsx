import Head from 'next/head';
import { Table } from '@/components/Table';
import { PrimaryButton } from '@/components/PrimaryButton';
import { SelectFileContainer } from '@/containers/SelectFileContainer';
import styled from 'styled-components';
import { useState } from 'react';
import { isValidFileType } from '@/utils/files';
const StyledFileInput = styled.input`
  border: 1px solid #979797;
  border-radius: 6px;
  padding: 12px 24px;
  margin: 12px 0;
`;

const StyledButtonWrapper = styled.div`
  display: flex;
`;

export default function Home() {
  const [selectedFile, setSelectedFile] = useState<File | null>();
  const [isFilePicked, setIsFilePicked] = useState(false);

  const changeHandler = (e: any) => {
    if (isValidFileType(e.target.files[0])) {
      setSelectedFile(e.target.files[0]);
      setIsFilePicked(true);
    } else {
      setIsFilePicked(false);
    }
  };

  const onSubmitForm = async (e: any) => {
    e.preventDefault();
    try {
      const scFile = {
        filename: selectedFile.name,
        filesize: selectedFile.size,
        lastmodified: selectedFile.lastModified,
        filetype: selectedFile.type,
      };
      const response = await fetch('http://localhost:5000/file-infos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(scFile),
      });
      window.location = '/';
    } catch (error) {}
  };

  const reset = () => {
    setIsFilePicked(false);
    setSelectedFile(null);
  };
  return (
    <div>
      <Head>
        <title>Coding Challenge</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SelectFileContainer headline="Select a file">
        <form onSubmit={onSubmitForm}>
          {!isFilePicked ? (
            <p>Only ".doc",".pdf" and ".docx" files are allowed</p>
          ) : null}
          <StyledFileInput
            type="file"
            name="file-info"
            onChange={changeHandler}
          />

          {isFilePicked && (
            <StyledButtonWrapper>
              <PrimaryButton>
                <button onClick={reset}>Reset File</button>
              </PrimaryButton>
              <PrimaryButton>
                <button>Save File</button>
              </PrimaryButton>
            </StyledButtonWrapper>
          )}
        </form>
      </SelectFileContainer>
      <Table
        columns={[`Filename`, `File Size`, `Last Modified`, `File Format`, ``]}
      />
    </div>
  );
}
