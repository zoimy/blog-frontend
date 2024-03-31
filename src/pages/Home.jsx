import React, { useEffect, useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';

import { Post } from '../components/Post';
import { TagsBlock } from '../components/TagsBlock';
import { CommentsBlock } from '../components/CommentsBlock';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllComments, fetchPopularPosts, fetchPosts, fetchTags } from '../redux/slices/posts';

export const Home = () => {
	const dispatch = useDispatch();
	const { posts, tags, popularPosts } = useSelector((state) => state.posts);
	const userData = useSelector((state) => state.auth.data);
	const isLoadingPost = posts.status === 'loading';
	const isLoadingTags = tags.status === 'loading';
	const isLoadingPopularPosts = popularPosts.status === 'loading';
	const [currentTab, setCurrentTab] = useState(0);
	const { comments } = useSelector((state) => state.posts)

	useEffect(() => {
		dispatch(fetchTags());
		dispatch(fetchPosts());
	}, []);

	const handleTabChange = (event, newValue) => {
		setCurrentTab(newValue);
		if (newValue === 1 && popularPosts.items.length === 0) {
			dispatch(fetchPopularPosts());
		}
	};

	return (
		<>
			<Tabs style={{ marginBottom: 15 }} value={currentTab} onChange={handleTabChange} aria-label="basic tabs example">
				<Tab label="Новые" />
				<Tab label="Популярные" />
			</Tabs>
			<Grid container spacing={4}>
				<Grid xs={8} item>
					{(isLoadingPost || (currentTab === 1 && isLoadingPopularPosts) ? [...Array(5)] : (currentTab === 0 ? posts.items : popularPosts.items)).map((obj, index) => (
						isLoadingPost || (currentTab === 1 && isLoadingPopularPosts) ? (
							<Post
								isLoading={true}
								key={index}
							/>
						) : (
							<Post
								id={obj._id}
								key={obj._id}
								title={obj.title}
								imageUrl={obj.imageUrl ? `http://localhost:4444${obj.imageUrl}` : ''}
								user={obj.user}
								createdAt={obj.createdAt}
								viewsCount={obj.viewsCount}
								commentsCount={obj.comments.length}
								tags={obj.tags}
								isEditable={userData?._id === obj?.user?._id}
							/>
						)
					))}
				</Grid>
				<Grid xs={4} item>
					<TagsBlock items={tags.items} isLoading={isLoadingTags} />
					<CommentsBlock
						items={comments.items}
						isLoading={false}
					/>
				</Grid>
			</Grid>
		</>
	);
};
