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
    <main className="flex flex-col m-8 mt:m-12 min-w-64 w-full max-w-304">
      <h1 className="text-5xl font-bold text-center">Blog Preview Collection</h1>
      <section className="card p-8 my-8 grid grid-cols-1 mt:grid-cols-2 ll:grid-cols-4">
        <div className="line-align-2 py-2 pl-2">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
          <input type="text" className="outline-none" placeholder="Search titles..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
        <button className="line-align-2 justify-between" onClick={() => setSortOrder(sortOrder === "oldest" ? "newest" : "oldest")}>
          Sort by {sortOrder === "oldest" ? "Oldest" : "Newest"}
          <FontAwesomeIcon icon={faArrowsRotate} />
        </button>
        <select className="appearance-none" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
          <option value="">All Categories</option>
          {categories.map(item => (
            <option key={item} value={item}>{item}</option>
          ))}
        </select>
        <details className="relative">
          <summary className="line-align-2 justify-between list-none">
            Filter Authors
            <FontAwesomeIcon icon={faChevronDown} />
          </summary>
          <div className="theme rounded-xl border shadow-lg absolute top-[calc(100%+0.5rem)] w-full flex flex-col overflow-hidden">
            {authors.map(item => (
              <label className="line-align-2 py-2 px-3">
                <input type="checkbox" className="w-4 h-4 rounded rounded-sm" checked={selectedAuthors.includes(item)} onChange={() => handleAuthorChange(item)}/>
                <span>{item}</span>
              </label>
            ))}
          </div>
        </details>
      </section>
      <article className="grid grid-cols-[repeat(auto-fit,minmax(0,24rem))] justify-center gap-8">
        {filteredPosts.map((item) => (
          <Preview key={item.title} data={item} />
        ))}
      </article>
    </main>
  )
}

export default App
