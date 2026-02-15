/**
 * ============================================================================
 * src/components/Async.js — LESSON 577
 * ============================================================================
 *
 * A component that fetches data asynchronously using useEffect and renders
 * the results as a list. This introduces a testing challenge: the component
 * renders TWICE — once immediately with an empty array (before the HTTP
 * response arrives), and again after the fetch completes and setState
 * populates the posts array.
 *
 * This two-phase render cycle means synchronous queries like getByRole or
 * getAllByRole will fail because they inspect the DOM at the instant they
 * are called — before the async data has arrived. Testing this component
 * requires asynchronous queries (findAllByRole) that wait for elements to
 * appear in the DOM over time.
 *
 * The data source is JSONPlaceholder, a free public API that returns dummy
 * JSON data — ideal for learning without needing a custom backend.
 *
 * ============================================================================
 */

import { useState, useEffect } from 'react';

export default function Async() {
  // Initially an empty array — no posts are available until the fetch
  // completes. The component renders once with this empty state before
  // useEffect fires.
  const [posts, setPosts] = useState([]);

  // useEffect with an empty dependency array runs once after the initial
  // render. The fetch call is asynchronous — the component does NOT wait
  // for it before painting the first frame. Once the response arrives and
  // is parsed as JSON, setPosts triggers a re-render with the fetched data.
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
      });
  }, []);

  return (
    <div>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}
