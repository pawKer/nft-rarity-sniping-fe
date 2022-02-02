import { Alert, Button, Card, Spinner } from "react-bootstrap";

const CollectionInfo = ({
  isLoading,
  collectionInfo,
  calculateRarities,
  isLoadingRarities,
  isMetadataRevealed,
}: any) => {
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
          Total supply: {collectionInfo.totalSupply}
        </Card.Subtitle>
        <ul>
          <li>First token id: {collectionInfo.firstTokenId}</li>
          <li>
            Token uri:{" "}
            <a href={collectionInfo.tokenUri}>{collectionInfo.tokenUri}</a>
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
        {!collectionInfo.calculated && (
          <Button
            onClick={calculateRarities}
            variant="success"
            disabled={isLoadingRarities}
          >
            Calculate rarities for this collection
          </Button>
        )}
      </Card.Body>
    </Card>
  );
};
export default CollectionInfo;
