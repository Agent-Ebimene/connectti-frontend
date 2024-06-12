import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { object, string, number, date, InferType, ValidationError } from 'yup';
import { Input } from '@/components/ui/input'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/service/redux/store';
import { loginUser } from '@/features/user/userApi';
import { useEffect, useState } from 'react';
import { RegisterUserData } from '@/types/user/user';
import { toast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';


const SignIn = () => {
    const dispatch = useDispatch<AppDispatch>();
    // const users = useSelector((state: RootState) => state.user.users);
    // const loading = useSelector((state: RootState) => state.user.loading);

    // useEffect(() => {
    //     dispatch(fetchUsers());
    // }, [dispatch]);

    // useEffect(() => {
    //     console.log(users)
    // }, [users])
    const navigate = useNavigate()

    let userSchema = object({
        password: string().required('Password is required'),
        email: string().required('Email is required').email('This is not a valid email'),
    });


    const [user, setUser] = useState<RegisterUserData>({
        email: '',
        password: '',
    })
    const [errors, setErrors] = useState<Record<string, string>>({})
    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault()

        try {
            await userSchema.validate(user, { abortEarly: false })
            dispatch(loginUser(user))


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
            } else {
                console.error('An unexpected error occurred', err);
            }
        } finally {
            toast({
                title: "Login",
                description: "Successfully Logged in!",
                className: cn(
                    'top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4'
                ),
            })
            navigate('/dashboard')
        }
    }
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target
        setUser((user) => ({
            ...user,
            [name]: value
        }))

    }
    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">

            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img
                    className="mx-auto h-10 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    alt="Your Company"
                />
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Sign in to your account
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" method="POST" onSubmit={handleSubmit}>
                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                Email Address
                            </label>
                        </div>
                        <div className="mt-2">

                            <Input id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                value={user.email}
                                onChange={handleChange}
                            />
                        </div>
                        {errors.password && <p className='text-red-500'>{errors.email}</p>}

                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                Password
                            </label>
                            <div className="text-sm">
                                <Link to="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                    Forgot password?
                                </Link>
                            </div>
                        </div>
                        <div className="mt-2">

                            <Input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                value={user.password}
                                onChange={handleChange}
                            />
                        </div>
                        {errors.password && <p className='text-red-500'>{errors.password}</p>}


                    </div>

                    <div>
                        <Button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Sign in
                        </Button>
                    </div>
                    <div className="text-sm">
                        <Link to="/" className="font-semibold text-indigo-600 hover:text-indigo-500">
                            Don't have an account yet?
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignIn