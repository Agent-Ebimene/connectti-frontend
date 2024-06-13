import { HomeIcon, BellAlertIcon, NewspaperIcon, PencilIcon, UserIcon } from '@heroicons/react/24/outline'

export const menuItems = [
    {
        name: 'Home',
        description: 'Home',
        href: '/dashboard',
        icon: HomeIcon,
    },
    {
        name: 'Create Post',
        description: "Create a post",
        href: '/create-post',
        icon: PencilIcon,
    },
    {
        name: 'Notification',
        description: 'Notification',
        href: '/create-post',

        icon: BellAlertIcon,
    },

    {
        name: 'Feed',
        description: "Feed",
        href: '#',
        icon: NewspaperIcon,
    },
    {
        name: 'Account',
        description: "Account",
        href: '#',
        icon: UserIcon
    },
]