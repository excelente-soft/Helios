import S from './Codesandbox.module.scss'

interface ICodesandboxProps {
  embedUrl: string
}

const Codesandbox: React.VFC<ICodesandboxProps> = ({ embedUrl }) => {
  return (
    <div className={S.codesandboxContainer}>
      <iframe
        src={embedUrl}
        width="100%"
        height="450"
        className={S.codesandboxFrame}
        allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
        sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
      ></iframe>
    </div>
  )
}

export default Codesandbox
