import { PDFViewer } from '@react-pdf/renderer'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import CertificatePDF from '@components/CertificatePDF/CertificatePDF'
import Layout from '@components/Layout/Layout'
import { ICertificate } from '@interfaces/ICertificate'
import { RequestUtility } from '@utils/request'

import S from '@styles/Certificate.module.scss'

const Certificate = () => {
  const router = useRouter()
  const { certificateId } = router.query
  const [certificate, setCertificate] = useState<ICertificate>()

  useEffect(() => {
    if (router.isReady) {
      const fetchCertificate = async () => {
        const responseFromServer = await RequestUtility.requestToServer<ICertificate>(
          'GET',
          `/certificates/${certificateId}`
        )
        if (responseFromServer.data) {
          setCertificate(responseFromServer.data)
        }
      }
      fetchCertificate()
    }
  }, [router.isReady])

  return (
    <Layout title="Certificate">
      {certificate && (
        <div className={S.viewer}>
          <PDFViewer className={S.viewFrame}>
            <CertificatePDF certificate={certificate} />
          </PDFViewer>
        </div>
      )}
    </Layout>
  )
}

export default Certificate
