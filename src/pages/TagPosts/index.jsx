import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostByTag } from "../../redux/slices/posts";
import { useParams } from "react-router-dom";
import { Post } from "../../components";

const TagPosts = ({ match }) => {
  const dispatch = useDispatch();
  const {tag} = useParams()
  const posts = useSelector((state) => state.posts.postsByTag.items);
  const isLoading = useSelector((state) => state.posts.postsByTag.status === 'loading');
	const userData = useSelector((state) => state.auth.data); 

  useEffect(() => {
    dispatch(fetchPostByTag(tag));
  }, [dispatch, tag]);

  return (
    <div>
      <h1>Posts with tag: #{tag}</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {posts.map((post) => (
           <Post
					 id={post._id}
					 key={post._id}
					 title={post.title}
					 imageUrl={post.imageUrl ? `${process.env.REACT_APP_API_URL}${post.imageUrl}` : ''}
					 user={post.user}
					 createdAt={post.createdAt}
					 viewsCount={post.viewsCount}
					 commentsCount={3}
					 tags={post.tags}
					 isEditable={userData?._id === post?.user?._id}
			 />
          ))}
        </ul>
      )}
    </div>
  );
};

export default TagPosts;
