import { GetServerSideProps } from "next";

type Article = {
  id: string;
  title: string;
  URL: string;
};

export const getServerSideProps: GetServerSideProps<{
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
