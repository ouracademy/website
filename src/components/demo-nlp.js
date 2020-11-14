import axios from "axios";
import { Anchor, Box, Heading, TextInput } from "grommet";
import React, { useState } from "react";

export const NLP = () => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [IEResult, setIEResult] = useState(null);

  const checkUrlIsValid = (url) => {
    try {
      url = new URL(url);
      return true;
    } catch (_) {
      return false;
    }
  };

  const search = (url) => {
    setUrl(url);
    if (!checkUrlIsValid(url)) return;
    setLoading(true);
    axios
      .get(`https://iiycpfov33.execute-api.us-east-1.amazonaws.com/nlp`, {
        params: { url: url },
      })
      .then(({ data }) => {
        setIEResult(data["data"]);
        setLoading(false);
      });
  };

  return (
    <Box basis="auto" pad="medium" round="medium" background="#f5f5f5">
      <Heading level="3">
        <span>Demo</span>
      </Heading>

      <Box basis="auto" background="white">
        <TextInput
          placeholder="Pega una url aqui"
          value={url}
          onChange={(event) => search(event.target.value)}
        />
        {loading ? "Espere un momento ..." : ""}
      </Box>

      {IEResult ? (
        <div className="results">
          <Box basis="auto">
            <Heading level="4">
              <span>Titulo del artículo: {IEResult.title}</span>
            </Heading>
            <Heading level="4">
              <span>
                Palabras clave:{" "}
                {IEResult.keywords.map((k, i) => (
                  <Anchor
                    key={i}
                    style={{
                      color: "black",
                      background: "white",
                      padding: "5px",
                      margin: "3px",
                      marginRight: "6px",
                      lineheight: 1,
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                      fontSize: "13px",
                    }}
                    label={k}
                  />
                ))}
              </span>
            </Heading>
            {/* <Heading size="small">Resumen:</Heading>
            <div>{IEResult.summary}</div> */}
            <Heading level="4">NER (Name Entity Recognition):</Heading>
            <span>
              <div
                dangerouslySetInnerHTML={{ __html: IEResult.view_ner }}
              ></div>
            </span>
          </Box>
        </div>
      ) : (
        ""
      )}
    </Box>
  );
};
