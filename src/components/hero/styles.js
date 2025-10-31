export const heroStyles = {
  container: {
    backgroundImage: `url(${require('../../../assets/bg-home.jpg')})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: { xs: '50vh', md: '70vh' },
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'common.white',
    textAlign: 'center',
    px: 4,
    position: 'relative',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
    }
  },
  title: {
    fontWeight: 'bold',
    mb: 3,
    position: 'relative',
    zIndex: 1,
    fontSize: { xs: '2rem', md: '3rem' }
  },
  subtitle: {
    mb: 4,
    position: 'relative',
    zIndex: 1,
    fontSize: { xs: '1.25rem', md: '1.5rem' }
  },
  button: {
    position: 'relative',
    zIndex: 1,
    px: 6,
    py: 1.5,
    fontSize: '1.1rem',
    '&:hover': {
      transform: 'translateY(-3px)',
      boxShadow: 3,
    },
    transition: 'all 0.3s ease',
  }
};