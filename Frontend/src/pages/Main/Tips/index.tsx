import { Container, Box, Typography, Button } from '@mui/material';
import SideNav from '../../../components/SideNavbar';
import Footer from '../../../components/Footer';
import './style.css'
import image1 from './image/health1.jpg'
import image2 from './image/health2.jpg'
import image3 from './image/health3.jpg'
import image4 from './image/health4.jpg'
import image5 from './image/health5.jpg'


const Tips: React.FC = () => {
  const buttonStyle = {
    backgroundColor: 'maroon',
  };

  return (
    <>
      <SideNav />
      <Typography variant="h3" textAlign="center" fontWeight="bold" color="maroon" mt={8} mb={8}>
        Healthy Tips
      </Typography>
  
      <Container className={'containerItem'}>
        <Box my={4} textAlign="center" className={'flexBox'}>
          <Box className={'Box1'}>
            <img className='imageItem' src={image1} />
          </Box>

          <Box className={'Box2'}>
            <Typography variant="h4" mt={2} mb={1}>
              Water: How much should you drink every day?
            </Typography>
            <Typography variant="body1" color="textaSecondary" mb={2}>
              Water is your body's principal chemical component and makes up about 50% to 70% of your body weight. Your body depends on water to survive.
              <br />
              Lack of water can lead to dehydration — a condition that occurs when you don't have enough water in your body to carry out normal functions. Even mild dehydration can drain your energy and make you tired.
            </Typography>
            <Button variant="contained" color="primary" href={'https://www.mayoclinic.org/healthy-lifestyle/nutrition-and-healthy-eating/in-depth/water/art-20044256#:~:text=So%20how%20much%20fluid%20does,fluids%20a%20day%20for%20women'} target="_blank" style={buttonStyle}>
              Read More
            </Button>
          </Box>
        </Box>
      </Container>

      <Container className={'containerItem'}>
        <Box my={4} textAlign="center" className={'flexBox2'}>
          <Box className={'Box2'}>
            <Typography variant="h4" mt={2} mb={1}>
              Benefits of Physical Activity
            </Typography>
            <Typography variant="body1" color="textSecondary" mb={2}>
              Regular physical activity is one of the most important things you can do for your health.
              <br />
              Being physically active can improve you brain health, manage weight,
              reduce the risk of disease, strengthen bones and muscles, and
              improve your ability to do everyday activities.
              <br />
              Everyone can experience the health benefits of physical activity - age, abilites, ethnicity, shape, or size do not matter.
            </Typography>
            <Button variant="contained" color="primary" href={'https://www.cdc.gov/physicalactivity/basics/pa-health/index.htm'} target="_blank" style={buttonStyle}>
              Read More
            </Button>
          </Box>

          <Box className={'Box1'}>
            <img className='imageItem' src={image2} />
          </Box>
        </Box>
      </Container>

      <Container className={'containerItem'}  >
        <Box my={4} textAlign="center" className={'flexBox'}>
          <Box className={'Box1'}>
            <img className='imageItem' src={image3} />
          </Box>
          <Box className={'Box2'}>
            <Typography variant="h4" mt={2} mb={1}>
              Importance of Healthy Food
            </Typography>
            <Typography variant="body1" color="textSecondary" mb={2}>
              The living organism needs to feed itself to live. The nutrients you get from healthy food enable you to cope with daily activities.
              <br />
              But the role of diet goes much further: recent advances in nutrition have allowed us to determien the importance of a correct diet in
              promoting physical and mental health, preventing disease, and in general, improving our health and overall quality of life.
            </Typography>
            <Button variant="contained" color="primary" href={'https://pgc.edu/importance-of-healthy-food/'} target="_blank" style={buttonStyle}>
              Read More
            </Button>
          </Box>
        </Box>
      </Container>

      <Container className={'containerItem'}>
        <Box my={4} textAlign="center" className={'flexBox2'}>
          <Box className={'Box2'}>
            <Typography variant="h4" mt={2} mb={1}>
              How Much Sleep Do You Need?
            </Typography>
            <Typography variant="body1" color="textSecondary" mb={2}>
              Healthy adults need at least seven hours of sleep per night. Babies, young childen, and teens need even more sleep to enable their growth and development.
              <br />
              Knowing the general recommendations for how much sleep you need is a first step. Next, it is important to reflect on your individual needs based on factors like
              your activity level and overall health. And finally, of course, it is necessary to apply healthy sleep tips so that you can actually get the full night's sleep that is recommended
            </Typography>
            <Button variant="contained" color="primary" href={'https://www.sleepfoundation.org/how-sleep-works/how-much-sleep-do-we-really-need'} target="_blank" style={buttonStyle}>
              Read More
            </Button>
          </Box>
          <Box className={'Box1'}>
            <img className='imageItem' src={image4} />
          </Box>
        </Box>
      </Container>

      <Container className={'containerItem'}  >
        <Box my={4} textAlign="center" className={'flexBox'}>
          <Box className={'Box1'}>
            <img className='imageItem' src={image5} />
          </Box>
          <Box className={'Box2'}>
            <Typography variant="h4" mt={2} mb={1}>
              Exercise and Mental Health
            </Typography>
            <Typography variant="body1" color="textSecondary" mb={2}>
              Exercise can benefit your mental health as weel as you physical health.
              Excersing regulary can reduce stress, help you sleep better, and aid recovery from mental illness.
              If you are new to exercising, start slow in a setting where you feel comfortable.
              <br />
              Excercise has many benefits, not only for your physical health but also your mental health.
            </Typography>
            <Button variant="contained" color="primary" href={'https://www.healthdirect.gov.au/exercise-and-mental-health#:~:text=Exercise%20can%20benefit%20your%20mental,setting%20where%20you%20feel%20comfortable.'} target="_blank" style={buttonStyle}>
              Read More
            </Button>
          </Box>
        </Box>
      </Container>

      <Footer />
    </>
  );
}



export default Tips;