import React, { Component } from "react";

import NumberContext from "../context/NumberContext";

function getCurrentTimestamp() {
  const t = new Date();
  const date = ("0" + t.getDate()).slice(-2);
  const month = ("0" + (t.getMonth() + 1)).slice(-2);
  const year = t.getFullYear();
  const hours = t.getHours();
  const minutes = t.getMinutes();
  const seconds = t.getSeconds();
  const time = `${hours}:${minutes}:${seconds} ${date}/${month}/${year}`;
  return time;
}

export default class extends Component {
  constructor() {
    super();
    this.state = {
      queue: []
    };
    this.addToQueue = this.addToQueue.bind(this);
  }

  addToQueue(book) {
    this.state.queue.indexOf(book) === -1 &&
      this.setState((state) => {
        return {
          queue: state.queue.concat({
            ...book,
            timestamp: getCurrentTimestamp()
          })
        };
      });
  }

  render() {
    return (
      <NumberContext.Provider
        value={{
          queueItems: this.state.queue,
          addToQueue: this.addToQueue
        }}
      >
        {this.props.children}
      </NumberContext.Provider>
    );
  }
}
