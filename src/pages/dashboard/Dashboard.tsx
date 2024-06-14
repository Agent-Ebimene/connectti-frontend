import Layout from '@/components/Layout'
import { fetchPosts } from '@/features/post/postApi';
import { AppDispatch, RootState } from '@/service/redux/store';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PostCard from '../post/PostCard';

const Dashboard = () => {
    const dispatch = useDispatch<AppDispatch>()
    const posts = useSelector((state: RootState) => state.post.posts);
    const loading = useSelector((state: RootState) => state.user.loading);

    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch]);

    useEffect(() => {
        console.log(posts)
    }, [posts])
    return (
        <Layout>
            <section>
                {posts.map((post) => (
                    <div key={post.id}>
                        <PostCard post={post} />
                        {/* <p>{post.body}</p> */}

                    </div>
                ))}
            </section>

        </Layout>
    )
}

export default Dashboard