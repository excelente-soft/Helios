import { useEffect, useState } from 'react'

import { MemoizedCatalogHeader } from '@components/CatalogHeader/CatalogHeader'
import { CourseCard } from '@components/CourseCard/CourseCard'
import { MemoizedCourseSearch } from '@components/CourseSearch/CourseSearch'
import { Layout } from '@components/Layout/Layout'
import { ICourse } from '@interfaces/ICourse'
import { RequestUtility } from '@utils/request'

import S from '../styles/Catalog.module.scss'
import CS from '@common.module.scss'

const Catalog = () => {
  const [courses, setCourses] = useState<ICourse[]>([])
  const [searchCretria, setSearchCretria] = useState('')

  useEffect(() => {
    const getCourses = async () => {
      const courses = await RequestUtility.requestToServer<ICourse[], null>('GET', '/getCourses', null)
      if (courses.data) {
        setCourses(courses.data)
      }
    }
    getCourses()
  }, [])

  const search = (courses: ICourse[]) => {
    if (searchCretria === '') {
      return courses
    }
    return courses.filter(
      (course) =>
        course.name.toLowerCase().includes(searchCretria.toLowerCase()) ||
        course.shortDescription.toLowerCase().includes(searchCretria.toLowerCase())
    )
  }

  const filteredCourses = search(courses)
  return (
    <Layout title="Catalog">
      <MemoizedCatalogHeader courses={courses} />
      <MemoizedCourseSearch total={filteredCourses.length} creteria={searchCretria} setCreteria={setSearchCretria} />
      <div className={`${CS.pageContainer} ${S.catalog}`}>
        {filteredCourses && filteredCourses.map((course) => <CourseCard key={course.name} course={course} />)}
      </div>
    </Layout>
  )
}

export default Catalog
