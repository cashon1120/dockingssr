
import React from 'react'
import intl from '../utils/intl'
import Link from 'next/link';
import fetch from 'isomorphic-unfetch';
import { Pagination, Spin } from 'antd';
import Footer from '../components/footer'
import {API_URL} from '../config'


let size = 10
const num = 1
class BlogList extends React.Component{
    state = {
        spaData: [],
        loading: false
    }
    onChange = (num, size) => {
        this.getData(num, size)
    }

    async getData(num, size){
        this.setState({
            loading: true
        })
        const res = await fetch(`/park/app/home/list_blog?num=${num}&size=${size}`);
        const data = await res.json();
        if(data.success){
            this.setState({
                spaData: data.data.list,
                loading: false
            })
        }
    }

    render(){
        const {data} = this.props.data
        const {spaData, loading} = this.state
        const result = spaData.length > 0 ? spaData : data.data.list
        return <div className="main blog-main">
           <div className="blog-wrapper">
                <div className="title">
                    <h1>{intl.get('blog.title')}</h1>
                    {intl.get('blog.desc')}
                </div>
                <Spin spinning={loading}>
                    <ul className="blog-list">
                        {result.map(item => 
                        <Link href={`/blogdetail/${item.id}`}>
                        <li key={item.id}>
                                <a>
                                    <div>
                                        <div className="left"><h2>{item.title}></h2>{item.publish_time.split(' ')[0]}</div>
                                        <div><img src={item.img} /></div>
                                    </div>
                                </a>
                            </li>   
                        </Link>
                    )}
                    </ul>
                    <div className="pagination"> <Pagination defaultCurrent={1} total={data.data.totalRow} onChange={this.onChange} /></div>
                </Spin>
            </div>
            <Footer/>
        </div>
    }
}
BlogList.getInitialProps = async function () {
    const res = await fetch(`${API_URL}/park/app/home/list_blog?num=${num}&size=${size}`);
    const data = await res.json();
    return {
        data: {data}
    }
}
export default BlogList;