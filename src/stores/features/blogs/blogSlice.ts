import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { getBlogComment, getBlogDetail, getBlogs } from "./actions";

import { IBlog, IComment } from "@/interface/IBlogs";
import { IPagination } from "@/interface/IPagination";

export const blogSlice = createSlice({
  name: "blogs",
  initialState: {
    blogs: null as IPagination<IBlog[]> | null,
    blog: null as IBlog | null,
    comments: [] as IComment[],
  },
  reducers: {
    addComment: (state, action: PayloadAction<IComment>) => {
      const payload = action.payload;
      const comments = state.comments;

      if (payload.parent_id) {
        const parent = comments.find((e) => e.id === payload.parent_id);

        if (parent) {
          if (!parent.children) {
            parent.children = [];
          }

          const exists = parent?.children.some((c) => c.id === payload.id);

          if (!exists) {
            parent?.children.push(payload);
          }
        }
      } else {
        const exists = comments.some((c) => c.id === payload.id);

        if (!exists) {
          state.comments.push(payload);
        }
      }
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(getBlogs.fulfilled, (state, action) => {
        state.blogs = action.payload;
      })
      .addCase(getBlogDetail.fulfilled, (state, action) => {
        state.blog = action.payload;
      })
      .addCase(getBlogComment.fulfilled, (state, action) => {
        state.comments = action.payload;
      }),
});

export const { addComment } = blogSlice.actions;
export default blogSlice.reducer;
