import { Category } from "../interface/category.interface";
import { HeadlessCMSResponse } from "../interface/response.interface";
import axiosInstance from "../utils/axiosInstance";
import { qs } from "../utils/qs";

export const categoriesService = {
  getCategories: async (): Promise<HeadlessCMSResponse<Category[]>> => {
    const queryParams = qs.stringify({ sort: "category_name:asc" });
    const response = await axiosInstance.get(`/categories?${queryParams}`);
    return response.data;
  },

  getCategoryByDocumentId: async (
    documentId: string,
  ): Promise<HeadlessCMSResponse<Category>> => {
    const response = await axiosInstance.get(`/categories/${documentId}`);
    return response.data;
  },
};
