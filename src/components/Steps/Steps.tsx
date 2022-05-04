import S from './Steps.module.scss'

const Steps = () => {
  return (
    <div>
      <h2 className={S.title}>Adding codesandbox frame</h2>
      <p className={S.steps}>
        To add codesandbox frame, you must click on the &ldquo;Embed&ldquo; button, copy the Embed URL
      </p>
      <h2 className={`${S.title} ${S.figmaTitle}`}>Adding figma frame</h2>
      <p className={S.steps}>
        To add codesandbox frame, you must click on the &ldquo;Share&ldquo; then &ldquo;Get embed code&ldquo; and then
        copy the src from the iframe
      </p>
    </div>
  )
}

export default Steps
