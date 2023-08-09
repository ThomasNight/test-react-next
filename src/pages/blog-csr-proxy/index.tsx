import Link from "next/link";
import { useEffect, useState } from "react";

type Article = {
  id: string;
  title: string;
  URL: string;
};

const BlogCsrProxyPage = () => {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    (async function () {
      const res = await fetch("/truc/articles?status=PUBLISHED&size=2000");
      const articles = await res.json();
      setArticles(articles.data);
    })();
  }, []);

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
          href={`/blog-csr-proxy/${article.URL}`}
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

export default BlogCsrProxyPage;
