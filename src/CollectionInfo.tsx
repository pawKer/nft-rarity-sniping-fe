import { Alert, Button, Card, Col, Form, Row, Spinner } from "react-bootstrap";

const IPFS_GATEWAY = "https://ipfs.io/ipfs/";
const getHttpIpfsUrl = (url: string, query: string) => {
  if (url.includes("ipfs://")) {
    return IPFS_GATEWAY + url.split("ipfs://")[1];
  }

  if (url.includes("base64")) {
    return `https://etherscan.io/address/${query}#readContract`;
  }
  return url;
};

const CollectionInfo = ({
  isLoading,
  collectionInfo,
  calculateRarities,
  isLoadingRarities,
  isMetadataRevealed,
  handleSwitch,
  shouldForceRecalc,
  query,
}: any) => {
  const shouldDisableButton = () => {
    if (shouldForceRecalc) {
      if (isLoadingRarities) {
        return true;
      } else {
        return false;
      }
    } else {
      if (isLoadingRarities) {
        return true;
      } else {
        if (collectionInfo.calculated) {
          return true;
        }
      }
    }
    return false;
  };
  if (isLoading) {
    return <Spinner animation="border" variant="success" />;
  }
  if (!collectionInfo) {
    return <></>;
  }
  return (
    <Card>
      <Card.Body>
        <Card.Title>{collectionInfo.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          <a
            href={`https://etherscan.io/address/${query}#readContract`}
            target="_blank"
            rel="noreferrer"
          >
            Etherscan
          </a>{" "}
          -{" "}
          <a
            href={`https://opensea.io/assets/${query}/1`}
            target="_blank"
            rel="noreferrer"
          >
            Opensea
          </a>
        </Card.Subtitle>
        <ul>
          <li> Total supply: {collectionInfo.totalSupply} </li>
          <li>First token id: {collectionInfo.firstTokenId}</li>
          <li>
            Token uri:{" "}
            <a
              href={getHttpIpfsUrl(collectionInfo.tokenUri, query)}
              target="_blank"
              rel="noreferrer"
              onClick={() =>
                collectionInfo.tokenUri.contains("base64") &&
                alert(collectionInfo.tokenUri)
              }
            >
              {collectionInfo.tokenUri.includes("base64")
                ? "<Metadata is in contract (base64)>"
                : collectionInfo.tokenUri}
            </a>
          </li>
        </ul>
        {!isMetadataRevealed && (
          <Alert variant={"warning"}>
            <Alert.Heading>
              Metadata looks like it is not revealed yet!
            </Alert.Heading>
            <p className="mb-0">
              You can still calculate rarities if you know they're actually
              revealed.
            </p>
          </Alert>
        )}

        <Row>
          <Col lg={2}>
            <Button
              onClick={calculateRarities}
              variant="success"
              disabled={shouldDisableButton()}
            >
              Calculate rarities for this collection
            </Button>
          </Col>
          <Col lg={2}>
            <Form>
              <Form.Check
                type="switch"
                id="custom-switch"
                label="Force recalculation"
                onChange={handleSwitch}
                disabled={!collectionInfo.calculated}
              />
            </Form>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};
export default CollectionInfo;
