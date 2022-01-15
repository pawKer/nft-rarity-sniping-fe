import { useState } from "react";
import { Card, FormControl, InputGroup, Spinner } from "react-bootstrap";
import { Search } from "react-bootstrap-icons";

const RarityInfo = ({ isLoading, collectionInfo }: any) => {
  const [query, setQuery]: [any, any] = useState();
  const [rarity, setRarity]: [any, any] = useState();
  const handleOnChange = (event: any) => {
    if (!isNaN(event.target.value)) {
      setQuery(event.target.value);
      for (const tk of Object.entries(collectionInfo.rarities)) {
        if (tk[1] === parseInt(event.target.value)) {
          setRarity(tk[0]);
          break;
        }
      }
    }
  };

  if (!collectionInfo) {
    return <></>;
  }

  if (isLoading) {
    return <Spinner animation="border" variant="success" />;
  }

  if (collectionInfo.processing) {
    return (
      <>
        <h2>Currently processing collection. Try again soon.</h2>
        <Spinner animation="border" variant="success" />
      </>
    );
  }

  if (!collectionInfo.calculated) {
    return <></>;
  }
  const rows: any = [];
  for (let i = 1; i <= 100; i++) {
    rows.push(
      <li key={collectionInfo.rarities[i]}>{collectionInfo.rarities[i]}</li>
    );
  }
  return (
    <Card
      className="overflow-auto scrollbar"
      style={{ textAlign: "left", maxHeight: "25rem" }}
    >
      <Card.Body>
        <h5> Rarities </h5>
        <div style={{ position: "sticky", top: 0, background: "white" }}>
          <InputGroup>
            <InputGroup.Text id="inputGroup-sizing-default">
              <Search />
            </InputGroup.Text>
            <FormControl
              placeholder="Token id..."
              aria-label="Token id"
              aria-describedby="basic-addon2"
              onChange={handleOnChange}
              value={query || ""}
            />
            <FormControl.Feedback style={{ textAlign: "left" }} type="invalid">
              {"Input value is not an Ethereum contract address."}
            </FormControl.Feedback>
          </InputGroup>
          {query && (
            <h2>
              Token {query} has rarity {rarity}
            </h2>
          )}
        </div>
        <ol>{rows}</ol>
      </Card.Body>
    </Card>
  );
};
export default RarityInfo;
