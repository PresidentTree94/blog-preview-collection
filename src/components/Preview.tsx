import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faUser } from "@fortawesome/free-regular-svg-icons";

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
    <div className="card p-6 flex flex-col justify-between transition-shadow duration-300 hover:shadow-[8px_8px_0_var(--color-text-fg)]">
      <div className="flex flex-col gap-4">
        <img src={data.image} className="h-48 object-cover rounded-2xl" />
        <div className="flex flex-col">
          <span className="bg-page-bg py-1 px-3 rounded-2xl text-xs uppercase font-bold w-fit">{data.category}</span>
          <p className="line-align-1 mt-3 mb-1.5"><FontAwesomeIcon icon={faCalendar} />{data.date}</p>
          <h2 className="text-xl font-bold ">{data.title}</h2>
          <p className="text-subtext-fg text-sm mt-2">{data.description}</p>
        </div>
      </div>
      <div className="line-align-2">
        <FontAwesomeIcon icon={faUser} />
        <p className="text-sm font-medium">{data.author}</p>
      </div>
    </div>
  );
}

export default Preview;