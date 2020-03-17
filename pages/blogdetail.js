
import React from 'react'
import fetch from 'isomorphic-unfetch';
import { Spin } from 'antd';
import Footer from '../components/footer'
import {API_URL} from '../config'

class BlogDetail extends React.Component{
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
        const {data} = this.props.data.data
        const {loading} = this.state
        return <div className="main blog-main">
             <Spin spinning={loading}>
                <div className="blog-wrapper">
                    <div className="title blog-detail-title">
                        <h1>{data.title}</h1>
                        <span>{data.publish_time.split(' ')[0]}</span>
                    </div>
                    <div className="blog-detail">
                        <div className="detailImg">
                            <img src={data.img} alt="" />
                        </div>
                        <div className="blog-content" dangerouslySetInnerHTML={{ __html: data.content }}></div>
                    </div>
                </div>
            </Spin>
            <Footer/>
        </div>
    }
}

BlogDetail.getInitialProps = async function (props) {
    const id = props.ctx.query.id
    const res = await fetch(`${API_URL}/park/app/home/details_blog?id=${id}`);
    const data = await res.json();
    return {
        data: {data}
    }
}

export default BlogDetail;