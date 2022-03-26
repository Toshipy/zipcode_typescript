import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from "next/link"


export default function Home() {
  return (
    <div className="zip">
      <Link href="/zipcode">
      <a className="Home">Welcome to Zip-App</a>
      </Link>
    </div>

  )
}

