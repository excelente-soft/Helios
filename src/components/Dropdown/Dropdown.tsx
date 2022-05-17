import { IRole } from '@interfaces/IRole'

import S from './Dropdown.module.scss'

interface IDropdownProps {
  value: string
  options: IRole[]
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

const Dropdown: React.VFC<IDropdownProps> = ({ value, options, onChange }) => {
  return (
    <select value={value} onChange={onChange} className={S.dropdown}>
      {options.map((option) => (
        <option key={option.color} value={option.roleName} className={S.option} style={{ color: option.color }}>
          {option.roleName}({option.accessLevel})
        </option>
      ))}
    </select>
  )
}

export default Dropdown
