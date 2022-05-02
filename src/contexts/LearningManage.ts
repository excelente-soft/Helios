import { createContext } from 'react'

import { ILearningManageContext } from '@interfaces/ILearningManage'

export const LearningManageContext = createContext<ILearningManageContext>({} as ILearningManageContext)
