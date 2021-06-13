import axios from 'axios';
import { useState, useEffect } from 'react';
import Pagination from './components/Pagination';

function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
      setPosts(res.data);
      setLoading(false);
    };

    fetchPosts();
  }, []);

  if (loading && posts.length === 0) {
    return <h2>Loading...</h2>;
  }

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(posts.length / postsPerPage);

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Pagination</h1>
      <ul>
        {currentPosts.map((post, index) => {
          return <li key={index}>{post.title}</li>;
        })}
      </ul>
      <Pagination totalPages={totalPages} setCurrentPage={setCurrentPage} />
    </div>
  );
}

export default App;
