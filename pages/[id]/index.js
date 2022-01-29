import axios from 'axios';
import Link from 'next/link'
import { useRouter } from 'next/router'
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBBtn } from 'mdb-react-ui-kit';

function EachHero({ hero }) {
  const router = useRouter()
  const heroId= router.query.id

  const deleteHero = async () => {
    try {
      await axios(`http://localhost:3000/api/heros/${heroId}`, {
        method: 'DELETE'
      })
      router.push('/')
    } catch (error) {
      console.log(error)
    }
  }

    return (
     <div className='container'>
       <h3 className='display-3'>Identity of Hero</h3>
        <MDBCard className='border border-2'>
          <MDBCardBody>
            <MDBCardTitle>{hero.superHero}</MDBCardTitle>
            <MDBCardText>
              {hero.realName}
            </MDBCardText>
            <Link href={`/`} passHref={true}>
              <MDBBtn onClick={deleteHero} className="btn btn-danger">Delete Hero</MDBBtn>
            </Link>
          </MDBCardBody>
        </MDBCard>
     </div>
    );
}

export async function getServerSideProps({ params }) {
  const { id } = params
  const res = await axios(`http://localhost:3000/api/heros/${id}`)
  const { hero } = res.data

  return {
    props: { hero }
  }
}


export default EachHero;
