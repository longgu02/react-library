import React, { useContext } from "react";
import { Table } from "reactstrap";
import "./style/queue.css";
import NumberContext from "../context/NumberContext";
export default function Queue() {
  const { queueItems } = useContext(NumberContext);
  return (
    <div className="Queue">
      <h1>Queue</h1>
      <Table hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Image</th>
            <th>Title</th>
            <th>Author</th>
            <th>Time</th>
            <th>Note</th>
          </tr>
        </thead>
        <tbody>
          {queueItems.map((book, index) => (
            <tr key={book._id}>
              <th scope="row">{index + 1}</th>
              <td>
                <img src={book.image} className="QueueImg" alt={book.title} />
              </td>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.timestamp}</td>
              <td>This is note</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
