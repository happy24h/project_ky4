import { createSlice } from '@reduxjs/toolkit';
const blogSlice = createSlice({
    name: 'blog',
    initialState: {
        blog: {
            blogCurrent: null,
            isFetching: false,
            error: false,
            detailBlog: null,
        },
    },
    reducers: {
        blogStart: (state) => {
            state.blog.isFetching = true;
        },
        blogSuccess: (state, action) => {
            state.blog.isFetching = false;
            state.blog.error = false;
            state.blog.blogCurrent = action.payload;
        },
        blogFailed: (state) => {
            state.blog.isFetching = false;
            state.blog.error = true;
        },

        detailBlogStart: (state) => {
            state.blog.isFetching = true;
        },
        detailBlogSuccess: (state, action) => {
            state.blog.isFetching = false;
            state.blog.error = false;
            state.blog.detailBlog = action.payload;
        },
        detailBlogFailed: (state) => {
            state.blog.isFetching = false;
            state.blog.error = true;
        },

        deleteBlogStart: (state) => {
            state.blog.isFetching = true;
        },
        deleteBlogSuccess: (state) => {
            state.blog.isFetching = false;
            state.blog.error = false;
        },
        deleteBlogFailed: (state) => {
            state.blog.isFetching = false;
            state.blog.error = true;
        },
    },
});

export const { blogStart, blogSuccess, blogFailed,
    detailBlogStart, detailBlogSuccess, detailBlogFailed,
    deleteBlogStart, deleteBlogSuccess, deleteBlogFailed
} = blogSlice.actions;

export default blogSlice.reducer;
