"use client";
import React, { useState } from "react";
import logo from "../../../public/logoword.svg";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const NavBar = () => {
  const router = useRouter();
  const { data: sessionData } = useSession();

  return (
    <div className="navbar flex justify-between fixed top-0 left-0 right-0 bg-gray-100 bg-opacity-50 z-30 backdrop-blur-sm">
      <div className="flex cursor-pointer flex-row align-middle">
        <Link href="/"><Image width="60" height="60" src={logo} alt="logo" className="mr-2 h-8 w-8" /></Link>
        <Link className="btn btn-ghost text-xl normal-case" href="/">Kafka Nimbus</Link>
      </div>

      <div className="mr-5">
        {(!sessionData) ?
          <Link href="./api/auth/signin?callbackUrl=/cluster-dashboard"
            className="overflow-hidden hover:bg-slate-300"
          ><Image width="35"
            height="35"
            alt="logo-not-logged-in" src={"https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg"}></Image></Link> :
          <details className="dropdown dropdown-end">
            <summary
              className="rounded-full overflow-hidden w-35 list-none">
              <Image
                width="35"
                height="35"
                src={sessionData?.user?.image || "https://upload.wikimedia.org/wikipedia/commons/3/3f/Github-circle_%28CoreUI_Icons_v1.0.0%29.svg"}
                alt="profile-pic"
                className="rounded-full overflow-hidden  hover:bg-slate-300"
              />
            </summary>
            <ul className="dropdown-content menu bg-slate-100 bg-base-200 w-56 rounded-box m-px: 10px">
              <li><button onClick={() => {
                router.push("/cluster-dashboard")
              }}>Clusters</button>
              </li>
              <li><button onClick={() => {
                void signOut({ callbackUrl: '/' })
              }
              }>Logout</button></li>
            </ul>
          </details>}
      </div>

    </div >
  );
};

export default NavBar;
