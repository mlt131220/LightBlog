import React, { useEffect, useState } from 'react';
import { SideStyled, BloggerStyled, TagsStyled } from './styled';
import { Avatar } from 'antd';
import { TagsOutlined } from '@ant-design/icons';
import { getStatistics } from '@/service/api/tags';
import { useNavigate, useLocation } from 'react-router-dom';
import {getSynthesizeStatistics} from "@/service/api/article";

const Side: React.FC = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const pathname = location.pathname;

	const [tagList, setTagList] = useState<Array<TagStatistics>>([]);
	const [synthesize, setSynthesize] = useState<SynthesizeStatistics>({
        article_count:0,
        category_count:0,
        tags_count:0
    });

	useEffect(() => {
		let ignore = false;

		async function init() {
			const res: Array<TagStatistics> = await getStatistics();
			const synthesizeRes:Array<SynthesizeStatistics> = await getSynthesizeStatistics();
			if (!ignore) {
				setTagList(res);
                setSynthesize(synthesizeRes[0]);
			}
		}

		init();

		return () => {
			ignore = true;
		};
	}, []);

	function tagClick(tag: TagStatistics) {
		navigate('/tags', { state: { name: tag.name } });
	}

	return (
		<SideStyled className="side">
			{/* 博主信息 */}
			<BloggerStyled>
				<div className="mask"></div>
				<Avatar src="/static/img/photo.jpg" />
				<h2>{import.meta.env.VITE_GLOB_MASTER}</h2>
				<p>情深不寿，慧极必伤</p>

				<div className="statistics">
					<div className="statistics-item" onClick={()=>navigate("/")}>
						<span>{synthesize.article_count}</span>
						<span>文章</span>
					</div>
					<div className="statistics-item" onClick={()=>navigate("/category")}>
						<span>{synthesize.category_count}</span>
						<span>分类</span>
					</div>
					<div className="statistics-item" onClick={()=>navigate("/tags")}>
						<span>{synthesize.tags_count}</span>
						<span>标签</span>
					</div>
				</div>
			</BloggerStyled>

			{/* 标签云 */}
			{pathname !== '/tags' && (
				<TagsStyled>
					<h3 className="title">
						<TagsOutlined />
						&nbsp;&nbsp;标签
					</h3>

					<div className="flex flex-wrap">
						{tagList.map(tag => (
							<div
								key={tag.id}
								className="flex items-center hover:opacity-50 mr-2 mb-2 cursor-pointer transition-all bg-#f1f3f8 text-0.6rem tag"
								onClick={() => tagClick(tag)}
							>
								<span>
									<em className="opacity-50">#</em>&nbsp;{tag.name}
								</span>
								<span className="text-center px-2 py-1 rounded-tr-md rounded-br-md opacity-70 tag-num">
									{tag.count}
								</span>
							</div>
						))}
					</div>
				</TagsStyled>
			)}
		</SideStyled>
	);
};

export default Side;
