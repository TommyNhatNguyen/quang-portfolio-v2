import { AboutPage } from "../interface/about-page.interface";
import { HeadlessCMSResponse } from "../interface/response.interface";
import axiosInstance from "../utils/axiosInstance";

export const aboutPageService = {
  getAboutPage: async (): Promise<HeadlessCMSResponse<AboutPage>> => {
    const response = await axiosInstance.get("/about-page", {
      params: {
        populate: {
          avatar: true,
          stack_images: true,
          action_buttons: {
            populate: {
              icon: true,
            },
          },
          social_buttons: {
            populate: {
              icon: true,
            },
          },
        },
      },
    });
    return response.data;
  },
};
