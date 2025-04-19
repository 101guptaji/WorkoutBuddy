import Records from '../../components/workoutList/Records';
import Form from '../../components/workoutForm/Form';
import './HomeStyle.css'

const Home = () => {

    return (
        <div className='container'>
            <Form />
            <Records />
            
        </div>
    )
}

export default Home