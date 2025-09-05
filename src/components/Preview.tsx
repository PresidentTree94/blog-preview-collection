import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faUser } from "@fortawesome/free-regular-svg-icons";
import styles from "./Preview.module.css";

type Blog = {
  category: string;
  date: string;
  title: string;
  image: string;
  description: string;
  author: string;
}

function Preview({ data }: { data: Blog }) {
  return (
    <div className={`${styles.div} theme`}>
      <div>
        <img src={data.image} />
        <div>
          <span>{data.category}</span>
          <p><FontAwesomeIcon icon={faCalendar} />{data.date}</p>
          <h2>{data.title}</h2>
          <p>{data.description}</p>
        </div>
      </div>
      <div>
        <FontAwesomeIcon icon={faUser} />
        <p>{data.author}</p>
      </div>
    </div>
  );
}

export default Preview;