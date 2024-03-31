import React, { useEffect, useState } from "react";

import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";
import axios from '../axios.js'
import { useParams } from 'react-router-dom'
import ReactMarkdown from "react-markdown";
import { useDispatch, useSelector } from "react-redux";
import { fetchComments } from "../redux/slices/posts.js";

export const FullPost = () => {
	const [data, setData] = useState()
	const [loading, setLoading] = useState(true)
	const [comments, setComments] = useState([])
	const currentUser=  useSelector((state) => state.auth.data)
	const { id } = useParams()
	const dispatch = useDispatch()

	
	useEffect(() => {
		const fetchData = async () => {
				try {
						const response = await dispatch(fetchComments(id));
						setComments(response.payload); // Сохраняем полученные комментарии в состоянии
				} catch (error) {
						console.error("Error fetching comments:", error);
				}
		};

		fetchData();
}, [dispatch, id]);

	useEffect(() => {
		axios.get(`/posts/${id}`)
			.then((res) => {
				setData(res.data);
				setLoading(false);
			})
			.catch((err) => {
				console.warn(err);
				alert('Ошибка получении статьи');
			});
	}, []);


	if (loading) {
		return <Post isLoading={loading} isFullPost />
	}

	return (
		<>
			<Post
				id={data._id}
				key={data._id}
				title={data.title}
				imageUrl={data.imageUrl ? `${process.env.REACT_APP_API_URL}${data.imageUrl}` : ''}
				user={data.user}
				createdAt={data.createdAt}
				viewsCount={data.viewsCount}
				commentsCount={data.comments.length}
				tags={data.tags}
				isFullPost
			>
					<ReactMarkdown children={data.text} />
			</Post>
			<CommentsBlock
			  items={comments}
				isLoading={false}
				id={id}
				currentUser={currentUser}
			>
				<Index postId={id}/>
			</CommentsBlock>
		</>
	);
};
