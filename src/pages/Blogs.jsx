import { Link } from "react-router";
import BlogList from "../components/blog/BlogList.jsx";
import SearchBar from "../components/SearchBar.jsx";
import Title from "../components/ui/Title.jsx";
import Button from "../components/ui/Button.jsx";

const Blogs = () => {
  return (
    <>
      <div className='search-container'>
        <Title tag='h1'>Blogs</Title>
        <div className='search-container-right'>
          <SearchBar />
          <Link to='/blog/create'>
            <Button>Create</Button>
          </Link>
        </div>
      </div>
      <BlogList />
    </>
  );
};

export default Blogs;
