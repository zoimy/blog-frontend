import React, { useEffect, useState } from "react";

import { SideBlock } from "./SideBlock";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import Skeleton from "@mui/material/Skeleton";
import { useDispatch, useSelector } from "react-redux";
import { fetchRemoveComment, removeComment } from "../redux/slices/posts";

export const CommentsBlock = ({currentUser, items, id, children, isLoading = true }) => {
	const dispatch = useDispatch()
	
	const handleDeleteComment = async (postId, commentId) => {
		const comment = items.find(comment => comment._id === commentId);
		
		if (!currentUser || comment.user._id !== currentUser._id) {
      alert("You are not creator of this post");
      return;
    }

		dispatch(removeComment({ postId, commentId }));
    await dispatch(fetchRemoveComment({ postId, commentId }));
	};

	return (
		<SideBlock title="Комментарии">
			<List>
				{(isLoading ? [...Array(5)] : items).map((comment, index) => (
					<React.Fragment key={index}>
						<ListItem alignItems="flex-start">
							<ListItemAvatar>
								{isLoading ? (
									<Skeleton variant="circular" width={40} height={40} />
								) : (
									<Avatar alt={comment.user.fullName} src={comment.user?.avatarUrl} />
								)}
							</ListItemAvatar>
							{isLoading ? (
								<div style={{ display: "flex", flexDirection: "column" }}>
									<Skeleton variant="text" height={25} width={120} />
									<Skeleton variant="text" height={18} width={230} />
								</div>
							) : (
								<>
									<ListItemText
										primary={comment.user.fullName}
										secondary={comment.text}
									/>
									<button
										onClick={() => handleDeleteComment(id, comment._id)}
										style={{ display: currentUser && currentUser._id === comment.user._id ? 'flex' : 'none' , alignItems: 'center', justifyContent: 'center'}}
									>
										Удалить
									</button>
								</>
							)}
						</ListItem>
						<Divider variant="inset" component="li" />
					</React.Fragment>
				))}
			</List>
			{children}
		</SideBlock>
	);
};

