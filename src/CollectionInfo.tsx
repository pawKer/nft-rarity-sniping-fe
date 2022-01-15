import { Button, Card, Spinner } from "react-bootstrap";

const CollectionInfo = ({
  isLoading,
  collectionInfo,
  calculateRarities,
  isLoadingRarities,
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
