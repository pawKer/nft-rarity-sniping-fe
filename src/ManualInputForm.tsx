import { Accordion, Button, Form } from "react-bootstrap";

const ManualInputForm = ({ handleSubmit }: any) => {
  return (
    <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>
          <h4>Manual input</h4>
        </Accordion.Header>
        <Accordion.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="address">
              <Form.Label>Address</Form.Label>
              <Form.Control type="text" placeholder="Enter ETH address" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Collection name</Form.Label>
              <Form.Control type="text" placeholder="Enter collection name" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="totalSupply">
              <Form.Label>Total supply</Form.Label>
              <Form.Control type="number" placeholder="Enter total supply" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="firstTokenId">
              <Form.Label>First token id</Form.Label>
              <Form.Control type="number" placeholder="Enter first token id" />
              <Form.Text className="text-muted">Usually 0 or 1.</Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="tokenUri">
              <Form.Label>Token URI</Form.Label>
              <Form.Control type="text" placeholder="Enter token URI" />
              <Form.Text className="text-muted">
                The tokenURI for one of the tokens 0-9.
              </Form.Text>
            </Form.Group>

            <Button variant="primary" type="submit">
              Calculate rarities
            </Button>
          </Form>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};
export default ManualInputForm;
