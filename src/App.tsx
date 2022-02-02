import { useState } from "react";
import "./App.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button, FormControl, InputGroup } from "react-bootstrap";
import ethereum_address from "ethereum-address";
import axios from "axios";
import CollectionInfo from "./CollectionInfo";
import RarityInfo from "./RarityInfo";
import { Search } from "react-bootstrap-icons";
import ManualInputForm from "./ManualInputForm";
import OpenseaSearch from "./OpenseaSearch";

function App() {
  const [query, setQuery]: [any, any] = useState("");
  const [collectionInfo, setCollectionInfo]: [any, any] = useState();
  const [isInputValid, setIsInputValid]: [any, any] = useState(true);
  const [showValidLabel, setShowValidLabel]: [any, any] = useState(false);
  const [isLoading, setIsLoading]: any = useState(false);
  const [isMetadataRevealed, setIsMetadataRevealed]: any = useState(true);
  const [isLoadingRarities, setIsLoadingRarities] = useState(false);

  const onEnterPress = (e: any) => {
    if (e.keyCode === 13 && e.shiftKey === false) {
      if (isInputValid) {
        e.preventDefault();
        handleSubmitForm(e);
      }
    }
  };

  const fetchData = () => {
    setIsLoading(true);
    axios
      .get(`${process.env.REACT_APP_API_URL}/getCollectionInfo/${query}`)
      .then((resp) => {
        console.log(resp);
        const res = resp.data;
        if (res.rarities) res.rarities = JSON.parse(res.rarities);
        setCollectionInfo(res);
        axios
          .get(`${process.env.REACT_APP_API_URL}/isMetadataRevealed/${query}`)
          .then((resp) => {
            console.log(resp);
            const res = resp.data;
            setIsMetadataRevealed(!!res.revealed);
            setIsLoading(false);
          })
          .catch((error: any) => {
            console.log(error);
            setIsLoading(false);
          });
      })
      .catch((error: any) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  const handleSubmitForm = (event: any) => {
    event.preventDefault();
    console.log("submitting form...");
    fetchData();
  };

  const isEthAddress = (addr: string) => {
    if (!ethereum_address.isAddress(addr)) {
      return false;
    }
    return true;
  };

  const handleOnChange = (event: any) => {
    let isInputTextValid = isEthAddress(event.target.value);
    setIsInputValid(isInputTextValid);
    setShowValidLabel(isInputTextValid);
    setQuery(event.target.value);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const target = event.target;
    console.log("submitting form...");
    setIsLoading(true);
    setIsLoadingRarities(true);
    const addr = target.address.value;
    const data = {
      name: target.name.value,
      totalSupply: parseInt(target.totalSupply.value),
      firstTokenId: parseInt(target.firstTokenId.value),
      tokenUri: target.tokenUri.value,
    };
    console.log(data);
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/calculateRarityManual/${addr}`,
        data
      )
      .then((resp) => {
        console.log(resp);
        const res = resp.data;
        if (res.rarities) res.rarities = JSON.parse(res.rarities);
        setCollectionInfo(res);
        setIsLoading(false);
        setIsLoadingRarities(false);
      })
      .catch((error: any) => {
        console.log(error);
        setIsLoading(false);
        setIsLoadingRarities(false);
      });
  };

  const calculateRarities = () => {
    setIsLoadingRarities(true);
    axios
      .post(`${process.env.REACT_APP_API_URL}/calculateRarity/${query}`)
      .then((resp) => {
        const res = resp.data;
        if (res.rarities) res.rarities = JSON.parse(res.rarities);
        setCollectionInfo(res);
        setIsLoadingRarities(false);
      })
      .catch((error: any) => {
        console.log(error);
        setIsLoadingRarities(false);
      });
  };

  return (
    <div className="App">
      <Container>
        <Row className="mb-3">
          <Col className="my-auto mx-auto">
            <h1>
              <a href="/" style={{ textDecoration: "none", color: "black" }}>
                Rarity Sniper (dupa 1 luna in Vaslui)
              </a>
            </h1>
            <InputGroup hasValidation>
              <InputGroup.Text id="inputGroup-sizing-default">
                <Search />
              </InputGroup.Text>
              <FormControl
                placeholder="Contract address..."
                aria-label="Contract address"
                aria-describedby="basic-addon2"
                onKeyDown={onEnterPress}
                onChange={handleOnChange}
                isValid={showValidLabel}
                isInvalid={!isInputValid}
                value={query || ""}
              />
              <Button
                onClick={handleSubmitForm}
                variant="success"
                disabled={!isInputValid}
              >
                Search
              </Button>
              <FormControl.Feedback
                style={{ textAlign: "left" }}
                type="invalid"
              >
                {"Input value is not an Ethereum contract address."}
              </FormControl.Feedback>
            </InputGroup>
          </Col>
        </Row>
        {!collectionInfo && (
          <Row className="mb-3">
            <Col>
              <ManualInputForm
                handleSubmit={handleSubmit}
                isLoadingRarities={isLoadingRarities}
              ></ManualInputForm>
            </Col>
          </Row>
        )}
        <Row className="mb-3">
          <Col>
            <CollectionInfo
              isLoading={isLoading}
              collectionInfo={collectionInfo}
              calculateRarities={calculateRarities}
              isLoadingRarities={isLoadingRarities}
              isMetadataRevealed={isMetadataRevealed}
            ></CollectionInfo>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <RarityInfo
              isLoading={isLoadingRarities}
              collectionInfo={collectionInfo}
            ></RarityInfo>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <OpenseaSearch
              addr={query}
              collectionInfo={collectionInfo}
            ></OpenseaSearch>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
