import Image from 'next/image'

import S from './EntryWelcome.module.scss'

interface IEntryWelcomeProps {
  title: string
  subtitle: string
}

const EntryWelcome: React.VFC<IEntryWelcomeProps> = ({ title, subtitle }) => {
  return (
    <div className={S.welcome}>
      <h2 className={S.title}>{title}</h2>
      <p className={S.subtitle}>{subtitle}</p>
      <ul className={S.peopleList}>
        <li className={S.people}>
          <Image src="/images/young-boy.svg" alt="people" height={64} width={64} />
        </li>
        <li className={S.people}>
          <Image src="/images/young-girl.svg" alt="people" height={64} width={64} />
        </li>
        <li className={S.people}>
          <Image src="/images/old-boy.svg" alt="people" height={64} width={64} />
        </li>
        <li className={S.people}>
          <Image src="/images/black-girl.svg" alt="people" height={64} width={64} />
        </li>
      </ul>
    </div>
  )
}

export default EntryWelcome
