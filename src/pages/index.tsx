import Head from 'next/head';
import { Table } from '@/components/Table';
import { PrimaryButton } from '@/components/PrimaryButton';
import { SelectFileContainer } from '@/containers/SelectFileContainer';
import { useState, useEffect } from 'react';
import { isValidFileType } from '@/utils/files';
import { uploadFile } from '@/services/uploadFile';
import { getFile } from '@/services/getFile';
import { deleteFile } from '@/services/deleteFile';

import { StyledFileInput } from '@/components/FileInput/styledFileInput';
import { StyledButtonWrapper } from '@/components/ButtonWrapper/styledButton';

export default function Home() {
  const [selectedFile, setSelectedFile] = useState<File | null>();
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [fileInfos, setFileInfos]: [
    fileInfos: [],
    setFileInfos: Function,
  ] = useState([]);

  //Fetch file meta data
  const getFileInfo = async () => {
    try {
      const jsonData = await getFile();
      setFileInfos(jsonData);
    } catch (error) {
      console.log(error);
    }
  };

  //Delete file meta data
  const deleteFileInfo = async (uuid: string) => {
    try {
      const removeFile = await deleteFile(uuid);
      setFileInfos(
        fileInfos.filter(
          (fileInfo: { uuid: string }) => fileInfo.uuid !== uuid,
        ),
      );
    } catch (err) {
      console.log(err);
    }
  };

  const changeHandler: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (isValidFileType(e!.target!.files![0])) {
      setSelectedFile(e!.target!.files![0]);
      setIsFilePicked(true);
    } else {
      setIsFilePicked(false);
    }
  };

  const onSubmitForm: React.ChangeEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    try {
      const scFile = {
        filename: selectedFile!.name,
        filesize: selectedFile!.size,
        lastmodified: selectedFile!.lastModified,
        filetype: selectedFile!.type,
      };
      const response = await uploadFile(scFile);
      const data = await response.json();

      const result = {
        status: response.status + '-' + response.statusText,
        headers: {
          'Content-Type': response.headers.get('Content-Type'),
          'Content-Length': response.headers.get('Content-Length'),
        },
        data: data,
      };
      console.log(result.data);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const reset = () => {
    setIsFilePicked(false);
    setSelectedFile(null);
  };

  useEffect(() => {
    getFileInfo();
  }, []);
  return (
    <div>
      <Head>
        <title>Coding Challenge</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SelectFileContainer headline="Select a file">
        <form onSubmit={onSubmitForm}>
          <StyledFileInput
            type="file"
            name="file-info"
            onChange={changeHandler}
            accept=".pdf, .docx, .doc"
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
        fileInfos={fileInfos}
        deleteFileInfo={deleteFileInfo}
      />
    </div>
  );
}
