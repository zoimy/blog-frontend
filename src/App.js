import Container from "@mui/material/Container";

import { Header, TagsBlock } from "./components";
import { Home, FullPost, Registration, AddPost, Login } from "./pages";
import {Routes,Route, Outlet} from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { fetchAuthMe, selectIsAuth } from "./redux/slices/auth";
import { useEffect } from "react";
import { getSpeedDialActionUtilityClass } from "@mui/material";
import TagPosts from "./pages/TagPosts";

function App() {
	const isAuth = useSelector(selectIsAuth)
	const dispatch = useDispatch()
	
	useEffect(() => {
		dispatch(fetchAuthMe())
	},[])

  return (
    <>
      <Header />
      <Container maxWidth="lg">
				<Routes>
					<Route path="/" element={<Home/>}/>
					<Route path="/posts/:id" element={<FullPost/>}/>
					<Route path="/posts/:id/edit" element={<AddPost/>}/>
					<Route path="/add-post" element={<AddPost/>}/>
					<Route path="/login" element={<Login/>}/>
					<Route path="/register" element={<Registration/>}/>
					<Route path="/tags/:tag" element={<TagPosts/>} />
				</Routes>
      </Container>
    </>
  );
}

export default App;
