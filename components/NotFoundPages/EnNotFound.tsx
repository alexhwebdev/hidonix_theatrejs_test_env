import React from 'react'
// import { Link } from '@/i18n/navigation';
import Link from 'next/link';

const ItNotFound = () => {
  return (
    <>
      <h2>Oops! It appears that you may have taken a wrong turn.</h2>
      <p>Don&apos;t worry!</p>
      <p>We can find the shortest route to get you back on the right track - it’s what we do for a living.</p>
      <button>
        <Link href="/">Back to Home</Link>
      </button>
    </>
  )
}

export default ItNotFound