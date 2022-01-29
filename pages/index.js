import axios from 'axios';
import Link from 'next/link'
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBBtn } from 'mdb-react-ui-kit';


function index({ heros }) {
    return (
      <div className="container">
        <h1 className="display-2 mb-2">Superhero Identity Manager</h1>
        <div className="row">
        {heros.map(hero => (
          <div key={hero._id} className="col-sm-6 col-md-4 mb-2">
            <MDBCard className='border border-2'>
              <MDBCardBody>
                <MDBCardTitle>{hero.superHero}</MDBCardTitle>
                <MDBCardText>
                  {hero.realName}
                </MDBCardText>
                <Link href={`/${hero._id}`} passHref={true}>
                  <MDBBtn className="mx-2">View Hero</MDBBtn>
                </Link>
                <Link href={`/${hero._id}/edit`} passHref={true}>
                  <MDBBtn>Edit Hero</MDBBtn>
                </Link>
              </MDBCardBody>
            </MDBCard>
          </div>
        ))}
        </div>
      </div>
    );
}

export async function getStaticProps(context) {
  const res = await axios('http://localhost:3000/api/heros')
  const { hero: heros } = res.data

  return {
    props: { heros }
  }
}

export default index;
