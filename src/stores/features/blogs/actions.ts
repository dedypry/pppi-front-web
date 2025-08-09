import { createAsyncThunk } from "@reduxjs/toolkit";

import { http } from "@/config/axios";
import { IQueryPagination } from "@/interface/IPagination";

export const getBlogs = createAsyncThunk(
  "get-blogs",
  async ({ page = 1, pageSize = 10 }: IQueryPagination) => {
    try {
      const { data } = await http.get(
        `/blogs?page=${page}&pageSize=${pageSize}`
      );

      return data;
    } catch (error) {
      console.log("BLOG", error);

      return null;
    }
  }
);
export const getBlogDetail = createAsyncThunk(
  "get-blogs/detail",
  async ({ slug }: { slug: string }) => {
    try {
      const { data } = await http.get(`/blogs/${slug}`);

      return data;
    } catch (error) {
      console.log("BLOG", error);

      return null;
    }
  }
);
