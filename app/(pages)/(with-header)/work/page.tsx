import { articlesService } from "@/app/services/articles-service";
import { categoriesService } from "@/app/services/categories-service";
import WorkGrid from "./shared/work-grid";

const PAGE_SIZE = 12;

const WorkPage = async () => {
  const [{ data: categories }, { data: articles, meta }] = await Promise.all([
    categoriesService.getCategories(),
    articlesService.getArticles({
      pagination: { page: 1, pageSize: PAGE_SIZE },
    }),
  ]);

  const categoryCounts = await Promise.all(
    categories.map((category) =>
      articlesService
        .getArticles({
          pagination: { page: 1, pageSize: 1 },
          filters: { categories: { slug: { $eq: category.slug } } },
        })
        .then(({ meta }) => ({
          slug: category.slug,
          total: meta.pagination?.total ?? 0,
        })),
    ),
  );

  const filterCounts: Record<string, number> = {
    all: meta.pagination?.total ?? 0,
  };
  categoryCounts.forEach(({ slug, total }) => {
    filterCounts[slug] = total;
  });

  return (
    <WorkGrid
      initialCategories={categories}
      initialArticles={articles}
      initialFilterCounts={filterCounts}
      initialHasMore={1 < (meta.pagination?.pageCount ?? 1)}
    />
  );
};

export default WorkPage;
