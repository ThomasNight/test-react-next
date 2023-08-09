import { GetStaticProps } from "next";
import Link from "next/link";

type Article = {
  id: string;
  title: string;
  URL: string;
};

export const getStaticProps: GetStaticProps<{
  articles: Article[];
}> = async () => {
  const res = await fetch(
    "https://blooming-riders-backend.azurewebsites.net/articles?status=PUBLISHED&size=2000"
  );
  const articles = await res.json();
  return { props: { articles: articles.data } };
};

const BlogSsgPage = ({ articles }: { articles: Article[] }) => {
  return (
    <div
      style={{
        display: `flex`,
        flexWrap: `wrap`,
      }}
    >
      {articles?.map((article) => (
        <Link
          key={article.id}
          href={`/blog-ssg/${article.URL}`}
          style={{
            display: `flex`,
            backgroundColor: `lightblue`,
            width: `300px`,
            height: `300px`,
            marginRight: `30px`,
            marginBottom: `30px`,
          }}
        >
          {article.title}
        </Link>
      ))}
    </div>
  );
};

export default BlogSsgPage;
