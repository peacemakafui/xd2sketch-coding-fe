import React from 'react';
import styled from 'styled-components';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IPrimaryButton {
  // Props
}

type IProps = IPrimaryButton;

const StyledButton = styled.button`
  background-color: #d8d8d8;
  border: 1px solid #979797;
  padding: 12px;
  color: #2d0d85;
`;

export const PrimaryButton: React.FC<IProps> = ({ children }) => (
  <StyledButton>{children}</StyledButton>
);
