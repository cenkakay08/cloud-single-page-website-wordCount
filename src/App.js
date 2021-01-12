import splitter from "./stringSplit";
import React, { useState, useCallback } from "react";
import styled from "styled-components";
import { useDropzone } from "react-dropzone";
import { ScrollView } from "@cantonjs/react-scroll-view";

const WordCountApp = () => {
  const [wordTable, setWordTable] = useState("");
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onloadend = () => {
        // Do whatever you want with the file contents
        const string = reader.result;
        console.log(string);
        var result = splitter(string);
        console.log(result);
        setWordTable(result);
      };
      reader.readAsText(file);
    });
  }, []);
  const { getRootProps, getInputProps } = useDropzone({ onDrop });
  const createTable = () => {
    let table = [];
    table.push(
      <tr>
        <td>Word</td>
        <td>Times</td>
      </tr>
    );
    // Outer loop to create parent
    for (let i = 0; i < wordTable.length; i++) {
      let children = [];
      //Inner loop to create children
      for (let j = 0; j < 2; j++) {
        children.push(<td>{wordTable[i][j]}</td>);
      }
      //Create the parent and add the children
      table.push(<tr>{children}</tr>);
    }
    return table;
  };
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
        <Scrolldiv>
          <ScrollView
            style={{
              height: "63vh",
              position: "relative",
              background: "#c1a1d3",
              width: "20vw",
            }}
          >
            <table>{createTable()}</table>
          </ScrollView>
        </Scrolldiv>
      </React.Fragment>
    </WrapperAll>
  );
};

const Scrolldiv = styled.div`
  height: 63vh;
  width: 25vw;
  left: 45vw;
  position: relative;
`;
const Droptext = styled.p`
  text-align: center;
  color: #0f3057;
  font-weight: bold;
  font-size: 3.5em;
  width: 100%;
  line-height: 250%;
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
