/* eslint-disable @typescript-eslint/no-unused-vars */
import { createAsyncThunk } from "@reduxjs/toolkit";

import { http } from "@/config/axios";
import { IQueryPagination } from "@/interface/IPagination";

export const getForm = createAsyncThunk(
  "get-form",
  async ({ page = 1, pageSize = 10 }: IQueryPagination) => {
    try {
      const { data } = await http.get(
        `/form?page=${page}&pageSize=${pageSize}&type=member`,
      );

      return data;
    } catch (error) {
      return null;
    }
  },
);
export const getFormDetail = createAsyncThunk("get-form-detail", async (id) => {
  try {
    const { data } = await http.get(`/form/${id}`);

    return data;
  } catch (error) {
    return null;
  }
});
export const getFormResultDetail = createAsyncThunk(
  "get-form-result-detail",
  async (id) => {
    try {
      const { data } = await http.get(`/form/result/${id}`);

      return data;
    } catch (error) {
      return null;
    }
  },
);
