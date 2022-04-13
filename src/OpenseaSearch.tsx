import axios from "axios";
import { useState } from "react";
import {
  Button,
  Card,
  FormControl,
  InputGroup,
  Spinner,
} from "react-bootstrap";
import { Search } from "react-bootstrap-icons";

const OpenseaSearch = ({ addr, collectionInfo }: any) => {
  const MAX_RANGE = 50;
  const [listedTokens, setListedTokens]: [any, any] = useState([]);
  const [isLoading, setIsLoading]: [any, any] = useState(false);
  const [rangeStart, setRangeStart]: [any, any] = useState(1);
  const [rangeEnd, setRangeEnd]: [any, any] = useState(MAX_RANGE);
  const [isRangeStartValid, setIsRangeStartValid]: [any, any] = useState(true);
  const [isRangeEndValid, setIsRangeEndValid]: [any, any] = useState(true);

  const onChangeRangeStart = (e: any) => {
    setRangeStart(e.target.value);
    if (
      e.target.value < 1 ||
      e.target.value > collectionInfo.totalSupply ||
      e.target.value > rangeEnd ||
      rangeEnd - e.target.value > MAX_RANGE
    ) {
      setIsRangeStartValid(false);
    } else {
      setIsRangeStartValid(true);
    }
  };

  const onChangeRangeEnd = (e: any) => {
    setRangeEnd(e.target.value);
    if (
      e.target.value < 1 ||
      e.target.value > collectionInfo.totalSupply ||
      e.target.value < rangeStart ||
      e.target.value - rangeStart > MAX_RANGE
    ) {
      setIsRangeEndValid(false);
    } else {
      setIsRangeEndValid(true);
    }
  };
  const getOSStatus = async (i: number) => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/getOpenseaStatus/${addr}/${ids[i]}`
      );
      const data = res.data;
      if (data.listed) {
        setListedTokens((prevState: any) => [
          ...prevState,
          {
            id: ids[i],
            rarity: i + 1,
            url: data.openseaUrl,
            price: data.price,
          },
        ]);
      }
    } catch (e) {
      console.error(e);
    }
  };
  const searchOpensea = async (event: any) => {
    event.preventDefault();
    setListedTokens([]);
    setIsLoading(true);
    const proms = [];
    for (let i = rangeStart - 1; i < rangeEnd; i++) {
      await getOSStatus(i);
    }
    setIsLoading(false);
  };

  const getListedElements = () => {
    const list = [];
    for (const tk of listedTokens) {
      list.push(
        <li key={tk.id}>
          Rarity rank <b>{tk.rarity}</b> (token id: <b>{tk.id}</b>) is{" "}
          <a href={tk.url}>listed on OS</a> for <b>{tk.price}ETH</b>.
        </li>
      );
    }
    return list;
  };

  if (!collectionInfo) {
    return <></>;
  }

  if (!collectionInfo.calculated) {
    return <></>;
  }

  const ids = Object.entries(collectionInfo.rarities).map((tk) => tk[1]);
  return (
    <Card
      className="overflow-auto scrollbar"
      style={{ textAlign: "left", maxHeight: "25rem" }}
    >
      <Card.Body>
        <h5>OpenSea</h5>
        <p>
          Search the rarity range below on OpenSea. Max range is {MAX_RANGE}.
        </p>
        {/* <p style={{ color: "red" }}>
          Might not work currently due to OpenSea api rate limiting.
        </p> */}
        <InputGroup className="mb-3" hasValidation={true}>
          <InputGroup.Text>Range start</InputGroup.Text>
          <FormControl
            type="number"
            aria-label="Range start"
            value={rangeStart}
            onChange={onChangeRangeStart}
            isInvalid={!isRangeStartValid}
          />
          <FormControl.Feedback type="invalid">
            Range start is invalid.
          </FormControl.Feedback>
        </InputGroup>
        <InputGroup className="mb-3" hasValidation={true}>
          <InputGroup.Text>Range end</InputGroup.Text>
          <FormControl
            type="number"
            aria-label="Range end"
            value={rangeEnd}
            onChange={onChangeRangeEnd}
            isInvalid={!isRangeEndValid}
          />
          <FormControl.Feedback type="invalid">
            Range end is invalid
          </FormControl.Feedback>
        </InputGroup>
        <Button
          variant="primary"
          type="submit"
          disabled={isLoading || !isRangeStartValid || !isRangeEndValid}
          onClick={searchOpensea}
        >
          <Search /> Search on OpenSea{" "}
          {isLoading && (
            <Spinner
              as="span"
              animation="grow"
              size="sm"
              role="status"
              aria-hidden="true"
            />
          )}
        </Button>
        {listedTokens.length > 0 && (
          <ul className="py-3">{getListedElements()}</ul>
        )}
      </Card.Body>
    </Card>
  );
};
export default OpenseaSearch;
