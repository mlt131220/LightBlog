import React, {useContext, useEffect, useState} from 'react';
import TopImage from '@/components/TopImage';
import Side from '@/components/Side';
import {TimelineCardStyled, TimelineContainerStyled} from '@/styled/view/timeline/timeline';
import {Timeline} from 'antd';
import {ClockCircleOutlined} from '@ant-design/icons';
import {IconFontCtx} from '@/App';
import {getTimeline} from "../../service/api/article";
import {useNavigate} from "react-router-dom";

const TimeLine: React.FC = () => {
    const IconFont = useContext(IconFontCtx);
    const navigate = useNavigate();

    const [pending, setPending] = useState<boolean | string>(false);

    const [list, setList] = useState<{ [s: string]: Array<ArticleItem> }>({});
    //分页
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);

    function tlScroll(e: any) {
        const {scrollTop, clientHeight, scrollHeight} = e.target;
        if (scrollTop + clientHeight === scrollHeight) {
            if(page * 10 < total){
                setPage(page + 1);
                getList(page + 1,false);
            }
        }
    }

    async function getList(current: number, ignore: boolean) {
        setPending("加载中...");

        let res: responsePageTypes<Array<ArticleItem>>;
        const params = {
            pageSize: 10,
            page: current
        };
        res = await getTimeline(params);

        setPending(false);

        if (!ignore) {
            res.items.forEach((item) => {
                if (list[item.nian + '年'] === undefined) list[item.nian + '年'] = [];

                list[item.nian + '年'].push(item);
            })
            setList(list);
            console.log(list)
            setTotal(res.total);
        }
    }

    //请求时间线列表
    useEffect(() => {
        let ignore = false;

        getList(page, ignore);

        return () => {
            ignore = true;
        };
    }, []);

    //开始阅读
    function reader(article: ArticleItem) {
        navigate('/article/details/' + article.id, { state: article });
    }

    return (
        <div>
            <TopImage/>

            <TimelineContainerStyled className="w-62vw flex items-start  relative left-19vw bottom-20vh">
                <div className="w-41vw">
                    <TimelineCardStyled>
                        <h2 className="text-center color-#333 mb-6">
                            <IconFont type="ng-16gl-quoteLeft"/>
                            &nbsp;归档&nbsp;
                            <IconFont type="ng-16gl-quoteRight"/>
                        </h2>
                        <div className="timeline" onScroll={e => tlScroll(e)}>
                            <Timeline pending={pending}>
                                {Object.keys(list)?.map(year => (
                                    <div key={year}>
                                        <Timeline.Item dot={<ClockCircleOutlined style={{fontSize: '14px'}}/>} >
                                            {year}
                                        </Timeline.Item>
                                        {
                                            list[year]?.map(item =>
                                                <Timeline.Item color="green" key={item.id}>
                                                    <div className="con flex">
												        <span className="color-#888 text-0.6rem">{item.createTime}</span>
                                                        <p className="color-#57606f text-0.7rem" onClick={() => reader(item)}>{item.title}</p>
                                                    </div>
                                                </Timeline.Item>
                                            )
                                        }
                                    </div>
                                ))}
                            </Timeline>
                        </div>
                    </TimelineCardStyled>
                </div>
                {/* 侧边栏 */}
                <div className="ml-2vw">
                    <Side/>
                </div>
            </TimelineContainerStyled>
        </div>
    );
};

export default TimeLine;
