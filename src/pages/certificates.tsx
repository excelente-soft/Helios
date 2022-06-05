import { useEffect, useState } from 'react'

import { IWithAuthorizationProps, withAuthorization } from '@HOC/withAuthorization'
import CertificateCard from '@components/CertificateCard/CertificateCard'
import Table from '@components/Table/Table'
import { ICertificate } from '@interfaces/ICertificate'
import { RequestUtility } from '@utils/request'

import CS from '@common.module.scss'

const Certificates: React.VFC<IWithAuthorizationProps> = ({ user }) => {
  const [certificates, setCertificates] = useState<ICertificate[]>([])

  useEffect(() => {
    const fetchCertificates = async () => {
      const myCoursesResponse = await RequestUtility.requestToServer<ICertificate[]>(
        'GET',
        '/certificates',
        null,
        user.token
      )
      if (myCoursesResponse.data) {
        setCertificates(myCoursesResponse.data)
      }
    }
    fetchCertificates()
  }, [])

  return (
    <div className={CS.pageContainer}>
      <h1 className={CS.pageTitle}>My Certificates</h1>
      <div>
        <Table noPadding>
          {certificates.map((certificate) => (
            <CertificateCard key={certificate.id} certificate={certificate} />
          ))}
        </Table>
      </div>
    </div>
  )
}

export default withAuthorization(Certificates, 'My certificates')
