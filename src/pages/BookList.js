import React from "react";
import BookCard from "../components/BookCard";
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Row } from "reactstrap";

export default function BookList(props) {
  const { books } = props;

  return (
    <div className="BookList">
      <h1>Books</h1>
      <Row>
        {books.length !== 0 &&
          books.map((book, index) => (
            <Col sm="3" key={book._id}>
              <BookCard book={book} />
            </Col>
          ))}
      </Row>
    </div>
  );
}
