import styled from "styled-components";

// Use to starts your posts with a giant capitalized letter like in books (in Harry Potter!)
// see for example: existe-tal-cosa-llamada-analisis-oo article
export const CapitalizeNextLine = styled.div`
  + p:first-letter {
    font-size: 72px;
    float: left;
    padding: 10px;
    background-color: #7f7664;
    margin-right: 10px;
    color: white;
    border-radius: 5px;
    line-height: 70px;
  }
`;
