import { GetStaticPaths, GetStaticProps } from "next";

type Article = {
  id: string;
  title: string;
  URL: string;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(
    "https://blooming-riders-backend.azurewebsites.net/articles?status=PUBLISHED&size=3" // HERE -> Only 3 pages are generated SSG and the other will be generated SSR on demand
  );
  const articles = await res.json();
  return {
    paths: articles.data.map((article: Article) => ({
      params: {
        slug: article.URL,
      },
    })),
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<{
  article: Article;
}> = async (context: any) => {
  const res = await fetch(
    `https://blooming-riders-backend.azurewebsites.net/article-by-url/${context.params.slug}`
  );
  const article = await res.json();
  console.log("in SSR");
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
