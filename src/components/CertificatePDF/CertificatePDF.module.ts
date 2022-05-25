import { Font, StyleSheet } from '@react-pdf/renderer'

Font.register({
  family: 'Open Sans',
  fonts: [
    { src: 'https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-regular.ttf' },
    { src: 'https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-700.ttf', fontWeight: 700 },
  ],
})

Font.registerHyphenationCallback((word) => [word])

const styles = StyleSheet.create({
  page: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#fff',
    height: '100%',
    width: '100%',
    fontFamily: 'Open Sans',
  },
  leftSection: {
    width: '55%',
    padding: '32px',
    position: 'relative',
  },
  certificate: {
    fontSize: '52px',
    color: 'rgb(20, 27, 58)',
    fontWeight: 'bold',
    marginBottom: '12px',
  },
  id: {
    fontSize: '10px',
    color: 'rgb(30, 36, 69)',
  },
  createdAt: {
    fontSize: '10px',
    color: 'rgb(30, 36, 69)',
    marginBottom: '92px',
  },
  leftTitle: {
    position: 'absolute',
    transform: 'rotate(-90deg) translate(-50%, 50%)',
    right: '-81px',
    bottom: 0,
    textAlign: 'center',
    fontSize: '236px',
    color: '#141b3a2e',
  },
  to: {
    fontSize: '14px',
    color: 'rgb(20, 27, 58)',
  },
  ownerRow: {
    position: 'absolute',
    bottom: '32px',
    left: '32px',
  },
  owner: {
    fontSize: '12px',
    position: 'relative',
    top: '-12px',
    fontWeight: 'bold',
  },
  role: {
    fontSize: '10px',
    position: 'relative',
    top: '-12px',
  },
  fullName: {
    display: 'flex',
    flexWrap: 'wrap',
    maxWidth: '420px',
    fontSize: '34px',
    color: 'rgb(20, 27, 58)',
    fontWeight: 'bold',
    marginBottom: '44px',
  },
  course: {
    fontSize: '34px',
    color: '#fff',
    fontWeight: 'bold',
    maxWidth: '440px',
    marginBottom: '84px',
  },
  rightSection: {
    width: '45%',
    padding: '32px',
    backgroundColor: 'rgb(58, 16, 229)',
  },
  rightTitleContainer: {
    display: 'flex',
    alignItems: 'flex-end',
  },
  rightTitle: {
    fontSize: '52px',
    color: '#fff',
    textAlign: 'right',
  },
  completeCourse: {
    fontSize: '12px',
    color: '#fff',
    margin: '64px 0px 32px 0px',
  },
  stamp: {
    position: 'absolute',
    bottom: '124px',
    left: '45px',
    marginLeft: '100px',
  },
  hours: {
    fontSize: '18px',
    color: '#fff',
    maxWidth: '440px',
  },
})

export default styles
