import Link from 'next/link'
import React from 'react'

type Props = {
    href: string,
    title: string
}

export default function FooterLinks({ href, title }: Props) {
    return (
        <li>
            <Link
                href={href}
                className="w-full inline-block py-2 text-[14px]"
            >
                {title}
            </Link>
        </li>
    )
}