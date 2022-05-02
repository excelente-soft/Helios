import Link from 'next/link'

import S from './ErrorRoute.module.scss'
import CS from '@common.module.scss'

interface IErrorRouteProps {
  description?: string
  status?: number
}

const ErrorRoute: React.VFC<IErrorRouteProps> = ({ status = 404, description = 'This page could not be found.' }) => {
  return (
    <div className={S.errorContainer}>
      <h2 className={S.status}>{status}</h2>
      <p className={S.description}>{description}</p>
      <Link href="/">
        <a className={`${CS.btnSecondary} ${S.back}`}>Back to save place</a>
      </Link>
    </div>
  )
}

export default ErrorRoute
