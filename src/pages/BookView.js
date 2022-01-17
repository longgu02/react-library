import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Button,
  Col,
  Row,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function BookView(props) {
  const [book, setBook] = useState({
    title: "",
    author: "",
    image: ""
  });
  const [edit, setEdit] = useState({
    title: "",
    author: "",
    image: ""
  });
  const [isOpenEdit, setOpenEdit] = useState(false);
  const [isOpenDelete, setOpenDelete] = useState(false);
  const { id } = useParams();

  const onChangeHandler = (e) => {
    setEdit({
      [e.target.name]: e.target.value
    });
  };

  useEffect(() => {
    axios
      .get("https://qidoj.sse.codesandbox.io/books/" + id + "/view", edit)
      .then((res) => {
        setBook(res.data.book);
        setEdit(res.data.book);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleEdit = () => {
    axios
      .put("https://qidoj.sse.codesandbox.io/books/" + id + "/edit", edit)
      .then((res) => {
        setBook(res.data.editedBook);
        setEdit(res.data.editedBook);
        props.onClickEdit(id, res.data.editedBook);
      })
      .catch((error) => {
        console.log(error);
      });
    setOpenEdit(false);
  };

  const handleDelete = () => {
    axios
      .delete("https://qidoj.sse.codesandbox.io/books/" + id + "/delete")
      .then((res) => {
        setEdit(res.data.editedBook);
      })
      .catch((error) => {
        console.log(error);
      });
    setOpenDelete(false);
  };

  return (
    <div className="BookView">
      <h1>View</h1>
      <Row>
        <Col md="4">
          <img src={book.image} alt="Book thumbnail" />
        </Col>
        <Col md="8">
          <div className="info">
            <h3>
              <strong>Title: </strong>
              {book.title}
            </h3>
            <h4>
              <strong>Author: </strong>
              {book.author}
            </h4>
          </div>
          <div className="editButton">
            <Button color="danger" onClick={() => setOpenEdit(true)}>
              Edit
            </Button>
            <Modal isOpen={isOpenEdit}>
              <ModalHeader
                toggle={() => {
                  setEdit(book);
                  return setOpenEdit(false);
                }}
              >
                Modal title
              </ModalHeader>
              <ModalBody>
                <Form>
                  <FormGroup>
                    <Label for="Name">Name</Label>
                    <Input
                      id="title"
                      name="title"
                      placeholder="Enter book's name"
                      type="text"
                      onChange={onChangeHandler}
                      value={edit.title}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="Author">Author</Label>
                    <Input
                      id="Author"
                      name="author"
                      placeholder="Enter author's name"
                      type="text"
                      value={edit.author}
                      onChange={onChangeHandler}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="Image">Image URL</Label>
                    <Input
                      id="Image"
                      name="image"
                      placeholder="Enter image URL"
                      type="text"
                      value={edit.image}
                      onChange={onChangeHandler}
                    />
                  </FormGroup>
                </Form>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={handleEdit}>
                  Do Something
                </Button>{" "}
                <Button
                  onClick={() => {
                    setEdit(book);
                    return setOpenEdit(false);
                  }}
                >
                  Cancel
                </Button>
              </ModalFooter>
            </Modal>
          </div>
          <div className="deleteButton">
            <Button color="danger" onClick={() => setOpenDelete(true)}>
              Delete
            </Button>
            <Modal isOpen={isOpenDelete}>
              <ModalHeader
                toggle={() => {
                  return setOpenDelete(false);
                }}
              >
                Modal title
              </ModalHeader>
              <ModalBody>
                Want to delete <strong>{book.title}</strong>?
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={handleDelete}>
                  Do Something
                </Button>{" "}
                <Button
                  onClick={() => {
                    return setOpenDelete(false);
                  }}
                >
                  Cancel
                </Button>
              </ModalFooter>
            </Modal>
          </div>
        </Col>
      </Row>
    </div>
  );
}
