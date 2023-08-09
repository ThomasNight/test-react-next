import { GetStaticPaths, GetStaticProps } from "next";

type Article = {
  id: string;
  title: string;
  URL: string;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(
    "https://blooming-riders-backend.azurewebsites.net/articles?status=PUBLISHED&size=2000"
  );
  const articles = await res.json();
  return {
    paths: articles.data.map((article: Article) => ({
      params: {
        slug: article.URL,
      },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<{
  article: Article;
}> = async (context: any) => {
  const res = await fetch(
    `https://blooming-riders-backend.azurewebsites.net/article-by-url/${context.params.slug}`
  );
  const article = await res.json();
  return { props: { article: article } };
};

const ArticlePage = ({ article }: { article: Article }) => {
  return (
    <div
      key={article.id}
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
    </div>
  );
};

export default ArticlePage;
