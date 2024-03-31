	import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
	import axios from '../../axios.js'

	export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
		const { data } = await axios.get('/posts')
		return data
	})

	export const fetchPopularPosts = createAsyncThunk('posts/fetchPopularPosts', async () => {
		const { data } = await axios.get('/posts/popular')
		return data
	})

	export const fetchTags = createAsyncThunk('posts/fetchTags', async () => {
		const { data } = await axios.get('/posts/tags')
		return data
	})

	export const fetchRemovePost = createAsyncThunk('posts/fetchRemovePost', async (id) => {
		await axios.delete(`/posts/${id}`)
	})

	export const fetchPostByTag = createAsyncThunk('posts/fetchPostByTag', async (tag) => {
		const { data } = await axios.get(`/posts/tags/${tag}`)
		return data
	})

	export const fetchComments = createAsyncThunk('posts/fetchComments', async (id) => {
		const { data } = await axios.get(`/posts/${id}/comments`)
		return data
	})

	export const fetchRemoveComment = createAsyncThunk('posts/fetchRemoveComment',async ({ postId, commentId }) => {
			await axios.delete(`/posts/${postId}/comments/${commentId}`);
			return { postId, commentId };
		}
	);

	const initialState = {
		posts: {
			items: [],
			status: 'loading',
		},
		tags: {
			items: [],
			status: 'loading'
		},
		popularPosts: {
			items: [],
			status: 'loading',
		},
		postsByTag: {
			items: [],
			status: 'loading',
		},
		comments: {
			items: [],
			status: 'loading',
		},
		commentsLast: {
			items: [],
			status: 'loading',
		},
	}

	const postSlice = createSlice({
		name: 'posts',
		initialState,
		reducers: {
			removeComment(state, action) {
				const { postId, commentId } = action.payload;
				const post = state.posts.items.find(post => post._id === postId);
				if (post) {
					post.comments = post.comments.filter(comment => comment._id !== commentId);
				}
			},
		},
		extraReducers: (builder) => {
			builder
				.addCase(fetchPosts.pending, (state, action) => {
					state.posts.items = []
					state.posts.status = 'loading'
				})
				.addCase(fetchPosts.fulfilled, (state, action) => {
					state.posts.items = action.payload
					state.posts.status = 'loaded'
				})
				.addCase(fetchPosts.rejected, (state, action) => {
					state.posts.items = []
					state.posts.status = 'error'
				})
				.addCase(fetchTags.pending, (state, action) => {
					state.tags.items = []
					state.tags.status = 'loading'
				})
				.addCase(fetchTags.fulfilled, (state, action) => {
					state.tags.items = action.payload
					state.tags.status = 'loaded'
				})
				.addCase(fetchTags.rejected, (state, action) => {
					state.tags.items = []
					state.tags.status = 'error'
				})
				.addCase(fetchRemovePost.pending, (state, action) => {
					state.posts.items= state.posts.items.filter((obj) => obj._id !== action.meta.arg)
				})
				.addCase(fetchPopularPosts.pending, (state, action) => {
					state.popularPosts.items = []
					state.popularPosts.status = 'loading'
				})
				.addCase(fetchPopularPosts.fulfilled, (state, action) => {
					state.popularPosts.items = action.payload
					state.popularPosts.status = 'loaded'
				})
				.addCase(fetchPopularPosts.rejected, (state, action) => {
					state.popularPosts.items = []
					state.popularPosts.status = 'error'
				})
				.addCase(fetchPostByTag.pending, (state, action) => {
					state.postsByTag.items = []
					state.postsByTag.status = 'loading'
				})
				.addCase(fetchPostByTag.fulfilled, (state, action) => {
					state.postsByTag.items = action.payload
					state.postsByTag.status = 'loaded'
				})
				.addCase(fetchPostByTag.rejected, (state, action) => {
					state.postsByTag.items = []
					state.postsByTag.status = 'error'
				})
				.addCase(fetchComments.pending, (state) => {
					state.comments.status = 'loading';
				})
				.addCase(fetchComments.fulfilled, (state, action) => {
					state.comments.status = 'loaded';
					state.comments.items = action.payload;
				})
				
				.addCase(fetchComments.rejected, (state) => {
					state.comments.status = 'error';
				})
		}
	})

	const postReducer = postSlice.reducer
	export const {removeComment} = postSlice.actions

	export default postReducer