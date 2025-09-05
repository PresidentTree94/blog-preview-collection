import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faArrowsRotate, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import Blogs from "./data/blogs.json"
import Preview from "./components/Preview";

function App() {
  const categories = [...new Set(Blogs.map(item => item.category))].sort();
  const authors = [...new Set(Blogs.map(item => item.author))].sort();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("newest")
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedAuthors, setSelectedAuthors] = useState<string[]>([]);

  const handleAuthorChange = (author: string) => {
    setSelectedAuthors(prev =>
      prev.includes(author) ? prev.filter(a => a !== author) : [...prev, author]
    );
  };

  const filteredPosts = Blogs.filter(post => {
    const matchSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCategory = selectedCategory === "" || post.category === selectedCategory;
    const matchAuthors = selectedAuthors.length === 0 || selectedAuthors.includes(post.author);
    return matchSearch && matchCategory && matchAuthors;
  })
  .sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    if (sortOrder === "oldest") {
      return dateA.getTime() - dateB.getTime();
    }
      return dateB.getTime() - dateA.getTime();
  });

  return (
    <main>
      <h1>Blog Preview Collection</h1>
      <section className="theme">
        <div>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
          <input type="text" placeholder="Search titles..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
        <button onClick={() => setSortOrder(sortOrder === "oldest" ? "newest" : "oldest")}>
          Sort by {sortOrder === "oldest" ? "Oldest" : "Newest"}
          <FontAwesomeIcon icon={faArrowsRotate} />
        </button>
        <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
          <option value="">All Categories</option>
          {categories.map(item => (
            <option value={item}>{item}</option>
          ))}
        </select>
        <details>
          <summary>
            Filter Authors
            <FontAwesomeIcon icon={faChevronDown} />
          </summary>
          <div>
            {authors.map(item => (
              <label>
                <input type="checkbox" checked={selectedAuthors.includes(item)} onChange={() => handleAuthorChange(item)}/>
                <span>{item}</span>
              </label>
            ))}
          </div>
        </details>
      </section>
      <article>
        {filteredPosts.map((item) => (
          <Preview data={item} />
        ))}
      </article>
    </main>
  )
}

export default App
