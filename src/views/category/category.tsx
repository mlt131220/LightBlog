import React, { useContext, useEffect, useState } from 'react';
import { Badge, Card } from 'antd';
import { IconFontCtx } from '@/App';
import TopImage from '@/components/TopImage';
import {CategoryResultStyled, CategoryStyled} from '@/styled/view/category/category';
import { getStatistics } from '@/service/api/article_category';
import ArticleList from '@/components/ArticleList';
import Side from '@/components/Side';

const category: React.FC = () => {
	const IconFont = useContext(IconFontCtx);

	const [categoryList, setCategoryList] = useState<Array<ArticleCategoryStatistics>>([]);
	const [activeCategory, setActiveCategory] = useState(0);
	const [categoryId, setCategoryId] = useState(1);

	useEffect(() => {
		let ignore = false;

		async function getCategoryStatistics() {
			const res: Array<ArticleCategoryStatistics> = await getStatistics();
			if (!ignore) {
                setCategoryList(res);
                setCategoryId(res[0].id);
            }
		}

		getCategoryStatistics();

		return () => {
			ignore = true;
		};
	}, []);

    function changeActiveCategory(category:ArticleCategoryStatistics,index:number){
        setActiveCategory(index);
        setCategoryId(category.id)
    }

	const colorList = [
		'',
		'pink',
		'#fab1a0',
		'cyan',
		'green',
		'purple',
		'volcano',
		'magenta',
		'#1abc9c',
		'#f39c12',
		'#34e7e4',
		'#786fa6',
		'#63cdda',
	];
	return (
		<>
			<TopImage />

			<CategoryStyled className="flex flex-col relative left-19vw bottom-14vh">
				<h2 className="text-center color-#333 my-4">
					<IconFont type="ng-16gl-quoteLeft" />
					&nbsp;文章分类&nbsp;
					<IconFont type="ng-16gl-quoteRight" />
				</h2>
				<div className="flex justify-around flex-wrap">
					{categoryList?.map((category, index) => (
						<Badge.Ribbon
							key={category.id}
							text={category.count}
							color={colorList[index]}
						>
							<Card
								size="small"
								className={activeCategory === index ? 'active' : ''}
								hoverable
								bodyStyle={{ padding: '0.5rem 30px' }}
                                onClick={()=>changeActiveCategory(category,index)}
							>
								{category.name}
							</Card>
						</Badge.Ribbon>
					))}
				</div>
			</CategoryStyled>

            <CategoryResultStyled className='w-62vw flex items-start  relative left-19vw bottom-11vh'>
				{/*文章区域*/}
				<div className="articleParent flex justify-between w-41vw min-h-30vh">
					<ArticleList categoryId={categoryId}></ArticleList>
				</div>
				{/* 侧边栏 */}
                <div className="ml-2vw">
                  <Side />
                </div>
			</CategoryResultStyled>
		</>
	);
};

export default category;
