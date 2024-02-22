import React, { useContext, useEffect, useState } from 'react';
import { Badge, Card } from 'antd';
import { IconFontCtx } from '@/App';
import TopImage from '@/components/TopImage';
import {TagsResultStyled, TagsStyled} from '@/styled/view/tags/tags';
import { getStatistics } from '@/service/api/tags';
import TagArticleList from "@/components/ArticleList/tagArticleList"
import Side from '@/components/Side';
import { useLocation } from 'react-router-dom';

const tags: React.FC = () => {
	const IconFont = useContext(IconFontCtx);
    const location = useLocation();
	const state = location.state;

	const [tagList, setTagList] = useState<Array<TagStatistics>>([]);
	const [activeTag, setActiveTag] = useState(0);
	const [tagName, setTagName] = useState("");

	useEffect(() => {
		let ignore = false;

		async function getCategoryStatistics() {
			const res: Array<TagStatistics> = await getStatistics();
			if (!ignore) {
                setTagList(res);

                if(state?.name){
                    setTagName(state.name);
                    setActiveTag(res.findIndex(tag => tag.name === state.name));
                }else{
                    setTagName(res[0].name);
                }
            }
		}

		getCategoryStatistics();

		return () => {
			ignore = true;
		};
	}, []);

    function changeActiveCategory(tag:TagStatistics,index:number){
        setActiveTag(index);
        setTagName(tag.name);
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

			<TagsStyled className="flex flex-col relative left-19vw bottom-14vh">
				<h2 className="text-center color-#333 my-4">
					<IconFont type="ng-16gl-quoteLeft" />
					&nbsp;标签&nbsp;
					<IconFont type="ng-16gl-quoteRight" />
				</h2>
				<div className="flex justify-around flex-wrap">
					{tagList?.map((tag, index) => (
						<Badge.Ribbon
							key={tag.id}
							text={tag.count}
							color={colorList[index]}
						>
							<Card
								size="small"
								className={activeTag === index ? 'active' : ''}
								hoverable
								bodyStyle={{ padding: '0.5rem 30px' }}
                                onClick={()=>changeActiveCategory(tag,index)}
							>
								{tag.name}
							</Card>
						</Badge.Ribbon>
					))}
				</div>
			</TagsStyled>

            <TagsResultStyled className='w-62vw flex items-start  relative left-19vw bottom-11vh'>
				{/*文章区域*/}
				<div className="articleParent flex justify-between w-41vw min-h-30vh">
					<TagArticleList tag={tagName}></TagArticleList>
				</div>
				{/* 侧边栏 */}
                <div className="ml-2vw">
                  <Side />
                </div>
			</TagsResultStyled>
		</>
	);
};

export default tags;
