import Layout from '@/components/Layout'
import { Textarea } from '@/components/ui/textarea'
import React from 'react'

const Post = () => {
    return (
        <Layout>
            <div className='flex px-4 py-4'>
                <Textarea placeholder='What do you want to talk about?' rows={8} />
            </div>
        </Layout>
    )
}

export default Post