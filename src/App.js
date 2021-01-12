import splitter from "./stringSplit";
import React, { useState, useCallback } from "react";
import { Table, Column, Cell } from "fixed-data-table-2";
import styled from "styled-components";
import { useDropzone } from "react-dropzone";
import { ScrollView } from "@cantonjs/react-scroll-view";

const WordCountApp = () => {
  const [textItself, setTextItself] = useState("");
  const [wordTable, setWordTable] = useState([]);
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onloadend = () => {
        // Do whatever you want with the file contents
        const string = reader.result;
        setTextItself(string);
        console.log(string);
        console.log(textItself);
        var result = splitter(string);
        console.log(result);
        setWordTable(result);
      };
      reader.readAsText(file);
    });
  }, []);
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <WrapperAll>
      <React.Fragment>
        <WrapperTitle>
          <Title>Word Count!</Title>
        </WrapperTitle>
        <DivInput {...getRootProps()}>
          <input
            {...getInputProps()}
            type="file"
            id="file"
            className="input-file"
            accept=".txt"
          />
          <Droptext>Drag-drop the file here, or click to select file!</Droptext>
        </DivInput>
        <div>
          <TextItselfdiv>{textItself}</TextItselfdiv>
          <Tabblediv>
            <Table
              rowHeight={30}
              rowsCount={wordTable.length}
              headerHeight={50}
              width={300}
              height={450}
            >
              <Column
                columnKey="0"
                header={<Cell>Word</Cell>}
                width={100}
                cell={({ rowIndex, columnKey }) => {
                  return <Cell>{wordTable[rowIndex][columnKey]}</Cell>;
                }}
              />
              <Column
                columnKey="1"
                header={<Cell>Times</Cell>}
                width={100}
                cell={({ rowIndex, columnKey }) => {
                  return <Cell>{wordTable[rowIndex][columnKey]}</Cell>;
                }}
              />
            </Table>
          </Tabblediv>
        </div>
      </React.Fragment>
    </WrapperAll>
  );
};
const TextItselfdiv = styled.div`
  height: 55vh;
  width: 33vw;
  top: 40vh;
  overflow: auto;
  position: absolute;
`;

const Tabblediv = styled.div`
  height: 55vh;
  width: 33vw;
  top: 40vh;
  left: 40vw;
  position: absolute;
  overflow: hidden;
`;
const Droptext = styled.p`
  text-align: center;
  color: #0f3057;
  font-weight: bold;
  font-size: 4vw;
  width: 100%;
  line-height: 20vh;
`;
const DivInput = styled.div`
  height: 20vh;
  width: 90vw;
  flex: 1;
  align-items: center;
  left: 4vw;
  border-width: 10px;
  border-radius: 20px;
  border-style: dashed;
  background-color: #fafafa;
  color: #bdbdbd;
  outline: none;
  transition: border 0.24s ease-in-out;
  position: relative;
`;
const Title = styled.h1`
  font-size: 5em;
  text-align: center;
  color: #ffd369;
  font-weight: bold;
`;
const WrapperTitle = styled.section`
  background: #008891;
`;
const WrapperAll = styled.section`
  background: #e7e7de;
  height: 100vh;
  width: 100vw;
  * {
    margin: 0;
    padding: 0;
  }
`;
export default WordCountApp;
