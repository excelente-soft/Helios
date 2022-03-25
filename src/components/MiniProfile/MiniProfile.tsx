import Image from 'next/image'
import Link from 'next/link'
import { useRef } from 'react'

import { useOutside } from '@hooks/useOutline'
import { useUser } from '@hooks/useUser'
import { IUser } from '@interfaces/IUser'

import S from './MiniProfile.module.scss'

interface IMiniProfileProps {
  user: IUser
}

export const MiniProfile: React.VFC<IMiniProfileProps> = ({ user }) => {
  const menuRef = useRef<HTMLDivElement>(null)
  const [isMenuOpen, setMenuOpen] = useOutside(menuRef)
  const { clear } = useUser()
  const menuHandler = () => {
    setMenuOpen()
  }

  const logoutHandler = () => {
    clear()
  }

  const { name, secondName, nickname, role } = user
  return (
    <div ref={menuRef} className={S.miniProfileContainer}>
      <button onClick={menuHandler} className={S.openMenuBtn}>
        <Image className={S.avatar} src={user.avatar} alt={`${name}'s avatar`} layout="fixed" width={35} height={35} />
        <div className={S.burger}>
          <span className={S.dot}></span>
          <span className={S.dot}></span>
          <span className={S.dot}></span>
        </div>
      </button>
      {isMenuOpen && (
        <ul className={S.menu}>
          <li>
            <Link href="/">
              <a className={S.profile}>
                <Image
                  className={S.avatar}
                  src={user.avatar}
                  alt={`${name}'s big avatar`}
                  layout="fixed"
                  width={55}
                  height={55}
                />
                <div className={S.info}>
                  <h4 className={S.fullname}>
                    {name} {secondName}
                  </h4>
                  <h5 className={S.nickname}>{nickname}</h5>
                  <h6 className={S.roleName} style={{ color: role.color }}>
                    {role.roleName}
                  </h6>
                </div>
              </a>
            </Link>
          </li>
          <li>
            <Link href="/">
              <a className={S.link}>Profile</a>
            </Link>
          </li>
          <li>
            <Link href="/">
              <a className={S.link}>My courses</a>
            </Link>
          </li>
          <li>
            <Link href="/settings">
              <a className={S.link}>Settings</a>
            </Link>
          </li>
          <li>
            <button onClick={logoutHandler} className={S.logout}>
              Logout
            </button>
          </li>
        </ul>
      )}
    </div>
  )
}
