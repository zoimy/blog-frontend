import React, { useState } from "react";
import styles from "./AddComment.module.scss";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { fetchAddComment } from "../../redux/slices/posts.js";
import axios from '../../axios.js'

export const Index = ({ postId }) => {
  const [commentText, setCommentText] = useState("");
	const user = useSelector((state) => state.auth.data)
  const dispatch = useDispatch();


	const handleCommentSubmit = async () => {
		try {
			const commentData = {
				text: commentText,
				user: {
					userId: user._id, // Преобразуем ObjectId в строку
					fullName: user.fullName,
					avatarUrl: user.avatarUrl
				}
			};
			
			await axios.post(`/posts/${postId}/comments`, commentData);
			console.log(commentData);
			setCommentText("");
		} catch (error) {
			console.log("Comment Add Error");
		}
	};
	
  const handleTextChange = (e) => {
    setCommentText(e.target.value);
  };

  return (
    <>
      <div className={styles.root}>
        <Avatar
          classes={{ root: styles.avatar }}
          src="https://mui.com/static/images/avatar/5.jpg"
        />
        <div className={styles.form}>
          <TextField
            label="Type your comment"
            variant="outlined"
            maxRows={10}
            multiline
            fullWidth
            value={commentText}
            onChange={handleTextChange} // Изменено здесь
          />
          <Button variant="contained" className={styles.button} onClick={handleCommentSubmit}>
            Send
          </Button>
        </div>
      </div>
    </>
  );
};
