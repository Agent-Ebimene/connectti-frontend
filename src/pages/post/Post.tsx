import Layout from '@/components/Layout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/components/ui/use-toast'
import { createPost } from '@/features/post/postApi'
import { fetchUser } from '@/features/user/userApi'
import { cn } from '@/lib/utils'
import { AppDispatch, RootState } from '@/service/redux/store'
import { createPostData } from '@/types/post/post'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ValidationError, object, string } from 'yup'

const Post = () => {
    const dispatch = useDispatch<AppDispatch>()
    const [post, setPost] = useState<createPostData>({
        title: '',
        body: ''
    })
    const id = "Testing user id"
    const [errors, setErrors] = useState<Record<string, string>>({})
    const users = useSelector((state: RootState) => state.user.users.find((user) => user.id === id));
    const loading = useSelector((state: RootState) => state.user.loading);

    useEffect(() => {
        dispatch(fetchUser(id));
    }, [dispatch]);

    useEffect(() => {
        console.log(users)
    }, [users])




    let postSchema = object({
        title: string().required('Title cannot be empty').min(4, 'Post should not be less than 4 characters'),
        body: string().required('The post body is required').min(10, 'Post body should not be less than 10 characters'),

    });
    const { toast } = useToast()



    const handleSubmit = async (e: React.SyntheticEvent) => {

        e.preventDefault()

        try {
            await postSchema.validate(post, { abortEarly: false })
            dispatch(createPost(post))



        } catch (err) {
            if (err instanceof ValidationError) {
                const newErrors: Record<string, string> = {}
                err.inner.forEach((error) => {
                    if (error.path) {
                        console.log(error.path)
                        newErrors[error.path] = error.message;
                        setErrors(newErrors)
                    }
                });
            }


            else {
                // console.error('An unexpected error occurred', err);
                console.log('*******************', err)
                toast({
                    title: "Oh,something went wrong",
                    "description": "There was a problem with your resquest"
                })
            }
        } finally {
            toast({
                title: "Registration",
                description: "Post Successfully Created!",
                className: cn(
                    'top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4'
                ),
            })
        }


    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        setPost((post) => ({
            ...post,
            [name]: value
        }))

    }
    return (
        <Layout>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">

                <form className="space-y-6 " method="POST" onSubmit={handleSubmit}>
                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                Title
                            </label>
                        </div>
                        <div className="mt-2">

                            <Input id="title"
                                name="title"
                                type="title"
                                autoComplete="title"
                                required
                                placeholder='Enter the Title of your post'
                                value={post.title}
                                onChange={handleChange}

                            />
                        </div>

                        {errors.title && <p className='text-red-500'>{errors.title}</p>}
                    </div>

                    <div className="col-span-full">
                        <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                            About Post
                        </label>
                        <div className="mt-2">
                            <Textarea
                                id="body"
                                name="body"
                                rows={8}
                                defaultValue={''}
                                placeholder='What do you want to talk about ?'
                                value={post.body}
                                onChange={(e) => setPost((post) => ({ ...post, body: e.target.value }))}

                            />
                        </div>
                        {errors.body && <p className='text-red-500'>{errors.body}</p>}
                    </div>
                    <div className='flex justify-center'>
                        <Button
                            type="submit"
                            className="flex w-28 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Post
                        </Button>
                    </div>

                </form>
            </div>




        </Layout>
    )
}

export default Post