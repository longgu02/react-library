import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button
} from "reactstrap";
import "./BookCard.css";
import NumberContext from "../context/NumberContext";
import { Link } from "react-router-dom";
class BookCard extends Component {
  render() {
    const { book} = this.props;
    return (
      <div className="BookCard">
        <Card className="bookCard">
          <CardImg src={book.image} className="bookImg" />
          <CardBody>
            <CardTitle>
              <Link to={"/books/" + book._id + "/view"}>{book.title}</Link>
            </CardTitle>
            <CardSubtitle>{book.author}</CardSubtitle>
            <NumberContext.Consumer>
              {({ addToQueue }) => (
                <Button onClick={() => addToQueue(book)}>Add to queue</Button>
              )}
            </NumberContext.Consumer>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default BookCard;
