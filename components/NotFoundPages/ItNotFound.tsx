import React from 'react'
// import { Link } from '@/i18n/navigation';
import Link from 'next/link';

const ItNotFound = () => {
  return (
    <>
      <h2>Oops!  Sembra che tu ti sia perso.</h2>
      <p>Non ti preoccupare!</p>
      <p>Possiamo trovare il percorso più breve per farti tornare sulla giusta strada: lo facciamo di mestiere.</p>
      <button>
        <Link href="/">Riportami alla Home</Link>
      </button>
    </>
  )
}

export default ItNotFound