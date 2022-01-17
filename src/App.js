// Third Party
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import axios from "axios";

// Style & Bootstrap
import { Row, Container } from "reactstrap";
import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";

// Components
import TopMenu from "./components/TopMenu";

// Page
import BookCreate from "./pages/BookCreate";
import BookView from "./pages/BookView";
import BookList from "./pages/BookList";
import Queue from "./pages/Queue";

// Context
import NumberProvider from "./components/NumberProvider";

export default function App() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios.get("https://qidoj.sse.codesandbox.io/books").then((res) => {
      setBooks(res.data.books);
    });
  }, []);

  const onClickSubmit = (BookCreated) => {
    setBooks([...books, BookCreated]);
  };

  const onClickEdit = (bookId, bookInfo) => {
    const bookIndex = books.findIndex((item) => item._id === bookId);
    setBooks([
      ...books.slice(0, bookIndex),
      bookInfo,
      ...books.slice(bookIndex + 1)
    ]);
  };

  const onClickDelete = (bookId) => {
    const bookIndex = books.findIndex((item) => item._id === bookId);
    setBooks([...books.slice(0, bookIndex), ...books.slice(bookIndex + 1)]);
  };

  return (
    <div className="App">
      <Router>
        <NumberProvider>
          <TopMenu />
          <Container>
            <Row>
              <Routes>
                <Route path="/" element={<BookList books={books} />} />
                <Route
                  path="/create"
                  element={<BookCreate onClick={onClickSubmit} />}
                />
                <Route
                  path="/books/:id/view"
                  element={
                    <BookView
                      onClickEdit={onClickEdit}
                      onClickDelete={onClickDelete}
                    />
                  }
                />
                <Route path="/edit" element={<h1>Edit</h1>} />
                <Route path="/delete" element={<h1>Delete</h1>} />
                <Route path="/queue" element={<Queue />} />
              </Routes>
            </Row>
          </Container>
        </NumberProvider>
      </Router>
    </div>
  );
}

// export default class App extends Component {
//   constructor() {
//     super();
//     this.state = {
//       books: []
//     };
//     this.onClickSubmit = this.onClickSubmit.bind(this);
//     this.onClickEdit = this.onClickEdit.bind(this);
//   }

// onClickSubmit(BookCreated) {
//   return (event) => {
//     this.setState({
//       books: [...this.state.books, BookCreated]
//     });
//   };
// }

// onClickEdit(bookId, bookInfo) {
//   const bookIndex = this.state.books.findIndex((item) => item.id === bookId);
//   console.log("working on it");
//   return (event) => {
//     this.setState({
//       books: [
//         ...this.state.books.slice(0, bookIndex),
//         { _id: bookId, bookInfo },
//         ...this.state.books.slice(bookIndex + 1)
//       ]
//     });
//   };
// }

//   render() {
//     const { books } = this.state;

//   }
// }
