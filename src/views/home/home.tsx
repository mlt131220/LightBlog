import React, { useState } from 'react';
import TopImage from '@/components/TopImage';
import HotArticle from '@/components/HotArticle';
import ArticleList from '@/components/ArticleList';
import Side from '@/components/Side';
import {ContainerStyled} from "@/styled/view/home/home";

const home: React.FC = () => {
	return (
		<>
			<TopImage />
			<HotArticle></HotArticle>
			<ContainerStyled className='w-62vw flex items-start relative left-19vw bottom-17vh'>
				{/*文章区域*/}
				<div className="articleParent flex justify-between w-41vw min-h-30vh">
					<ArticleList></ArticleList>
				</div>
				{/* 侧边栏 */}
                <div className="ml-2vw">
                  <Side />
                </div>
			</ContainerStyled>
		</>
	);
};

export default home;
