import React, { Component } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

export default class BookCreate extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      author: "",
      image: ""
    };
  }

  onChangeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmitHandler = (e) => {
    e.preventDefault();
    axios
      .post("https://qidoj.sse.codesandbox.io/books/create", this.state)
      .then((res) => {
        this.setState({
          title: "",
          author: "",
          image: ""
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <div className="BookCreate">
        <h1>Create</h1>
        <Form onSubmit={this.onSubmitHandler}>
          <FormGroup>
            <Label for="Name">Name</Label>
            <Input
              id="title"
              name="title"
              placeholder="Enter book's name"
              type="text"
              onChange={this.onChangeHandler}
              value={this.state.title}
            />
          </FormGroup>
          <FormGroup>
            <Label for="Author">Author</Label>
            <Input
              id="Author"
              name="author"
              placeholder="Enter author's name"
              type="text"
              value={this.state.author}
              onChange={this.onChangeHandler}
            />
          </FormGroup>
          <FormGroup>
            <Label for="Image">Image URL</Label>
            <Input
              id="Image"
              name="image"
              placeholder="Enter image URL"
              type="text"
              value={this.state.image}
              onChange={this.onChangeHandler}
            />
          </FormGroup>
          <Button type="submit" onClick={() => this.props.onClick(this.state)}>
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}
