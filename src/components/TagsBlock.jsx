import React from "react";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import TagIcon from "@mui/icons-material/Tag";
import ListItemText from "@mui/material/ListItemText";
import Skeleton from "@mui/material/Skeleton";
import styles from './TagsBlock.module.scss'


import { SideBlock } from "./SideBlock";
import { Typography } from "@mui/material";

export const TagsBlock = ({ items, isLoading = true }) => {
	return (
		<>
			<Typography title="Тэги" className={styles.title}>Tags</Typography>
			<List style={{ backgroundColor: "#dda15e" }}>
				{(isLoading ? [...Array(5)] : items).map((name, i) => (
					<a
						style={{ textDecoration: "none", color: "black" }}
						href={`/tags/${name}`}
						key={i}
					>
						<ListItem disablePadding className={styles.tag}>
							<ListItemButton>
								<ListItemIcon>
									<TagIcon />
								</ListItemIcon>
								{isLoading ? (
									<Skeleton width={100} />
								) : (
									<ListItemText primary={name} />
								)}
							</ListItemButton>
						</ListItem>
					</a>
				))}
			</List>
		</>
	);
};
