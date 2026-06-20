import { Article } from "../interface/article.interface";
import { HeadlessCMSResponse } from "../interface/response.interface";
import axiosInstance from "../utils/axiosInstance";
import { qs } from "../utils/qs";

export const articlesService = {
  getArticles: async (params?: object): Promise<HeadlessCMSResponse<Article[]>> => {
    const queryParams = qs.stringify({
      populate: {
        thumbnail: true,
        categories: true,
      },
      sort: "publishedAt:desc",
      ...params,
    });
    const response = await axiosInstance.get(`/articles?${queryParams}`);
    return response.data;
  },

  getArticleBySlug: async (slug: string): Promise<HeadlessCMSResponse<Article[]>> => {
    const queryParams = qs.stringify({
      filters: {
        slug: { $eq: slug },
      },
      populate: "*",
    });
    const response = await axiosInstance.get(`/articles?${queryParams}`);
    return response.data;
  },
};
