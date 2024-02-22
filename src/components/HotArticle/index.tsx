import React, {useState,useContext,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { Hot,HotCard} from "./styled";
import { Button } from 'antd';
import {IconFontCtx} from "@/App";
import { getRecommend } from '@/service/api/article';

const HotArticle: React.FC = () => {
    const IconFont = useContext(IconFontCtx);
    const navigate = useNavigate();

    const [hotList, setHotList] = useState<Array<ArticleItem>>([])

    //请求文章列表
	useEffect(() => {
		let ignore = false;

		async function getHotList() {
			const res: Array<ArticleItem> = await getRecommend();
			if (!ignore) setHotList(res);
		}
		getHotList();

		return () => {
			ignore = true;
		};
	}, []);

    //开始阅读
	function reader(article: ArticleItem) {
		navigate('/article/details/' + article.id, { state: article });
	}

    return (
        <Hot className="flex flex-col relative left-19vw bottom-20vh">
            <h2 className="text-center color-#333 my-4">
                <IconFont type="ng-16gl-quoteLeft"/>&nbsp;文章推荐&nbsp;<IconFont type="ng-16gl-quoteRight"/>
            </h2>
            <div className="cardParent flex justify-between">
                {
                    hotList.map((item, index) =>
                        <HotCard key={index}>
                            <h3 className="title">{item.title}</h3>
                            <div className="desc">{item.introduction}</div>
                            <Button shape="round" type="primary" className="button" danger onClick={() => reader(item)}>开始阅读</Button>
                            <img src={item.image} alt={item.title}/>
                        </HotCard>
                    )
                }
            </div>
        </Hot>
    )
}

export default HotArticle;
