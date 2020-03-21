import React, { Component } from "react";
import axios from "../../../axios";
import Post from "../../../components/Post/Post";
import "./Posts.css";
import FullPost from "../FullPost/FullPost";
import { Route } from "react-router-dom";

class Posts extends Component {
  state = {
    posts: []
  };

  componentDidMount() {
    console.log(this.props);
    axios
      .get("/posts")
      .then(response => {
        const posts = response.data.slice(0, 4);
        const updatedPosts = posts.map(post => {
          return {
            ...post,
            author: post.author
          };
        });
        this.setState({ posts: updatedPosts });
      })
      .catch(error => {
        this.setState({ error: true });
      });
  }

  // Navigating programatically instead of using the Link Component
  postSelectedHandler = id => {
    this.props.history.push({ pathname: "/posts/" + id });
    // or this.props.history.push('/posts' + id);
  };

  render() {
    let posts = <p style={{ textAlign: "center" }}>Something went wrong</p>;
    if (!this.state.error) {
      posts = this.state.posts.map(post => {
        return (
          // <Link to={"/posts/" + post.id} >
          <Post
            key={post.id}
            title={post.title}
            author={post.author}
            clicked={() => this.postSelectedHandler(post.id)}
          />
          // </Link>
        );
      });
    }
    return (
      <div>
        <section className="Posts">{posts}</section>
        {/* We use props.match.url to get the current route thus far, this allows us
        to use dynamic routing and add a new route which has the id after it*/}
        <Route
          path={this.props.match.url + "/:id"}
          exact
          component={FullPost}
        ></Route>
      </div>
    );
  }
}

export default Posts;
