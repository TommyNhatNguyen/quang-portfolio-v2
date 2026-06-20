import { AboutPage } from "../interface/about-page.interface";
import { HeadlessCMSResponse } from "../interface/response.interface";
import axiosInstance from "../utils/axiosInstance";

export const aboutPageService = {
  getAboutPage: async (): Promise<HeadlessCMSResponse<AboutPage>> => {
    const response = await axiosInstance.get("/about-page", {
      params: {
        populate: "*",
      },
    });
    return response.data;
  },
};
