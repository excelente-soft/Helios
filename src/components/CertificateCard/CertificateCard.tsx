import Link from 'next/link'

import { WEEK } from '@constants'
import { ICertificate } from '@interfaces/ICertificate'

import S from './CertificateCard.module.scss'

interface ICertificateCardProps {
  certificate: ICertificate
}

const CertificateCard: React.VFC<ICertificateCardProps> = ({ certificate }) => {
  const isNew = new Date(certificate.createdAt).getTime() > Date.now() - WEEK
  return (
    <Link href={`/certificates/${encodeURIComponent(certificate.id)}`}>
      <a className={S.card}>
        <div className={S.image}></div>
        <div className={S.content}>
          <h1 className={S.title}>{certificate.courseName}</h1>
          <p className={S.subtitle}>{`${certificate.name} ${certificate.secondName}`}</p>
          <h6 className={S.createdAt}>{new Date(certificate.createdAt).toLocaleString()}</h6>
        </div>
        {isNew && <div className={S.new}>NEW</div>}
      </a>
    </Link>
  )
}

export default CertificateCard
