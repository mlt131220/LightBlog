import React, {useState, useContext, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {Article} from './styled';
import {IconFontCtx} from '@/App';
import type {PaginationProps} from 'antd';
import {Button, Spin, Pagination} from 'antd';
import {getListByName} from '@/service/api/tags';
import {dateTimeFormat} from '@/utils/dateUtil';

interface PropsType {
    tag: string;
}

const ArticleList: React.FC<PropsType> = ({tag}) => {
    const IconFont = useContext(IconFontCtx);
    const navigate = useNavigate();

    const [list, setList] = useState<Array<ArticleItem>>([]);
    const [loading, setLoading] = useState(false);
    //分页
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);

    async function getArticleList(current: number, ignore: boolean) {
        if (tag === '') return;
        setLoading(true);

        let res: responsePageTypes<Array<ArticleItem>>;
        const params = {
            pageSize: 10,
            page: current,
            name: tag
        };

        res = await getListByName(params);

        setLoading(false);
        if (!ignore) {
            setList(res.items);
            setTotal(res.total);
        }
    }

    //请求文章列表
    useEffect(() => {
        let ignore = false;

        getArticleList(page, ignore);

        return () => {
            ignore = true;
        };
    }, [tag]);

    const onPageChange: PaginationProps['onChange'] = async (page) => {
        setPage(page);

        getArticleList(page, false);
    };

    //开始阅读
    function reader(article: ArticleItem) {
        navigate('/article/details/' + article.id, {state: article});
    }

    return (
        <Spin
            tip="人类的悲欢并不相通，我只觉他们吵闹"
            spinning={loading}
            wrapperClassName="w-full"
            className="w-full"
        >
            {list?.map(item => (
                <Article hoverable key={item.id}>
                    <div className="img">
                        <img src={item.image} alt={item.title}/>
                    </div>

                    <div className="px-6 py-4">
                        <h3 onClick={() => reader(item)}>{item.title}</h3>
                        <p>
                            <IconFont type="ng-date"/> {dateTimeFormat(item.createTime)}
                        </p>
                        <div className="desc">{item.introduction}</div>
                        <Button
                            shape="round"
                            type="primary"
                            className="button"
                            danger
                            onClick={() => reader(item)}
                        >
                            开始阅读
                        </Button>
                    </div>
                </Article>
            ))}
            <Pagination current={page} pageSize={10} size="small" total={total} hideOnSinglePage={true} onChange={onPageChange} className="text-right"/>
        </Spin>
    );
};

export default ArticleList;
