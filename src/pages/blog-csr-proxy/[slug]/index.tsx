import { useRouter } from "next/router";
import { useEffect, useState } from "react";

type Article = {
  id: string;
  title: string;
  URL: string;
};

const ArticlePage = () => {
  const [article, setArticle] = useState<Article>();

  const { query } = useRouter();

  useEffect(() => {
    (async function () {
      const res = await fetch(`/truc/article-by-url/${query.slug}`);
      const article = await res.json();
      setArticle(article);
    })();
  }, [query.slug]);

  return (
    <div
      style={{
        display: `flex`,
        backgroundColor: `lightblue`,
        width: `300px`,
        height: `300px`,
        marginRight: `30px`,
        marginBottom: `30px`,
      }}
    >
      {article?.title}
    </div>
  );
};

export default ArticlePage;
