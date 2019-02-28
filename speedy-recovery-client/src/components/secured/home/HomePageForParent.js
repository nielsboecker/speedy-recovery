import React, { Component } from "react";

class HomePageForParent extends Component {
  render() {
    const { user } = this.props;

    return (
      <div>
        <h1>Hello</h1>
        <h4>Welcome {user.name}</h4>
        <h4>This is parent's Homepage</h4>
      </div>
    );
  }
}

export default HomePageForParent;