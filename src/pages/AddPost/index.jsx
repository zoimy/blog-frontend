import React, { useEffect, useRef } from 'react';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SimpleMDE from 'react-simplemde-editor';

import 'easymde/dist/easymde.min.css';
import styles from './AddPost.module.scss';
import { useSelector } from 'react-redux';
import { selectIsAuth } from '../../redux/slices/auth';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import axios from '../../axios.js';

export const AddPost = () => {
	const { id } = useParams()
	const navigate = useNavigate();
	const [text, setText] = React.useState('');
	const [title, setTitle] = React.useState('');
	const [tags, setTags] = React.useState('');
	const [isLoading, setIsLoading] = React.useState(false);
	const [imageUrl, setImageUrl] = React.useState('');
	const isAuth = useSelector(selectIsAuth);
	const imageUrlRef = useRef(null);
	const isEditing = Boolean(id)

	const handleChangeFile = async (event) => {
		try {
			const formData = new FormData();
			const file = event.target.files[0];
			formData.append('image', file);
			const { data } = await axios.post('/upload', formData);
			setImageUrl(data.url);
		} catch (error) {
			console.warn(error);
			console.log('Wrong to obtain image!');
		}
	};

	const onClickRemoveImage = () => {
		setImageUrl('');
	};

	const onChange = React.useCallback((value) => {
		setText(value);
	}, []);

	useEffect(() => {
		if (id) {
			axios
				.get(`/posts/${id}`)
				.then(({ data }) => {
					setTitle(data.title);
					setText(data.text);
					setImageUrl(data.imageUrl);
					setTags(data.tags.join(','));
				})
				.catch((err) => {
					console.warn(err);
					alert('Ошибка при получении статьи!');
				});
		}
	}, []);

	const onSubmit = async () => {
		try {

			const fields = {
				title,
				imageUrl,
				tags,
				text,
			};
			const { data } = isEditing ?
				await axios.patch(`/posts/${id}`, fields) :
				await axios.post('/posts', fields)

			const _id = isEditing ? id : data._id;

			navigate(`/posts/${_id}`);
		} catch (err) {
			console.warn(err);
			alert('Wrong creation post !');
		}
	};

	const customStyles = `
  .editor-toolbar {
    background-color: #dda15e;
  }
  .CodeMirror {
    background-color: #dda15e;
  }
`;

	const options = React.useMemo(
		() => ({
			spellChecker: false,
			maxHeight: '400px',
			autofocus: true,
			placeholder: 'Type text...',
			status: false,
			autosave: {
				enabled: true,
				delay: 1000,
				uniqueId: 'fdssf'
			},
		}),
		[],
	);

	if (!window.localStorage.getItem('token') && !isAuth) {
		return <Navigate to='/' />;
	}

	return (
		<Paper className={styles.paper}>
			<Button className={styles.upload} variant="outlined" onClick={() => imageUrlRef.current.click()} size="large">
				Upload image
			</Button>
			<input ref={imageUrlRef} type="file" onChange={handleChangeFile} hidden />
			{imageUrl && (
				<>
					<Button variant="contained" color="error" onClick={onClickRemoveImage}>
						Remove
					</Button>
					<img className={styles.image} src={`${process.env.REACT_APP_API_URL}${imageUrl}`} alt="Uploaded" />
				</>
			)}
			<br />
			<br />
			<TextField
				classes={{ root: styles.title }}
				variant="standard"
				placeholder="Your title..."
				fullWidth
				value={title}
				onChange={(e) => setTitle(e.target.value)}
			/>
			<TextField
				classes={{ root: styles.tags }}
				variant="standard"
				placeholder="Tags"
				fullWidth
				value={tags}
				onChange={(e) => setTags(e.target.value)}
			/>
			<SimpleMDE className={styles.editor} value={text} onChange={onChange} options={options} customStyles={customStyles}/>
			<div className={styles.buttons}>
				<Button onClick={onSubmit} className={styles.submitBtn} size="large" variant="contained">
					{isEditing ? 'Submit changes' : "Publish"}
				</Button>
				<a href="/">
					<Button size="large" className={styles.cancelBtn}>Cancel</Button>
				</a>
			</div>
		</Paper>
	);
};

export default AddPost;
