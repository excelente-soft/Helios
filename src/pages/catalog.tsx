import { useEffect, useState } from 'react'

import { MemoizedCatalogHeader } from '@components/CatalogHeader/CatalogHeader'
import { CourseCard } from '@components/CourseCard/CourseCard'
import { CourseSearch } from '@components/CourseSearch/CourseSearch'
import { Layout } from '@components/Layout/Layout'
import { Table } from '@components/Table/Table'
import { useAppSelector } from '@hooks/app'
import { ICourse, ICourseRaw } from '@interfaces/ICourse'
import { RequestUtility } from '@utils/request'

const Catalog = () => {
  const [courses, setCourses] = useState<ICourse[]>([])
  const catalogTerms = useAppSelector(({ catalogTerms }) => catalogTerms)
  const [searchCreteria, setSearchCreteria] = useState(catalogTerms.search)

  useEffect(() => {
    const getCourses = async () => {
      const rawCourses = await RequestUtility.requestToServer<ICourseRaw[], null>('GET', '/get-courses', null)
      if (rawCourses.data) {
        const courses = rawCourses.data.map((course) => ({ ...course, creationDate: new Date(course.creationDate) }))
        setCourses(courses)
      }
    }
    getCourses()
  }, [])

  const search = (coursesParam: ICourse[]) => {
    if (searchCreteria === '') {
      return coursesParam
    }
    return coursesParam.filter(
      (course) =>
        course.name.toLowerCase().includes(searchCreteria.toLowerCase()) ||
        course.shortDescription.toLowerCase().includes(searchCreteria.toLowerCase())
    )
  }

  const filterByDate = (coursesParam: ICourse[]) => {
    if (catalogTerms.byDate === 'any') {
      return coursesParam
    } else if (catalogTerms.byDate === 'lastWeek') {
      return coursesParam.filter((course) => course.creationDate.getTime() > Date.now() - 1000 * 60 * 60 * 24 * 7)
    } else {
      return coursesParam.filter((course) => course.creationDate.getTime() < Date.now() - 1000 * 60 * 60 * 24 * 7)
    }
  }

  const filterByPrice = (coursesParam: ICourse[]) => {
    if (catalogTerms.byPrice === 'any') {
      return coursesParam
    } else if (catalogTerms.byPrice === 'free') {
      return coursesParam.filter((course) => course.price === 0)
    } else {
      return coursesParam.filter((course) => course.price > 0)
    }
  }

  const foundedCourses = filterByPrice(filterByDate(search(courses)))
  return (
    <Layout title="Catalog">
      <MemoizedCatalogHeader courses={courses} />
      <CourseSearch
        total={foundedCourses.length}
        searchCreteria={searchCreteria}
        setSearchCreteria={setSearchCreteria}
      />
      <Table>
        {foundedCourses && foundedCourses.map((course) => <CourseCard key={course.name} course={course} />)}
      </Table>
    </Layout>
  )
}

export default Catalog
